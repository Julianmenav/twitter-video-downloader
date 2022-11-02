
export default function (str) {
    
  const splittedUrl = str.split("/")
  let lastStr

  if (splittedUrl[splittedUrl.length - 1] == "") {
    lastStr = splittedUrl[splittedUrl.length - 2]
  } else {
    lastStr = splittedUrl[splittedUrl.length - 1]
  }

  const tweetId = lastStr.split("?")[0]

  const isNum = (str) => /^[0-9]*$/.test(str)
  


  return {id: tweetId, isValid: (isNum(tweetId))};
}