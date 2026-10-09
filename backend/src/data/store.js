// DATA LAYER: the only file that knows how tasks are stored.
// Here we use a simple JSON file. In a real app this would be a database,
// and only this file would need to change.

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'tasks.json');

function load() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function save(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

function getAll() {
  return load();
}

function add(title) {
  const tasks = load();
  const id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const task = { id, title, done: false };
  tasks.push(task);
  save(tasks);
  return task;
}

function toggle(id) {
  const tasks = load();
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.done = !task.done;
  save(tasks);
  return task;
}

function remove(id) {
  const tasks = load();
  const remaining = tasks.filter((t) => t.id !== id);
  if (remaining.length === tasks.length) return false;
  save(remaining);
  return true;
}

module.exports = { getAll, add, toggle, remove };
