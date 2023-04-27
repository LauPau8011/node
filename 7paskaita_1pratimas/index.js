const express = require('express');
const cors = require('cors');
require('dotenv').config();
// process.env -tai obkjektas sukurtas iš mūsų .env failo
const port = process.env.PORT || 8080;
//  8080-grįžtamasis ryšys jeigu PORT bus nerastas (atsarginis var.)

const app = express();
app.use(express.json());
app.use(cors());

const ideas = [];

app.get('/ideas', (req, res) => {
  res.send(ideas);
});

// {id, title, done}
app.post('/ideas', (req, res) => {
  const idea = req.body;
  const newIdea = { id: ideas.length + 1, ...idea }; // pridedamas id prie pridedamo objekto
  ideas.push(newIdea);
  res.status(200).send(newIdea);
});

app.get('/ideas/:id', (req, res) => {
  const id = +req.params.id;
  const foundIdea = ideas.find((idea) => idea.id === id);
  if (foundIdea) {
    res.send(foundIdea);
  } else {
    res.status(404).send({ message: 'Idea not found' });
  }
});

app.delete('/ideas/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = ideas.findIndex((idea) => idea.id === id); // randa 0-begalybės, neranda -1
  if (foundIndex !== -1) {
    // jeigu randa
    const deletingIdea = ideas.find((idea) => idea.id === id);
    ideas.splice(foundIndex, 1);
    res.send(deletingIdea); // grąžinam elementą kurį trinam
  } else {
    // jeigu neranda
    res.status(404).send({ message: 'Idea not found' });
  }
});

app.put('/ideas/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = ideas.findIndex((idea) => idea.id === id);
  if (foundIndex !== -1) {
    const idea = req.body; // naujai siunčiamas todo
    const updatingIdea = { id, ...idea }; // senas id + naujas todo
    ideas.splice(foundIndex, 1, updatingIdea); // užkeičiamas atnaujintas todo
    res.send(updatingIdea);
  } else {
    res.status(404).send({ message: 'Idea not found' });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
