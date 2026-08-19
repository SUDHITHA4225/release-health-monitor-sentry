const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  release: process.env.SENTRY_RELEASE || undefined,
  tracesSampleRate: 1.0,
});

const app = express();
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(bodyParser.json());
app.use(cors());

let items = [];
let nextId = 1;

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/items', (req, res) => {
  const item = { id: nextId++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  items[idx] = { ...items[idx], ...req.body };
  res.json(items[idx]);
});

app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  items.splice(idx, 1);
  res.status(204).send();
});

// Route to trigger an unhandled exception
app.get('/debug/throw', (req, res) => {
  throw new Error('Unhandled exception from backend');
});

// Route to trigger an unhandled rejection
app.get('/debug/reject', (req, res) => {
  Promise.reject(new Error('Unhandled rejection from backend'));
  res.json({ ok: true });
});

app.use(Sentry.Handlers.errorHandler());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend running on ${port}`));
