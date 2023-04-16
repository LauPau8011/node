const express = require("express");// express modulio importavimas
const app = express();//aplikacijos sukurimas
const port = 3000;// port (kanalo) skaicius

//routas( kelias) route/path
//get grazink duomenis
 app.get("/", (req, res) => {
    //req -request( kas ateina iš išorės), res-response(kas ateina iš vidaus)
    res.send("Mano vardas yra Paula");//send metodas išsiunčia duomenis
}); 

app.get("/today", (req, res) => {
    res.send(new Date().toDateString());
});

app.get("/user",(req, res) => {
    const user={
        name:"Laura",
        surname:"Januleviciute",
        age: 43,
    } 
    res.send(user)
});

    

// serverio paleidimas
app.listen(port, () => {
    console.log(`Serveris listening on port ${port}`);
});



