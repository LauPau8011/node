fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(response => {
        const table = document.querySelector('tbody');
        response.forEach((user) => {
            const tr = document.createElement('tr');
            const password = document.createElement('td');
            password.textContent = user.password;
            const password1 = document.createElement('td');
            password1.textContent = user.password1;
            const email = document.createElement('td');
            email.textContent = user.email;
            const name = document.createElement('td');
            name.textContent = user.name;
            const surname = document.createElement('td');
            surname.textContent = user.surname;
            const adress = document.createElement('td');
            adress.textContent = user.adress;
            const zip = document.createElement('td');
            zip.textContent = user.zip;
            const city = document.createElement('td');
            city.textContent = user.city;
            const phone = document.createElement('td');
            phone.textContent = user.phone;
            const agree = document.createElement('td');
            agree.textContent = user.agree;
            tr.append(password, password1, email, name, surname, adress, zip, city, phone, agree)
            table.append(tr);
          });
    })
/* 
    Object.values(user).forEach((value) => {​​///6itaip galima trumpinti
        const td = document.createElement("td");
        td.textContent = value;
        tr.append(td);
      }​​);
      tbody.append(tr);
 */