const express = require("express");// express modulio importavimas
const app = express();//aplikacijos sukurimas
const port = 2900;// port (kanalo) skaicius

const casual = require("casual");


//a +
app.get("/randomUser", (req,res)=>{
const randomUser = {
    name: `${casual.first_name}`,
    surname: `${casual.last_name}`,
    country: `${casual.country}`,
    city: `${casual.city}`,
    street: `${casual.street}`,
    zip: `${casual.zip}`
}
res.send(randomUser)
})


//b +
app.get("/randomColor", (req, res) => {
    const randomColor = `${casual.color_name}`;
    res.send(randomColor);
})

//c +
app.get('/randomColors', (req, res) => {
    const randomColors = `Color name:['${casual.color_name}', '${casual.color_name}', '${casual.color_name}', '${casual.color_name}', '${casual.color_name}']`;
    res.send(randomColors);
})
app.get("/randomColors",(req,res)=>{
    const colorArray=[];
    for(let i=0;i<5; i++){
        colorArray[i]=casual.safe_color_name;
    }
    res.send(colorArray)
})
//d
app.get('/randomPlaces', (req, res) => {
    const randomPlaces = `Color name:['${casual.color_name}', '${casual.color_name}', '${casual.color_name}', '${casual.color_name}', '${casual.color_name}']`;
})
    res.send(randomColors);

 

app.listen(port, () => {
    console.log(`Serveris listening on port ${port}`);
});
