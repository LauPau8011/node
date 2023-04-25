//trys būdai sysikur node js aplikaciją:
//1. Ranka pasirašyti package.json ir index.js failą, bet reikės susirašyti atskirai reikalingus modulius 
//2.persikopijuoti package.json failą ir index.js failą, tada užtenka parašyti "npm install", kad surašyti visus modulius;
//3. komanda "npm init", kuri sukurs jums package.json ir index.js failus, bet reikės susirašyti rekalingus modulius atskirai.

//1.Terminale pasirašome npm install nodemon;
//2.prisidedame į package.json failą scripts skiltį naują scriptą "dev":"nedemon index.js"
//3. leidžiama aplikaciją terminale su komanda "npm run dev", run reikalingas, nes komanda sukurta mūsų, o ne sistemiška

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const users = []

const port = 3000;


app.get("/", (req, res) => {
    res.send(users);
});

app.post("/", (req, res) => {
    // pasirenku POST iš sąrašo
    // spaudžiam "Body" skiltį
    // renkames "raw", bei pasirenkam JSON iš Text (mėlynas textas)
    // JSON formatas:
    // {
    //     "id": 2,
    //     "name": "Tomas"
    // }
    const user = req.body;
    users.push(user);
    res.send(user);
});



app.listen(port, () => {
    console.log(`Server is running on the http://localhost:${port}`)
});
