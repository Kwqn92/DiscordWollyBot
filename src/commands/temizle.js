const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "sil",
    aliases: ["temizle"],
    cooldown: 3,
    permission: "MANAGE_MESSAGES",
    execute: async (client, message, args, embed, author, channel, guild) => {
var yes = client.emojis.cache.get(config.emoji.yes)

        let miktar = args[0]
        if(isNaN(miktar) || miktar > 100 || miktar < 1 || !miktar)  {
            message.react(client.emojis.cache.get(config.emoji.no))
            message.reply(`Lütfen en fazla 100 olacak değerde bir sayı giriniz.`).then(x => {setTimeout(() => {x.delete()},config.bot.cooldown * 1000)})
            return;
        }

        message.reply(`Sohbet temizleniyor.`).then(x => {
            x.edit(`Sohbet temizleniyor..`).then(x => { 
              x.edit(`Sohbet temizleniyor...`).then(x => { 
                  x.edit(`Sohbet temizleniyor....`).then(x => {
                      x.edit(`Sohbet temizleniyor.....`).then(x => {
                        setTimeout(() => {
                            message.channel.bulkDelete(miktar)
                            message.channel.send(` Başarıyla \`${miktar}\` adet mesaj başarıyla silindi!`).then(y => {
                                 y.react(yes), 
                                setTimeout(() => {y.delete()},config.bot.cooldown * 1000)})
                       }, 1000);  
                        
                      })
                  })
              })
          })
        })
     
                

    }
}
