
const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const items= [];

 app.get("/", (req, res) => {
  res.send(items);
});

app.get("/items/:id", (req, res) => {
    const id = req.params.id;
    const foundItem = data.find((item) => item.id === +id);
    res.send(foundItem);
  });

app.post("/", (req, res) => {
  // pasirenku POST iš sąrašo
  // spaudžiam "Body" skiltį
  // renkames "raw", bei pasirenkam JSON iš Text (mėlynas textas)
  // JSON formatas:
  // {
  //     "id": 2,
  //     "name": "Tomas"
  // }
  const item = req.body;
  items.push(item);
  res.send(item);
});



 
app.listen(port, () => console.log(`Server started on port ${port}...`));