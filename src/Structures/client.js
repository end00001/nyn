const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
  presence: {
    activities: [{ name: ":33", type: 0 }],
    status: "idle",
  },
});

client.commands = new Collection();

module.exports.start = async (config) => {
  client.config = config;

  console.log("loading commands...");
  await require("./commands.js").execute(client);
  console.log("loading handler...");
  await require("./handler.js").execute(client);
  console.log("loading events...");
  await require("./events.js").execute(client);
  await client.login(config.TOKEN);
};
