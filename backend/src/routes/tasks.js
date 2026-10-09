// ROUTES: map a URL + HTTP method to a controller function.
// Routes only decide "who handles this request", not "how".

const express = require('express');
const controller = require('../controllers/tasksController');

const router = express.Router();

router.get('/', controller.listTasks);          // GET    /api/tasks
router.post('/', controller.createTask);        // POST   /api/tasks
router.patch('/:id', controller.toggleTask);    // PATCH  /api/tasks/:id
router.delete('/:id', controller.deleteTask);   // DELETE /api/tasks/:id

module.exports = router;
