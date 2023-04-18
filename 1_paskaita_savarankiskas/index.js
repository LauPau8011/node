const express = require("express");// express modulio importavimas
const app = express();//aplikacijos sukurimas
const port = 3000;// port (kanalo) skaicius

const casual = require("casual");


//a +-
app.get("/randomUser", (req, res) => {
    const randomUser = {
        name: `${casual.first_name}`,
        surname: `${casual.last_name}`,
        country: `${casual.country}`,
        city: `${casual.city}`,
        street: `${casual.street}`,
        zip: `${casual.zip(5, 9)}`
    }
    res.send(randomUser)
})


//b +
app.get("/randomColor", (req, res) => {
    const randomColor = `${casual.color_name}`;
    res.send(randomColor);
})

//c +
/* app.get('/randomColors', (req, res) => {
    const randomColors = `Color name:['${casual.color_name}', '${casual.color_name}', '${casual.color_name}', '${casual.color_name}', '${casual.color_name}']`;
    res.send(randomColors);
}) */

app.get("/randomColors", (req, res) => {

    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(casual.color_name);
    }
    res.send(colors);
});


//d
app.get("/randomPlaces", (req, res) => {
    const places = [];
    const numPlaces=Math.floor(Math.random()*5)+1
    for (let i = 0; i < numPlaces; i++) {
        const place={
            country:casual.country,
            city:casual.city,
            address:`${casual.street} ${casual.address2}`
        }
        places.push(place)
    }
    res.send(places);
});


app.listen(port, () => {
    console.log(`Serveris listening on port ${port}`);
});
