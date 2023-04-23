/* Sukurkite registracijos aplikaciją kuri:
• Turės du puslapius: Registracijos forma (register.html) ir pagrindinį puslapį
(index.html)
• Pagrindiniame puslapyje atvaizduoti sąrašą arba lentelę su užsiregistravusių žmonių duomenimis (sugalvoti savo dizainą, nepersistengt)
• Registracijos puslapyje atvaizduoti formą pagal dizainą 
OpDonal: Nuspaudus registruoDs perkelD į pagrindinį index.html puslapį
Serverinė dalis:
• Pilnai veikianD node.js aplikaciją kuri palaiko du kelius
o GET /users – grąžina visus vartotojos
o POST /users – prideda vartoto
Papildy( pra(mą ir pridė( prisijungimo funkcionalumą.
• Pridė( login.html puslapį, kuriame būtų du įvedimo laukai: el. paštas ir slaptažodis,
bei mygtukas prisijung(.
• Įvedus duomenis ir nuspaudus prisijung(, turi kreip(s į serverį ir pa(krin( ar toks
vartotojas egzistuoja, jeigu ezsistuoja išves( į ekraną informacija „Prisijungta“ (gali
bū( alertas arba html textas), jei neranda vartotojo ives( į ekraną „Ne(nkamas el.
paštas arba slaptažodis“
o Tam reikės POST /login route kuris pa(krins ar vartotojas yra ir grąžins
atsakymą*/
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
    const user = { pas: req.body.pas, pass: req.body.pass,email: req.body.email,name: req.body.name,surname: req.body.surname,adress: req.body.adress,zip: req.body.zip,city: req.body.city,phone: req.body.phone,agree: req.body.agree   
    };
    users.push(user);
    res.send(user);
});

app.post("/login", (req, res) => {
    const loginUser = { pas: req.body.pas, email: req.body.email };
    let msg = "";
    users.forEach((user) => {
        if (loginUser.email === user.email) {
            if (loginUser.pas === user.pas) {
                return msg = "logged in successfully";
            } else {
                return msg = "Wrong password";
            }
        } else {
            return msg = "This email NOT exist";
        }
    });
    res.send({ message: msg });
});

app.listen(port, () => {
    console.log(`Server is listening on port  ${port}`)
})