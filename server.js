require('dotenv').config()
const express = require('express')
const { getTweet } = require("./API/twitter-api-functions")
const { getBestVideo } = require('./utils/functions')

const app = express();

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))


app.get("/", (req, res) => {
  res.send("HTML")
})


app.get("/api/:tweetId", (req, res) => {
  const { tweetId } = req.params

  getTweet(tweetId).then(data => {

    if (data) {
      const best = getBestVideo(data)
      res.json({ "Link al vídeo": best.url })
    } else {
      //Cuando hay un error procesando el tweet.
      res.json({ "Error": "Link inválido" })
    }
  })
})

//Not Found Middleware

app.use((req, res) => res.status(404).json({ "Error": "Esta ruta no existe." }))


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});