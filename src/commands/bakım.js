const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "bakım",
    aliases: ["al"],
    cooldown: 3,
    permission: "OWNER",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = config.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix 
        
        let tik = client.emojis.cache.get(config.emoji.yes)
        let x = client.emojis.cache.get(config.emoji.no)
        let loading = client.emojis.cache.get(config.emoji.load)

      let control = data.fetch(client.user.id)

      if(!control) {
          let reason;
          let sebep = args.join(' ')
          if(!sebep) reason = 'Bakım ve komutların düzenlenmesi'; else reason = sebep;

          await data.set(client.user.id, true)
          data.set(client.user.id+':)', { 
            author: message.author,
            time: Date.now(),
            reason: reason
            });
            message.react(tik)
            message.reply({embeds: [embed.setDescription(`Bakım başarıyla açıldı! Artık kimse hiçbir komutu kullanamayacak`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
            return;
      
      } else {
        await data.delete(client.user.id);
        message.react(tik)
        message.reply({embeds: [embed.setDescription(`Bakım sona erdi`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
      }
 
    } 

    }