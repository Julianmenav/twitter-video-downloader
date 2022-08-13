const { getBestVideo } = require('../utils/functions')
const { getTweet } = require("../API/twitter-api-functions")

const getLink = async (req, res) => {
  try {
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
    tweetResponse = await getTweet(tweetId)
  
    //response = undefined
    if (!tweetResponse) {
      return res.status(400).json({ "Error": `La URL '${url}' no es de un tweet válido, o no contiene un vídeo` })
    }
    //Response = Error
    if (tweetResponse == "ERR_BAD_REQUEST") {
      return res.status(400).json({ "Error": "Twitter API Error, por favor avise a Julian" })
    }
    const variantsObj = tweetResponse.extended_entities.media[0].video_info.variants
    const bestVideo = getBestVideo(variantsObj)
    res.json({ "Link al vídeo": bestVideo.url })

  } catch (error) {
    console.error(error)
    res.status(400).json({ "Error": "Lo siento, algo ha ido mal." })
  }
}


module.exports = { getLink }