const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/Movies', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Movies')
      .find()
      .toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.post('/Movies', async (req, res) => {
  try {
    const movie = req.body;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Movies')
      .insertOne(movie); // prideda vieną objektą
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/Movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Movies')
      .findOne(new ObjectId(id)); // suranda vieną objektą duomenų bazėj
    // būtinai importuoti ObjectId iš mongodb
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/Movies/genre/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Movies')
      .find({ genre: title }) // ištraukia pagal tam tikrą lauką pvz. genre
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// asc -ascending -did4jimo tvarka
// dsc -descending -mažėjimo
app.get('/Movies/ratingSort/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Movies')
      .find()
      .sort({ rating: sort })
      .toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});
