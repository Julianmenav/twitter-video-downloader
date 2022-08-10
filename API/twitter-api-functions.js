const axios = require('axios')


const getTweet = async (strId) => {
  const tweetResponse = await axios
    .get(`https://api.twitter.com/1.1/statuses/lookup.json?id=${strId}`,
      { headers: { "Authorization": process.env.BEARER } })
    .catch(e => {
      console.error(e.response.data)
    })
  const url = tweetResponse.data[0].extended_entities.media[0].video_info.variants[0].url

  return url
}



module.exports = {
  getTweet
}