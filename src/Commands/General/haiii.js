  const { EmbedBuilder } = require("discord.js");
  
  module.exports = {
    data: {
      name: "haiii",
      description: "ping",
      dm_permissions: "0",
    },
    async execute(interaction, client) {
      if (!client.config.evil) { return };
      const embed = new EmbedBuilder()
        .setTitle("HAIII :3")
        .addFields([
          { name: ":3", value: `HAIII, WAKE UP!! :33`},
          { name: "Permissions", value: `If you'd like to ping everyone during "chaos time", it's "/haiii" :33` },
        ])
        .setColor("#ffffff");
  
      return await interaction.reply({
        content: "@everyone",
        embeds: [embed],
        allowedMentions: { parse: ["everyone"] }
      });
    },
  };