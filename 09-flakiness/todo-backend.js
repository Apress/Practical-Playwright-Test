const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

// Manually set CORS headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.use(bodyParser.json());

const todos = [];

// Root route for health check
app.get('/', (req, res) => {
  res.status(200).send('TODO backend is ready');
});

app.get('/:userId/todo', (req, res) => {
  const { userId } = req.params;
  todos[userId] = todos[userId] || [];
  res.json(todos[userId]);
});

app.post('/:userId/todo', (req, res) => {
  const { userId } = req.params;
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const id = uuidv4();
  const todo = {
    id,
    title,
    completed,
    url: `${req.protocol}://${req.host}/${userId}/todo/${id}`,
  };
  todos[userId] = todos[userId] || [];
  todos[userId].push(todo);
  res.status(201).json(todo);
});

app.delete('/:userId/todo/:id', (req, res) => {
  const { userId, id } = req.params;
  todos[userId] = todos[userId] || [];
  const index = todos[userId].findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos[userId].splice(index, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`TODO backend listening at http://localhost:${port}`);
});
