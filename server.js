require('dotenv').config()
const express = require('express')
const { getLink } = require('./middleware/middleware')

const app = express();

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/url", getLink)

//Not Found Middleware

app.use((req, res) => res.status(404).json({ "Error": "Esta ruta no existe." }))


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});