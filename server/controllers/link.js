
const { getTweet } = require("../API/twitter-api-functions")

const getLink = async (req, res) => {
  try {
    const { id } = req.params
  
    //API CALL
    tweetResponse = await getTweet(id)
  
    //response = undefined
    if (!tweetResponse) {
      return res.status(400).json({ "Error": `La URL no es de un tweet válido` })
    }
    //Response = Error
    if (tweetResponse == "ERR_BAD_REQUEST") {
      return res.status(400).json({ "Error": "Twitter API Error" })
    }
    const variantsObj = tweetResponse.extended_entities.media[0].video_info.variants
    res.json({variantsObj})

  } catch (error) {
    console.error(error)
    return res.status(400).json({ "Error": "El tweet no contiene un video." })
  }
}


module.exports = { getLink }