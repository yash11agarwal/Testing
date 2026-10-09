// Entry point of the backend. This file starts the web server,
// plugs in the API routes and serves the frontend files.

const path = require('path');
const express = require('express');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Lets the server read JSON sent by the frontend (request bodies)
app.use(express.json());

// Every URL that starts with /api/tasks is handled by the task routes
app.use('/api/tasks', taskRoutes);

// Serve the frontend folder (index.html, style.css, app.js) as static files
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

app.listen(PORT, () => {
  console.log(`Task Board running at http://localhost:${PORT}`);
});
