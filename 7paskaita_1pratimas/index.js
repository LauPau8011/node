const express = require('express');
const cors = require('cors');
require('dotenv').config();
// process.env -tai obkjektas sukurtas iš mūsų .env failo
const port = process.env.PORT || 8080;
//  8080-grįžtamasis ryšys jeigu PORT bus nerastas (atsarginis var.)

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send();
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
