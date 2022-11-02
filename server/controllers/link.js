const { getTweet } = require("../API/twitter-api-functions");

const getLink = async (req, res) => {
  try {
    const { id } = req.params;

    //API CALL
    tweetResponse = await getTweet(id);

    //response = undefined
    if (!tweetResponse) {
      return res.status(400).json({ Error: `La URL no es de un tweet válido` });
    }
    //Response = Error
    if (tweetResponse == "ERR_BAD_REQUEST") {
      return res.status(400).json({ Error: "Twitter API Error" });
    }

    const onlyMp4 = (obj) => obj.content_type === "video/mp4";
    const addSize = (obj) => ({ ...obj, size: obj.url.split("/").at(-2) });

    const variantsObj =
      tweetResponse.extended_entities.media[0].video_info.variants
        .filter(onlyMp4)
        .map(addSize);
    const thumbNail = tweetResponse.extended_entities.media[0].media_url_https;
    
    res.json({ variantsObj, thumbNail });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ Error: "El tweet no contiene un video." });
  }
};

module.exports = { getLink };
