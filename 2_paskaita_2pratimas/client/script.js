fetch("http://localhost:3000/")//ištraukiam duomenis ir atvaizduojam kaip listą
  .then((resp) => resp.json())
  .then((response) => {
    const productsList = document.getElementById("products");
        response.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product;
      productsList.append(li);
    });
  });

const button = document.getElementById("productButton");
button.addEventListener("click", () => {
  const product = document.querySelector("input[name='product']").value;

//pridėti naują produktą(duomenį) į serverį
  //fetch(serverio URL, papildomi parametrai)<-struktūra
  //serverio URL-adresas iki serverio
  //papildomi parametrai-tai parametrų objektas, kuris nusako esybes apie mūsų kreipimąsi
  //esybės:method,headers,body
  //method-kreipimosi metodas, g.b. pvz PUT, POST, DELETE,GET
  //headers-objektas{...} gali būti{"Content-Type":"application/json"}-nurodo, kad siunčiami duomenys yra JSON formato
  //body-mūsų siunčiami duomenys, reikia pridėti JSON.stringify({ data})tam, kad serveris suprastų siunčiamus duomenis.būtinaituri
  //būti JSON formate
  fetch("http://localhost:3000/", { //pridėti naują produktą, į serverį, kai nuspaudžiam mygtuką
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product}),
  })
  .then((resp) => resp.json())
  .then((response) => { 
    console.log(response);
    //.then()kai kvietimas būtų įvygdytas,įvykdo .then() dalį
    //.then(response)-response dalis,tai kas grįšta iš serverio iš res.send()
    //perkrauti puslapį
    location.reload();
    
  });
});
