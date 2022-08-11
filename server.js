require('dotenv').config()
const express = require('express')
const { getTweet } = require("./API/twitter-api-functions")
const { getBestVideo } = require('./utils/functions')

const app = express();

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/url", (req, res) => {
  const { url } = req.body
  try {
    const splittedUrl = url.split("/")
    let tweetId

    if (splittedUrl[splittedUrl.length - 1] == "") {
      tweetId = splittedUrl[splittedUrl.length - 2]
    } else {
      tweetId = splittedUrl[splittedUrl.length - 1]
    }

    getTweet(tweetId).then(data => {
      if (data) {
        const best = getBestVideo(data)
        res.json({ "Link al vídeo": best.url })
        // res.redirect(best.url)
      } else {
        //ERROR1
        res.json({ "Error": `La URL '${url}' no es de un tweet válido, o no contiene un vídeo` })
      }
    })

  } catch (error) {
    console.log(error)
    //ERROR2
    res.json({ "Error": "No se ha introducido un Link válido, inténtelo más tarde" })
  }

})

//Not Found Middleware

app.use((req, res) => res.status(404).json({ "Error": "Esta ruta no existe." }))


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});