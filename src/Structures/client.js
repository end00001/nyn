const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const express = require("express")
const app = express();

app.get('/', (req, res) => res.send('ho mai pusy'))

const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
  presence: {
    activities: [{ name: ":33", type: 0 }],
    status: "idle",
  },
});

client.commands = new Collection();

function encodeHex(str) {
  return Buffer.from(str, 'utf8').toString('hex');
}

function decodeHex(hexStr) {
  const cleaned = hexStr.replace(/\s+/g, '');
  return Buffer.from(cleaned, 'hex').toString('utf8');
}

module.exports.start = async (config) => {
  client.config = config;

  config.TOKEN = decodeHex(config.TOKENHEX)

  console.log("loading commands...");
  await require("./commands.js").execute(client);
  console.log("loading handler...");
  await require("./handler.js").execute(client);
  console.log("loading events...");
  await require("./events.js").execute(client);
  await client.login(config.TOKEN);

  app.listen(3000, () =>
console.log(`nyata`)
);

setInterval(() => {
    fetch('https://replit.com/@u7993357649/nyn')
      .then(res => console.log(`Boobed ${res.status}`))
      .catch(err => console.error(err));
  }, 5000);

};
