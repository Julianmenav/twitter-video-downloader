
export default function (str) {
    
  const splittedUrl = str.split("/")
  let lastStr

  if (splittedUrl[splittedUrl.length - 1] == "") {
    lastStr = splittedUrl[splittedUrl.length - 2]
  } else {
    lastStr = splittedUrl[splittedUrl.length - 1]
  }

  const tweetId = lastStr.split("?")[0]

  return tweetId;
}