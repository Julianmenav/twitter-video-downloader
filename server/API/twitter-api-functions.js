const axios = require('axios')


const getTweet = async (strId) => {
  try {
    const tweetResponse = await axios
      .get(`https://api.twitter.com/1.1/statuses/lookup.json?id=${strId}`,
        { headers: { "Authorization": process.env.BEARER } })
    return tweetResponse.data[0]
  } catch (error) {
    //API Error
    console.error("API ERROR:", error)
    return "ERR_BAD_REQUEST"
  }
}



module.exports = {
  getTweet
}