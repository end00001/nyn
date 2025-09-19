const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js");
const http = require(`http`)
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("nyata");
});
server.listen(PORT, () => {
  console.log(`nyah`);
});

const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
  presence: {
    activities: [{ name: ":33", type: 0 }],
    status: "idle",
  },
});

client.commands = new Collection();

function decrypt(text, shift) {
    return text.split('').map(char => {
        return String.fromCharCode(char.charCodeAt(0) - shift);
    }).join('');
}

function encrypt(text, shift) {
    return text.split('').map(char => {
        return String.fromCharCode(char.charCodeAt(0) + shift);
    }).join('');
}

module.exports.start = async (config) => {
  client.config = config;

  console.log("loading commands...");
  await require("./commands.js").execute(client);
  console.log("loading handler...");
  await require("./handler.js").execute(client);
  console.log("loading events...");
  await require("./events.js").execute(client);
  await client.login(decrypt(config.TOKEN, 1));

setInterval(() => {
  http.get(`http://localhost:${PORT}`, (res) => {
    console.log(`Self-nyating, status: ${res.statusCode}`);
  }).on("error", (err) => {
    console.error(err.message);
  });
}, 5000);
};
