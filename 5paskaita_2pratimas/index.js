//2 užduo's: Sukur' aplikaciją kuri a''ks pirkinių krepšelio funkciją
//Susikurti projektą 5paskaita_1pratimas.Įsirašyti a'titinkamus modulius
//Pasirašy' routes:
//GET /cart – grąžins visą krepšelį
//POST /cart – pridės prekę į krepšelį
//GET /cart/item/:id – grąžins vieną prekę iš krepšelio
//Vienos prekės struktūros pvz. {id: 1, name: „bulvės“, price: 5, quan'ty: 2}

const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const cart= [];
  
 app.get("/cart", (req, res) => {
  res.send(cart);        //sent yra universalus, jam nesvarbu ar tai bus masyvas
});

//arba 
//app.get("/cart", (req, res) => {
 // res.json(cart);   //gali si7sti ti json formatą
//});

app.post("/cart", (req, res) => {
  // pasirenku POST iš sąrašo
  // spaudžiam "Body" skiltį
  // renkames "raw", bei pasirenkam JSON iš Text (mėlynas textas)
  // JSON formatas:
  // {
  //     "id": 2,
  //     "name": "Tomas"
  // }
  const item = req.body;
  item.id=cart.length + 1 //pridedamas dinaminis id pagal krepšelio ilgį +1
  cart.push(item);
  res.status(201).send(item);//grąžina http statusą, kuris nurodo response būseną
});

app.get("cart/item/:id", (req, res) => {  //galima item net nerašyti
  const id = req.params.id; 
  const foundItemId = cart.find((item) => item.id === +id);
  if(!item){
    res.status(404).send("Item not found")
  }else{
    res.send(foundItemId);
  } 
});

 
app.listen(port, () => console.log(`Server started on port ${port}...`));
