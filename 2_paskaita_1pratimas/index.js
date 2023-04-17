
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