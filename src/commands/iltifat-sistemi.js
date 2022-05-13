const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "iltifat",
    aliases: ["iltifat-sistemi"],
    cooldown: 3,
    permission: "ADMINISTRATOR",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let control = data.fetch(`iltifatsistem${message.guild.id}`)

        if(!control) {
            data.set(`iltifatsistem${message.guild.id}`,'acik')

            message.reply(`İltifat sistemi ayarlanıyor.`).then(x => {
                x.edit(`İltifat sistemi ayarlanıyor..`).then(x => { 
                  x.edit(`İltifat sistemi ayarlanıyor...`).then(x => { 
                      x.edit(`İltifat sistemi ayarlanıyor....`).then(x => {
                          x.edit(`İltifat sistemi ayarlanıyor.....`).then(x => {
                                     
                            setTimeout(() => { 
                                message.react(client.emojis.cache.get(config.emoji.yes))
                                x.edit({embeds: [embed.setDescription(`Başarıyla iltifat sistemi aktif edildi! artık \`70\` mesajda bir iltifat edilecek!`)]}).then(x => {setTimeout(() => {x.delete()},config.bot.cooldown * 1000)})
                                return;
                             },500)
                            
                          })
                      })
                  })
              })
            })
            

        } else {
            data.delete(`iltifatsistem${message.guild.id}`)
            message.reply(`İltifat sistemi ayarlanıyor.`).then(x => {
                x.edit(`İltifat sistemi ayarlanıyor..`).then(x => { 
                  x.edit(`İltifat sistemi ayarlanıyor...`).then(x => { 
                      x.edit(`İltifat sistemi ayarlanıyor....`).then(x => {
                          x.edit(`İltifat sistemi ayarlanıyor.....`).then(x => {
                                     
                            setTimeout(() => { 
                                message.react(client.emojis.cache.get(config.emoji.yes))
                                x.edit({embeds: [embed.setDescription(`Başarıyla iltifat sistemi deAktif edildi! `)]}).then(x => {setTimeout(() => {x.delete()},config.bot.cooldown * 1000)})
                                return;
                             },500)
                            
                          })
                      })
                  })
              })
            })
            
        }
        

    }
}
