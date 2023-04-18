//2 Pratimas
//1. Sukurkite naują folderį 2_paskaita_2praVmas
//2. Sukurkite node.js aplinką, įsidiegite reikiamus modulius
//3. Sukurkite array, kuriame bus saugomi produktų pavadinimai
//4. Sukurkite GET, kuris paduos visą array. Route „/products“
//5. Sukurtkite POST, kuris į array įrašys naują produktą. Route „/products“
//6. Sukurkite atskirą aplanką „client“ ir jame du failus index.html ir script.js
//7. Sukurkite funkcionalumą kuris:
//a. Atvaizduos visus produktus
//b. Pridės naują produktą prie sąrašo

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;


const products=["juice","bread"]

app.get("/" ,(req, res) =>{
    res.send(products)
});

app.post("/", (req, res) =>{
    const product=req.body.product;
      products.push(product);
   res.send(req.body)
}); 

app.listen(port,()=>{
    console.log(`Server is listen on the ${port}`)
});
