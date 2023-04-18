//1.Susikurkite naują folderį 2_paskaita_1pratimas
//2. Pasikurkite node.js aplinką (package.json, index.js), įsidiekite express/cors modulius
//3. Sukurkite array, kuriame bus saugomi mašinų brand'ai. Pvz const cars = [];
//4. Sukurkite GET, kuris paduos visą array. Naudoti route (kelią) “/” arba “/cars”
//5. Sukurkite POST, kuris į array įrašys naują automobilio br

const express=require("express");
const app= express();
const port=3000;
const cors=require("cors")

app.use(express.json());
app.use(cors());


const brands=["Audi", "BMW"]

app.get("/" ,(req, res) =>{
    res.send(brands)
});

app.post("/", (req, res) =>{
    const brand=req.body.brand;
      names.push(brand);
   res.send(req.body)
}); 

app.listen(port,()=>{
    console.log(`Server is listen on the ${port}`)
});