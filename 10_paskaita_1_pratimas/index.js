const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users_list')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/usersCount', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users_list')
      .countDocuments();
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/users/Jonas', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users_list')
      .countDocuments({ name: 'Jonas Jonaitis' });
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush' }) - grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/unique', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users_list')
      .distinct('city'); // grąžina unikalias reikšmes, būtinai reikia nurodyti kriterijų t.y. raktą

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/lowestIncome', async (req, res) => {
  // total amount of money spent by each customer - kiek kiekvienas asmuo išleido pinigų
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users_list')
      .aggregate([
        { $group: { _id: '$name', usersIncome: { $sum: '$income' } } },
        { $sort: { usersIncome: 1 } },
      ])
      .toArray();
    // $group - sugrupuoja, _id: $customer - naudoja unikalų customerį,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: -1 } - sortina mažėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('users/highestIncome', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users_list')
      .aggregate([
        { $group: { _id: '$name', userIncome: { $sum: '$income' } } },
        { $sort: { userIncome: -1 } },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('users/dynamicUsersCount/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users_list')
      .countDocuments({ name: { $regex: `${name}\\b` } }); // gerai nesuprantu bet chatGPT sugeneravo, veikia... :D
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users_list')
      .insertMany([
        {
          name: 'Jonas Jonaitis',
          email: 'jonas.jonaitis@example.com',
          city: 'Vilnius',
          income: 5500,
        },
        {
          name: 'Petras Petraitis',
          email: 'petras.petraitis@example.com',
          city: 'Kaunas',
          income: 4900,
        },
        {
          name: 'Ona Onaitienė',
          email: 'onute123@example.com',
          city: 'Vilnius',
          income: 3700,
        },
        {
          name: 'Kristina Kristinaitė',
          email: 'kriste2011@example.com',
          city: 'Kaunas',
          income: 5000,
        },
        {
          name: 'Raimonda Raimondienė',
          email: 'raimondakns@gmail.com',
          city: 'Jonava',
          income: 6000,
        },
        {
          name: 'Dangyra Dangyrienė',
          email: 'dange@yahoo.com',
          city: 'Alytus',
          income: 3700,
        },
        {
          name: 'Antanas Antanaitis',
          email: 'ancius@hotmail.com',
          city: 'Vilnius',
          income: 5600,
        },
        {
          name: 'Birute Birutaitė',
          email: 'bir123@example.com',
          city: 'Druskininkai',
          income: 3000,
        },
        {
          name: 'Juozas Juozaitis',
          email: 'juozasj@gmail.com',
          city: 'Kaunas',
          income: 3200,
        },
        {
          name: 'Laura Janulevičiūtė',
          email: 'laura.j@gmail.com',
          city: 'Kaunas',
          income: 3000,
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
