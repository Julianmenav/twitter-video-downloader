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

  //Get tweet ID
  const splittedUrl = url.split("/")
  let tweetId

  if (splittedUrl[splittedUrl.length - 1] == "") {
    tweetId = splittedUrl[splittedUrl.length - 2]
  } else {
    tweetId = splittedUrl[splittedUrl.length - 1]
  }



  //API CALL
  getTweet(tweetId).then(tweetResponse => {

    //response = undefined
    if (!tweetResponse) {
      return res.status(400).json({ "Error": `La URL '${url}' no es de un tweet válido, o no contiene un vídeo` })
    }
    //Response = Error
    if (tweetResponse == "ERR_BAD_REQUEST") {
      return res.status(400).json({ "Error": "Twitter API Error, por favor avise a Julian" })
    }

    try {
      const variantsObj = tweetResponse.extended_entities.media[0].video_info.variants
      const bestVideo = getBestVideo(variantsObj)
      res.json({ "Link al vídeo": bestVideo.url })
    } catch (error) {
      console.error(error)
      res.status(400).json({ "Error": error })
    }
  })
})

//Not Found Middleware

app.use((req, res) => res.status(404).json({ "Error": "Esta ruta no existe." }))


app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});