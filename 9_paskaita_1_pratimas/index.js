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

app.get('/BooksNew', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('BooksNew')
      .find()
      .toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.post('/BooksNew', async (req, res) => {
  try {
    const book = req.body;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('BooksNew')
      .insertOne(book); // prideda vieną objektą
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/BooksNew/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('BooksNew')
      .findOne(new ObjectId(id)); // suranda vieną objektą duomenų bazėj
    // būtinai importuoti ObjectId iš mongodb
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/booksNew/genre/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('BooksNew')
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
app.get('/BooksNew/ratingSort/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('BooksNew')
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
