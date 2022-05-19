const { MessageEmbed } = require("discord.js")
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
const config = require('../../config.json')
module.exports = {
    name: "istatistik",
    aliases: ["i"],
    cooldown: 3,
    permission: "",
    execute: async (client, message, args, embed, author, channel, guild) => {

        const seksizaman = moment
        .duration(client.uptime)
        .format(" D [gün], H [saat], m [dakika], s [saniye]");
      const istatistikler = new MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
        .addField("» **Botun Sahibi**", "<@946496520562311168>")
        .addField("» **Gecikme süreleri**","Mesaj Gecikmesi: {ping1} ms \nBot Gecikmesi: {ping2} ms"
            .replace("{ping1}", new Date().getTime() - message.createdTimestamp)
            .replace("{ping2}", client.ws.ping),true)
      .addField("» **Çalışma süresi**", seksizaman, true)
        .addField("» **Kullanıcılar**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
        .addField("» **Sunucular**", client.guilds.cache.size.toLocaleString(), true)
        .addField("» **Kanallar**", client.channels.cache.size.toLocaleString(), true)
        .addField("**» Bot Davet**"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8)");
      return message.channel.send({embeds: [istatistikler]});
    }
        

    }