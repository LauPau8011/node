//1.Susikurkite naują folderį 2_paskaita_1pratimas
//2. Pasikurkite node.js aplinką (package.json, index.js), įsidiekite express/cors modulius
//3. Sukurkite array, kuriame bus saugomi mašinų brand'ai. Pvz const cars = [];
//4. Sukurkite GET, kuris paduos visą array. Naudoti route (kelią) “/” arba “/cars”
//5. Sukurkite POST, kuris į array įrašys naują automobilio br

const express=require("express");//express importas
const app= express();//express aplikacijos iniciavimas
const port=3000; // mūsų kanalas
const cors=require("cors");//cors importas
app.use(express.json());//aplikacija priima duomenis json formatu
app.use(cors()); //aplikacija naudoja cors apsaugą


const brands=["Audi", "BMW"]

//GET kelias, kuris grąžina duomenis
app.get("/" ,(req, res) =>{
    //res-reponse duomenys, kuriuos mes grąziname 
    res.send(brands) // res.sent()-metodas , kuris klientui grąžina atsakymą
});

app.post("/", (req, res) =>{
    // req(request) duomenys, kuriuos gauname iš išorės
     //req body-pgr duomenys iš išorės
    const brand=req.body.brand;
      brands.push(brand);
   res.send(req.body)//POST dalyje siunčiame antgal klientui, tai ką jis atsiuntė man
}); 

//app.listen ()-metodas, kuris paleidžia klausytis mūsų serverio, nurodytu kanalu
//port -kanalas
//()=>{}funkcija, kuri pasileidžia, kai serveris startuoja
//console.log naudojam, kad žinotume kokiu kanalu paleido serverį
app.listen(port,()=>{      
    console.log(`Server is running on the http://localhost:${port}/`)
});