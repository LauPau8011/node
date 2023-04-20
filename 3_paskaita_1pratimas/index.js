/* Sukurkite registracijos aplikaciją kuri:
• Turės du puslapius: Registracijos forma (register.html) ir pagrindinį puslapį
(index.html)
• Pagrindiniame puslapyje atvaizduoti sąrašą arba lentelę su užsiregistravusių žmonių duomenimis (sugalvoti savo dizainą, nepersistengt)
• Registracijos puslapyje atvaizduoti formą pagal dizainą 
OpDonal: Nuspaudus registruoDs perkelD į pagrindinį index.html puslapį
Serverinė dalis:
• Pilnai veikianD node.js aplikaciją kuri palaiko du kelius
o GET /users – grąžina visus vartotojos
o POST /users – prideda vartoto*/

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const users = [];

app.get("/users", (req, res) => {
    res.send(users)
})

app.post("/users", (req, res) => {
    const user = { password: req.body.password, password1: req.body.password1,email: req.body.email,name: req.body.name,surname: req.body.surname,adress: req.body.adress,zip: req.body.zip,city: req.body.city,phone: req.body.phone,agree: req.body.agree   
    };
    users.push(user);
    res.send(user);
});


app.listen(port, () => {
    console.log(`Server is listening on port  ${port}`)
})