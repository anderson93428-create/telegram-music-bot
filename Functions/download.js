const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegPath);

async function downloadMp3(url) {

  const fileName = "song_" + Date.now() + ".mp3";
  const filePath = path.join(__dirname, "..", fileName);

  return new Promise((resolve, reject) => {

    const stream = ytdl(url, {
      quality: "highestaudio"
    });

    ffmpeg(stream)
      .audioBitrate(128)
      .save(filePath)
      .on("end", () => resolve(filePath))
      .on("error", reject);

  });

}

module.exports = { downloadMp3 };