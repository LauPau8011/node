
/* 2 Pratimas
1. Sukurkite naują folderį 2_paskaita_2praVmas
2. Sukurkite node.js aplinką, įsidiegite reikiamus modulius
3. Sukurkite array, kuriame bus saugomi produktų pavadinimai
4. Sukurkite GET, kuris paduos visą array. Route „/products“
5. Sukurtkite POST, kuris į array įrašys naują produktą. Route „/products“
6. Sukurkite atskirą aplanką „client“ ir jame du failus index.html ir script.js
7. Sukurkite funkcionalumą kuris:
a. Atvaizduos visus produktus
b. Pridės naują produktą prie sąrašo
3 Pratimas
PakoreguoV 3 praVmą:
duomenys turėtų ne Vk pavadinimą, bet ir kainą. Pvz [{name: „arbuzas“, price: 10}].
1. PakoreguoV node serverį, kad prisitaikytų prie naujos struktūros
2. PakoreguoV front endą: pridėV papildomą kainos įvedimo lauką ir pakoreguoV
siunčiamą body */
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

const products = [];

app.get("/products", (req, res) => {
  res.send(products);
});

app.post("/products", (req, res) => {
  const product = { name: req.body.name, price: req.body.price }; // sukuria objekta is siunciamo body
  products.push(product);
  res.send(product);
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
