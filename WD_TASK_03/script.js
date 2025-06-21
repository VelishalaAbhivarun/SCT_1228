const quizData = [
  { type: "mcq", question: "Which company developed the Android operating system?", options: ["Apple", "Microsoft", "Google", "Samsung"], answer: "Google", icon: "fa-android" },
  { type: "mcq", question: "What does 'URL' stand for?", options: ["Uniform Resource Locator", "Universal Routing Link", "Unified Resource Level", "Universal Resource Log"], answer: "Uniform Resource Locator", icon: "fa-link" },
  { type: "mcq", question: "Which planet is known as the Red Planet?", options: ["Earth", "Venus", "Mars", "Jupiter"], answer: "Mars", icon: "fa-globe" },
  { type: "mcq", question: "HTML stands for?", options: ["Hyper Type Multi Language", "HyperText Markup Language", "Home Tool Markup Language", "HyperText Markdown Language"], answer: "HyperText Markup Language", icon: "fa-code" },
  { type: "mcq", question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], answer: "Leonardo da Vinci", icon: "fa-paint-brush" },
  { type: "mcq", question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: "Pacific", icon: "fa-water" },
  { type: "mcq", question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], answer: "Carbon Dioxide", icon: "fa-leaf" },
  { type: "mcq", question: "Which is the smallest prime number?", options: ["1", "2", "3", "5"], answer: "2", icon: "fa-divide" },
  { type: "mcq", question: "What does CPU stand for?", options: ["Central Process Unit", "Computer Personal Unit", "Central Processing Unit", "Central Programming Unit"], answer: "Central Processing Unit", icon: "fa-microchip" },
  { type: "mcq", question: "What is the chemical symbol for Gold?", options: ["Ag", "Au", "Gd", "Go"], answer: "Au", icon: "fa-flask" },
  { type: "fitb", question: "The process of converting water into vapor is called ______.", answer: "evaporation", icon: "fa-temperature-high" },
  { type: "fitb", question: "______ is the powerhouse of the cell.", answer: "mitochondria", icon: "fa-microscope" },
  { type: "fitb", question: "Python was created by ______ van Rossum.", answer: "guido", icon: "fa-python" },
  { type: "fitb", question: "Water freezes at ______ degrees Celsius.", answer: "0", icon: "fa-snowflake" },
  { type: "fitb", question: "The Great Wall of China is visible from ______.", answer: "space", icon: "fa-globe-asia" },
  { type: "fitb", question: "The programming language developed by James Gosling is called ______.", answer: "java", icon: "fa-code" },
  { type: "fitb", question: "______ is the founder of Microsoft.", answer: "bill gates", icon: "fa-user-tie" },
  { type: "fitb", question: "The inventor of the light bulb was ______ Edison.", answer: "thomas", icon: "fa-lightbulb" },
  { type: "fitb", question: "______ is the longest river in the world.", answer: "nile", icon: "fa-water" },
  { type: "fitb", question: "The binary number system uses only ______ and 1.", answer: "0", icon: "fa-digital-tachograph" }
];

let currentIndex = 0;
let score = 0;
let answered = false;
const quizCardsEl = document.getElementById("quiz-cards");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const colors = ['#2c3e50', '#34495e', '#3d566e', '#46617e', '#4f6c8e', '#58779e', '#617eae', '#6a8cbe', '#739bce', '#7ca9de'];

function loadQuestion() {
  const current = quizData[currentIndex];
  const card = document.createElement("div");
  card.className = "question-card";
  card.style.backgroundColor = colors[currentIndex % colors.length];
  card.dataset.index = currentIndex;
  card.innerHTML = `
    <i class="fas ${current.icon || ''} icon"></i>
    <div class="question-number">Question ${currentIndex + 1} of ${quizData.length}</div>
    <h3>${current.question}</h3>
    <div class="options" id="options-${currentIndex}"></div>
    <input type="text" id="text-answer-${currentIndex}" class="text-answer hidden" placeholder="Type your answer here..." />
    <div class="feedback hidden" id="feedback-${currentIndex}"></div>
  `;

  const optionsEl = card.querySelector(`#options-${currentIndex}`);
  const textAnswerEl = card.querySelector(`#text-answer-${currentIndex}`);
  const feedbackEl = card.querySelector(`#feedback-${currentIndex}`);

  if (current.type === "mcq") {
    current.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => selectMCQAnswer(btn, option, currentIndex, feedbackEl));
      optionsEl.appendChild(btn);
    });
  } else if (current.type === "fitb") {
    textAnswerEl.classList.remove("hidden");
    textAnswerEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkFITBAnswer(currentIndex, feedbackEl);
      }
    });
  }

  quizCardsEl.appendChild(card);
  answered = false;
}

function selectMCQAnswer(button, selectedOption, index, feedbackEl) {
  if (answered) return;
  answered = true;
  const current = quizData[index];
  const correct = current.answer;
  const optionsEl = document.querySelector(`#options-${index}`);
  optionsEl.querySelectorAll("button").forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#27ae60";
    } else if (btn.textContent === selectedOption && btn.textContent !== correct) {
      btn.style.backgroundColor = "#c0392b";
    }
  });
  feedbackEl.innerHTML = selectedOption === correct
    ? `<span class="correct">Correct!</span>`
    : `<span class="incorrect">Incorrect.</span> Correct Answer: <span class="correct-answer">${correct}</span>`;
  feedbackEl.classList.remove("hidden");
  if (selectedOption === correct) score++;
}

function checkFITBAnswer(index, feedbackEl) {
  if (answered) return;
  answered = true;
  const current = quizData[index];
  const textAnswerEl = document.querySelector(`#text-answer-${index}`);
  const userInput = textAnswerEl.value.trim().toLowerCase();
  const correctAnswer = current.answer.toLowerCase();
  feedbackEl.innerHTML = userInput === correctAnswer
    ? `<span class="correct">Correct!</span>`
    : `<span class="incorrect">Incorrect.</span> Correct Answer: <span class="correct-answer">${current.answer}</span>`;
  feedbackEl.classList.remove("hidden");
  if (userInput === correctAnswer) score++;
}

nextBtn.addEventListener("click", () => {
  if (!answered) {
    if (quizData[currentIndex].type === "fitb") {
      const feedbackEl = document.querySelector(`#feedback-${currentIndex}`);
      checkFITBAnswer(currentIndex, feedbackEl);
      return;
    }
    return;
  }
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  quizCardsEl.style.display = "none";
  nextBtn.style.display = "none";
  resultBox.classList.remove("hidden");
  scoreText.textContent = `${score} / ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultBox.classList.add("hidden");
  quizCardsEl.style.display = "flex";
  nextBtn.style.display = "block";
  quizCardsEl.innerHTML = "";
  loadQuestion();
});

loadQuestion();