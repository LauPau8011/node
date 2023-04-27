const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080; // || 8080 - grįžtamasis ryšys jeigu PORT bus nerastas

const app = express();
app.use(express.json());
app.use(cors());

const ticket = [];

app.get('/ticket', (req, res) => {
  res.send(ticket);
});

app.get('/tickets/:id', (req, res) => {
  const id = req.params.id;
  const foundItem = ticket.find((reserv) => reserv.id === +id);
  res.send(foundItem);
});
/* app.get('/tickets/:id', (req, res) => {
  const reserv = ticket.find(() => reserv.id === +req.params.id);
  if (!reserv) {
    // jeigu neranda - 404 status nerado resurso
    res.status(404).send('Item not found');
  } else {
    // jeigu randa
    res.send(reserv);
  }
}); */
// 2
app.post('/ticket', (req, res) => {
  const reserv = req.body;
  reserv.id = ticket.length + 1; // pridedamas dinaminis id pagal krepšelio ilgį +1
  ticket.push(reserv);
  // res.status() - grąžina http statusą, kuris nurodo response būseną
  res.status(201).send(reserv);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
