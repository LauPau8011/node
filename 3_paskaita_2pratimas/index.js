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
    const user = { password: req.body.password,
         password1: req.body.password1,
         email: req.body.email,
         name: req.body.name,
         surname: req.body.surname,
         adress: req.body.adress,
         zip: req.body.zip,
         city: req.body.city,
         phone: req.body.phone,
         agree: req.body.agree   
    };
    users.push(user);
    res.send(user);
});

app.post("/login", (req, res) => {
    // Patikrinti ar egzistuoja vartotojas
  
    res.send({ message: "" });
    // req.body = {email: "rokas@gmail.com", password: "rokas123"}
    //
    let foundedUser = users.find((user) => user.email === req.body.email);
    // jeigu randa foundedUser = {email: "rokas@gmail.com", password: "rokas123", ...}
    // jeigu neranda foundedUser = undefined
    if (foundedUser !== undefined) {
      // rado
      let submittedPassword = req.body.password; // test
      let storedPassword = foundedUser.password; // test
      // test === test
      // rokas123 === rokas123!
      if (submittedPassword === storedPassword) {
        res.send({ message: "Sekmingai prisijungete", approved: true });
      } else {
        res.send({ message: "Neteisingas slaptažodis", approved: false });
      }
    } else {
      // nerado
      res.send({
        message: "Neteisingas el. paštas",
        approved: false,
      });
    }
  });
  
  app.listen(port, () => console.log(`Server started on port ${port}...`));
