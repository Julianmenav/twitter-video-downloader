const axios = require('axios')


const getTweet = async (strId) => {
  try {
    const tweetResponse = await axios
      .get(`https://api.twitter.com/1.1/statuses/lookup.json?id=${strId}`,
        { headers: { "Authorization": process.env.BEARER } })
    const variantsObj = tweetResponse.data[0].extended_entities.media[0].video_info.variants

    return variantsObj

  } catch (error) {
    console.error(error)
  }
}



module.exports = {
  getTweet
}