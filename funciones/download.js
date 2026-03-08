const { exec } = require("child_process");
const path = require("path");

async function downloadMp3(url) {

  const fileName = "song_" + Date.now() + ".mp3";
  const filePath = path.join(__dirname, "..", fileName);

  return new Promise((resolve, reject) => {

    const command = `yt-dlp --user-agent "Mozilla/5.0" -x --audio-format mp3 -o "${filePath}" "${url}"`;

    exec(command, (error) => {

      if (error) reject(error);
      else resolve(filePath);

    });

  });

}

module.exports = { downloadMp3 };