const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080; // || 8080 - grįžtamasis ryšys jeigu PORT bus nerastas

const app = express();
app.use(express.json());
app.use(cors());

const tickets = [];

app.get('/tickets', (req, res) => {
  res.send(tickets);
});

app.get('/tickets/:id', (req, res) => {
  const id = req.params.id;
  const foundItem = tickets.find((reserv) => reserv.id === +id);
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
  reserv.id = tickets.length + 1; // pridedamas dinaminis id pagal krepšelio ilgį +1
  // const ticket={id:tickets.lenght+1, ...item } galima ir taip sukurti naują objektą,
  // šis būdas yra geriau
  // galima sudėti du objektus pvz a={id:1} b= {row:1, seat:5}={...a, ...b}
  tickets.push(reserv);
  // res.status() - grąžina http statusą, kuris nurodo response būseną
  res.status(201).send(reserv);
});
app.delete('/tickets/:id', (req, res) => {
  const index = tickets.findIndex((item) => item.id === +req.params.id);
  if (index === -1) {
    // index -1 jeigu neranda itemo masyve
    res.status(404).send('Ticket not found');
  } else {
    tickets.splice(index, 1); // ištrina elemenetą pagal jo indexą masyve
    res.send('Ticket removed from cart');
  }
});
app.listen(port, () => console.log(`Server started on port ${port}...`));
