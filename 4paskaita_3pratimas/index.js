//Duomenys: https://pastebin.com/M3FQdwqf

const express = require("express");
const cors = require("cors");
const data = require("./data"); // importuojam duomenis
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

// 1. Sukurkite bendrinį GET route, kuris paduos visus prekių duomenis.
app.get("/", (req, res) => {
  res.send(data);
});
/* 
// 2. Sukurkite dinaminį GET route, kur URL turės prekės kategoriją, ir pagal ją prafiltruos,
//bei grąžins tik tuos produktus, kurie priklauso šiai kategorijai.
app.get("/items/:category", (req, res) => {
  const category = req.params.category;
  const filteredItems = data.filter((item) => item.category.toLowerCase() === category.toLowerCase()
  );
  res.send(filteredItems);
}); */

// 3. Sukurkite dinaminį GET route, kuris priims prekės id ir pagal jį grąžins atitinkamą
//prekės objektą. Hint: url parametrai visada stringai, o čia id - skaičius, tad reikės
//konvertuoS.
app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  const foundItem = data.find((item) => item.id === +id);
  res.send(foundItem);
});

// 4. Sukurkite GET route, kuris grąžins visų prekių pavadinimus (grąžinamas formatas:
//["iPhone 13", "Samsung Galaxy S22", "Dell XPS 15", "MacBook Pro", "Sony WH-
//1000XM4", "Bose QuietComfort 35 II"]).
app.get("/names", (req, res) => {
  const names = data.map((item) => item.name);
  res.send(names);
});


// 5  Sukurkite GET route, į kurį pasikreipus, grąžins visų prekių, kurių kiekis sandėlyje yra 
// mažesnis už nurodytą kiekį, pavadinimus ir likug (formatas: [{"name": "Samsung 
// Galaxy S22", "stock": 5}, {"name": "Dell XPS 15", "stock": 3}]).
app.get("/stock", (req, res) => {
  const filteredStock = data.filter((item) => item.stock < 10);
  const inStock = filteredStock.map(({ name, stock }) => ({ name, stock })); //(({ name, age }) => ({ name, age }))
  res.send(inStock);
});


// 6  Sukurkite dinaminį GET route, kuris pagal kainos intervalą grąžins prekes, kurių kaina 
// yra tarp nurodytų ribų (įskaitant jas). Parametrai turėtų būD perduodami URL kaip 
// minPrice ir maxPrice. (du parametrai reikalingi)

/* app.get("/price/:minPrice/:maxPrice", (req, res) => {
  const minPrice = req.params.minPrice;
  const maxPrice = req.params.maxPrice;
  //console.log(Number(minPrice));
  const filteredMinPrice = data.filter((item) => item.price >= +minPrice);
  const filteredMinMaxPrice = filteredMinPrice.filter((item) => item.price <= +maxPrice);
  res.send(filteredMinMaxPrice);
}); */
app.get("/products/:minPrice/:maxPrice", (req, res) => {
  const minPrice = Number(req.params.minPrice);
  const maxPrice = Number(req.params.maxPrice);
  const filteredProducts = data.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
  res.send(filteredProducts);
});

// 7 Sukurkite POST route, kuris leis pridėD naują prekę prie duomenų sąrašo. Nauja prekė 
// turėtų turėD id, name, category, price ir stock laukus. UžDkrinkite, kad naujoji prekė 
// neturėtų to paDes id kaip jau esančios prekės.
/*
app.get("/add", (req, res) => {
  res.send(data);
});


app.post("/add", (req, res) => {

  const highestId = data.reduce((maxId, obj) => {
    return obj.id > maxId ? obj.id : maxId;
  }, 0);
  console.log(highestId)
  const id = 


/*
 const item = {
    "id": 8,
    "name": "iPhone 14",
    "category": "Telefonai",
    "price": 1199,
    "stock": 15
  };
  data.push(item);
  res.send(data);
})
 */



app.listen(port, () => console.log(`Server started on port ${port}...`));
