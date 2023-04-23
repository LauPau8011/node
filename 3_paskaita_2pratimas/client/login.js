document.querySelector('#login').addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const pas = document.querySelector('#pas').value;
  let res = document.querySelector('#res');
  res.textContent = "";
  
  fetch('http://localhost:3000/login', {
      method: "POST",
      headers: { 
          "Content-Type": "application/json" 
      },
      body: JSON.stringify({ pas: pas, email: email }),
  }).then(resp => resp.json())
  .then(response => {
      if (response.message == "logged in successfully") {
          res.textContent = response.message;
          setTimeout(() => {
              window.open("index.html", "_blank")
          }, 2000);
      } else {
          res.textContent = response.message;
      }
  })
})
