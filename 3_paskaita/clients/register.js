document.querySelector('#registration').addEventListener("click", (e) => {
    e.preventDefault();
    const password = document.querySelector('#password').value;
    const password1 = document.querySelector('#password1').value;
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const adress = document.querySelector('#adress').value;
    const zip = document.querySelector('#zip').value;
    const city = document.querySelector('#city').value;
    const phone = document.querySelector('#phone').value;
    const agree = document.querySelector('#agree').checked;

    fetch('http://localhost:3000/users', {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ password: password, password1: password1, email: email, name: name, surname: surname, adress: adress, zip: zip, city: city, phone: phone, agree: agree       
        }),
    })
    .then(() => {
        window.open("index.html", "_blank");
    });
});



document.querySelector('form').style.cssText = `
    display: grid;
    gap: 1rem;
    width: 400px;
`;
document.querySelector('body').style.cssText = `
    display: grid;
    justify-content: center;
`;