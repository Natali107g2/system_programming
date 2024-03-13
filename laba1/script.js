document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskList = document.getElementById('taskList');

  const li = document.createElement('li');

  const dateSpan = document.createElement('span');
  dateSpan.textContent = new Date().toLocaleString();
  dateSpan.style.fontSize = '0.8em'; // Меньший размер шрифта для даты

  li.appendChild(dateSpan); // Добавляем дату под текстом задачи

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.onclick = toggleTask;
  li.appendChild(taskSpan); // Добавляем текст задачи

  taskList.insertBefore(li, taskList.firstChild);

  saveTask(taskText, dateSpan.textContent); // Сохраняем задачу и дату

  taskInput.value = '';

  updateNoTasksMessage();
}


function toggleTask() {
  this.classList.toggle('completed');
}

function clearTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  localStorage.clear();
  updateNoTasksMessage();
}

function saveTask(taskText, taskDate) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.unshift({ text: taskText, date: taskDate }); // Сохраняем их в начало массива
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('taskList');

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.onclick = toggleTask;

    const dateSpan = document.createElement('span');
    dateSpan.textContent = task.date;

    li.insertBefore(dateSpan, li.firstChild);

    taskList.appendChild(li);
  });

  updateNoTasksMessage();
}

function updateNoTasksMessage() {
  const taskList = document.getElementById('taskList');
  const noTasksMessage = document.getElementById('noTasksMessage');
  if (taskList.childElementCount === 0) {
    noTasksMessage.style.display = 'block';
  } else {
    noTasksMessage.style.display = 'none';
  }
}


