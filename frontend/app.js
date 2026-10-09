// BEHAVIOUR: runs in the browser. It talks to the backend API with fetch()
// and redraws the list. It never touches the data file directly.

const API = '/api/tasks';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const errorBox = document.getElementById('error');

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  render(tasks);
}

function render(tasks) {
  list.innerHTML = '';
  for (const task of tasks) {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');

    const title = document.createElement('span');
    title.textContent = task.title;
    title.title = 'Click to mark done / not done';
    title.onclick = () => toggleTask(task.id);

    const del = document.createElement('button');
    del.className = 'delete';
    del.textContent = 'Delete';
    del.onclick = () => deleteTask(task.id);

    li.append(title, del);
    list.append(li);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  errorBox.textContent = '';

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: input.value }),
  });

  if (!res.ok) {
    const data = await res.json();
    errorBox.textContent = data.error;
    return;
  }

  input.value = '';
  loadTasks();
});

async function toggleTask(id) {
  await fetch(`${API}/${id}`, { method: 'PATCH' });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadTasks();
}

loadTasks();
