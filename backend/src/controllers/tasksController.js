// CONTROLLERS: the business logic. They read the request, validate it,
// talk to the data layer and send back a response.

const store = require('../data/store');

function listTasks(req, res) {
  res.json(store.getAll());
}

function createTask(req, res) {
  const title = (req.body.title || '').trim();
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = store.add(title);
  res.status(201).json(task);
}

function toggleTask(req, res) {
  const task = store.toggle(Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
}

function deleteTask(req, res) {
  const removed = store.remove(Number(req.params.id));
  if (!removed) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).end();
}

module.exports = { listTasks, createTask, toggleTask, deleteTask };
