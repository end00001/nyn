const { readdirSync } = require("node:fs");
const { Events } = require("discord.js");

module.exports = {
  async execute(client) {
    const PATH = process.cwd() + "/src/Events";
    const events = readdirSync(PATH);

    client.on(Events.GuildMemberAdd, async (member) => {
      const roleId = "1382360617922596914";
      const role = member.guild.roles.cache.get(roleId);
      
      await member.roles.add(role);
    });
    for (let event of events) {
      event = event.split(".")[0];
      client.on(event, async (...args) => {
        await require(`${PATH}/${event}.js`).execute(...args);
      });
    }

    client.on(Events.MessageCreate, async (message) => {
      if (!client.config.evil) { return };
      if (message.author.bot) { return };
      if (message.channel.id === `1410800163466907768`) {
        const reply = message.reply(`@everyone :33`).then(message => {
          setTimeout(() => message.delete(), 10000);
        });
      }
    });
  },
};
