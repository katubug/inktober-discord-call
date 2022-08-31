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
  1: "spooky self-portrait | gargoyle",
  2: "glampire | scurry",
  3: "dragon wagon | bat",
  4: "scallop",
  5: "flame",
  6: "bouquet",
  7: "trip",
  8: "match",
  9: "nest",
  10: "crabby",
  11: "eagle",
  12: "forget",
  13: "kind",
  14: "empty",
  15: "armadillo",
  16: "fowl",
  17: "salty",
  18: "scrape",
  19: "ponytail",
  20: "bluff",
  21: "bad dog",
  22: "heist",
  23: "booger",
  24: "fairy",
  25: "tempting",
  26: "ego",
  27: "snack",
  28: "camping",
  29: "uh-oh",
  30: "gear",
  31: "farm",
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
