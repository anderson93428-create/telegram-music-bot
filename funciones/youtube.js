const yts = require("yt-search");

async function searchYoutube(query) {

  const r = await yts(query);

  return r.videos.slice(0,5).map(v => ({
    title: v.title,
    url: v.url,
    thumbnail: v.thumbnail
  }));

}

module.exports = { searchYoutube };