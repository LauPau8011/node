const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080; // || 8080 - grįžtamasis ryšys jeigu PORT bus nerastas

const app = express();
app.use(express.json());
app.use(cors());

const todos = [];

app.get('/todos', (req, res) => {
  res.send(todos);
});

// {id, title, done}
app.post('/todos', (req, res) => {
  const todo = req.body;
  const newTodo = { id: todos.length + 1, ...todo }; // pridedamas id prie pridedamo objekto
  todos.push(newTodo);
  res.status(200).send(newTodo);
});

app.get('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const foundTodo = todos.find((todo) => todo.id === id);
  if (foundTodo) {
    res.send(foundTodo);
  } else {
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.delete('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = todos.findIndex((todo) => todo.id === id);
  if (foundIndex !== -1) {
    // index -1 jeigu randa
    const deletingTodo = todos.findIndex((todo) => todo.id === id);
    todos.splice(foundIndex, 1);
    res.send(deletingTodo); // grąžina elementą, kurį triname
  } else {
    // jeigu neranda
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.put('/todos/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = todos.findIndex((todo) => todo.id === id);
  if (foundIndex !== -1) {
    // index -1 jeigu randa
    const updatingTodo = { id, ...todos }; // senas id + naujas todo
    todos.splice(foundIndex, 1, updatingTodo);
    res.send(updatingTodo); // užkeičiamas atnaujintas todo
  } else {
    // jeigu neranda
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
