require('dotenv').config()
const {getTweet} = require("./API/twitter-api-functions")
const {getBestVideo} = require('./utils/functions')

const url = process.argv[2]
const splittedURL = url.split("/")
const tweetId = splittedURL[splittedURL.length - 1]
console.log("El id del tweet es "+ tweetId)
console.log()
console.log("Link al video:")


getTweet(tweetId).then(data => {
  const best = getBestVideo(data)
  console.log(best.url)
})

