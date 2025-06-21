const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const datetimeInput = document.getElementById('datetime-input');
const prioritySelect = document.getElementById('priority-select');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const priorityFilter = document.getElementById('priority-filter');
const clearAllBtn = document.getElementById('clear-all');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addTask(taskInput.value, datetimeInput.value, prioritySelect.value);
  taskInput.value = '';
  datetimeInput.value = '';
});

function addTask(text, datetime, priority) {
  const li = document.createElement('li');
  li.setAttribute('data-priority', priority);

  const header = document.createElement('div');
  header.className = 'task-header';

  const span = document.createElement('span');
  span.className = 'task-content';
  span.textContent = text;

  const actions = document.createElement('span');
  actions.className = 'actions';

  const doneBtn = document.createElement('button');
  doneBtn.innerHTML = '✔️';
  doneBtn.className = 'done';
  doneBtn.onclick = () => li.classList.toggle('completed');

  const editBtn = document.createElement('button');
  editBtn.innerHTML = '✏️';
  editBtn.className = 'edit';
  editBtn.onclick = () => {
    if (!span.isContentEditable) {
      span.contentEditable = true;
      span.focus();
    } else {
      span.contentEditable = false;
    }
  };

  const delBtn = document.createElement('button');
  delBtn.innerHTML = '🗑️';
  delBtn.className = 'delete';
  delBtn.onclick = () => {
    li.remove();
    updateCount();
  };

  actions.append(doneBtn, editBtn, delBtn);
  header.append(span, actions);

  const dt = document.createElement('div');
  dt.className = 'datetime';
  dt.textContent = datetime ? '⏰ ' + datetime.replace('T', ' ') : '';

  const pr = document.createElement('div');
  pr.className = 'priority';
  pr.textContent = `Priority: ${priority}`;

  li.append(header, dt, pr);
  taskList.appendChild(li);
  updateCount();
  applyFilter();
}

function updateCount() {
  const tasks = document.querySelectorAll('#task-list li');
  taskCount.textContent = `Total Tasks: ${tasks.length}`;
}

priorityFilter.addEventListener('change', applyFilter);

function applyFilter() {
  const selected = priorityFilter.value;
  const tasks = document.querySelectorAll('#task-list li');

  tasks.forEach(task => {
    if (selected === 'All' || task.getAttribute('data-priority') === selected) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

clearAllBtn.addEventListener('click', () => {
  taskList.innerHTML = '';
  updateCount();
});
