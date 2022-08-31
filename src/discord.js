require("dotenv").config();

const axios = require("axios");

const today = new Date();

const openings = [
  "Well, hello there!",
  "Greetings, frens!",
  "Pens at the ready!",
  "Hope you're ready for some inking!",
  "Beep! Boop! Time to ink!",
];

const topics = {
  1: "leaf",
  2: "potion",
  3: "magic wand",
  4: "witch hat",
  5: "plant",
  6: "crystal ball",
  7: "book",
  8: "cat",
  9: "eye",
  10: "ghost",
  11: "sage",
  12: "candle",
  13: "memory box",
  14: "tea cup",
  15: "stars",
  16: "broom",
  17: "bag",
  18: "tarot deck",
  19: "skirt",
  20: "necklace",
  21: "crystals",
  22: "glasses",
  23: "calligraphy pen",
  24: "notebook",
  25: "mushroom",
  26: "crow",
  27: "skull",
  28: "runes",
  29: "cauldron",
  30: "wild card",
  31: "crawl",
};

const finishings = [
  "Hope you'll share your creations here.",
  "Draw on!",
  "The journey is as important as the destination.",
  "There is no competition - show us what you made.",
  "1... 2... 3... Draw!",
];

function constructMessage() {
  const opening = selectRandomFrom(openings);
  const date = getDate();
  const theme = topics[today.getDate()];
  const closing = selectRandomFrom(finishings);
  return `${opening} It is the ${date} of Witchtember and today's theme is **${theme}**. ${closing}`;
}

function selectRandomFrom(selection) {
  return selection[Math.floor(Math.random() * selection.length)];
}

function getDate() {
  const day = today.getDate();
  let ending;
  switch (day) {
    case 1:
    case 21:
    case 31:
      ending = "st";
      break;
    case 2:
    case 22:
      ending = "nd";
      break;
    case 3:
    case 23:
      ending = "rd";
      break;
    default:
      ending = "th";
  }

  return `${day}${ending}`;
}
exports.handler = (event, context, callback) => {
  const params = {
    username: process.env.BOT_NAME,
    avatar_url: process.env.AVATAR_URL || "",
    content: constructMessage(),
  };

  async function triggerWebhook() {
    return axios.post(process.env.DISCORD_WEB_HOOK, params);
  }

  triggerWebhook()
    .then(() => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Cache-Control": "no-cache",
        },
        body: "Message sent.",
      });
    })
    .catch((err) => {
      callback(null, {
        statusCode: 400,
        body: "Message failed with this error: " + err,
      });
    });
};
