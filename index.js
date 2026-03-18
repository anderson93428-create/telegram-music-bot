require('dotenv').config();

const { Telegraf } = require('telegraf');
const { downloadAudio, downloadVideo } = require('./functions/download');

const bot = new Telegraf(process.env.BOT_TOKEN);

// START
bot.start((ctx) => {
  ctx.reply(
    "👋 Bienvenido a tu bot PRO 🎧\n\n" +
    "Envíame un link de YouTube y podrás:\n" +
    "🎵 Descargar música\n" +
    "🎬 Descargar video"
  );
});

// RECIBIR LINK
bot.on('text', async (ctx) => {

  const url = ctx.message.text;

  if (url.includes("youtube.com") || url.includes("youtu.be")) {

    await ctx.reply("¿Qué deseas hacer?", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🎵 Música (MP3)", callback_data: "mp3|" + url }],
          [{ text: "🎬 Video (MP4)", callback_data: "mp4|" + url }]
        ]
      }
    });

  } else {
    ctx.reply("⚠️ Envíame un link válido de YouTube.");
  }

});

// BOTONES
bot.on("callback_query", async (ctx) => {

  const [type, url] = ctx.callbackQuery.data.split("|");

  try {

    if (type === "mp3") {
      await ctx.reply("🎵 Procesando audio...");
      const file = await downloadAudio(url);
      await ctx.replyWithAudio({ source: file });
    }

    if (type === "mp4") {
      await ctx.reply("🎬 Procesando video...");
      const file = await downloadVideo(url);
      await ctx.replyWithVideo({ source: file });
    }

  } catch (err) {
    console.log(err);
    ctx.reply("❌ Error procesando el contenido.");
  }

});

bot.launch();
console.log("🤖 Bot PRO funcionando...");