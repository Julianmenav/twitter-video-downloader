function getBestVideo(array) {
  const mp4 = array.filter(variant => variant["content_type"] == "video/mp4")

  let best
  mp4.forEach((variant, i, arr) => {
    if (arr.every(subVariant => variant.bitrate >= subVariant.bitrate)){
      best = variant
    }
  })

  return best
}

module.exports = {
  getBestVideo
}