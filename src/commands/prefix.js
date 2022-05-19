const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "prefix",
    aliases: ["prefix-ayarla"],
    cooldown: 3,
    permission: "ADMINISTRATOR",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = config.bot.cooldown * 1000; 
        let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix 
        
        let tik = client.emojis.cache.get(config.emoji.yes)
        let x = client.emojis.cache.get(config.emoji.no)
        let loading = client.emojis.cache.get(config.emoji.load)

   

        if(!args[0]) {
            message.react(x)
            message.reply({embeds: [embed.setDescription(`Prefixi ayarlamak için \`${prefix}prefix ayarla [prefix]\` & sıfırlamak için \`${prefix}prefix sıfırla\``)]}).then(x => setTimeout(() => { x.delete() }, time))
            return;
        }

        if(args[0] == 'ayarla') {
            let prefixq = args[1]
            if(!prefixq) {
                message.react(x)
                message.reply({embeds: [embed.setDescription(`Bir prefix girmelisin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
            return;
            }

             data.set(`prefix_${message.guild.id}`,prefixq)
             data.push(`prefix1_${message.guild.id}`,prefixq)
            let test = data.get(`prefix1_${message.guild.id}`)
            if(!test) {
        
                message.reply(`Prefix ayarlanıyor.`).then(x => {
                    x.edit(`Prefix ayarlanıyor..`).then(x => { 
                      x.edit(`Prefix ayarlanıyor...`).then(x => { 
                          x.edit(`Prefix ayarlanıyor....`).then(x => {
                              x.edit(`Prefix ayarlanıyor.....`).then(x => {
                                         
                                setTimeout(() => {
                                    message.react(tik)
                                    message.reply({embeds: [embed.setDescription(`Prefix başarıyla \`${prefixq}\` olarak ayarlandı!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))    
                                
                                }, 2500);
                                
                              })
                          })
                      })
                  })
                })

            } else {
               
                message.reply(`Prefix ayarlanıyor.`).then(x => {
                    x.edit(`Prefix ayarlanıyor..`).then(x => { 
                      x.edit(`Prefix ayarlanıyor...`).then(x => { 
                          x.edit(`Prefix ayarlanıyor....`).then(x => {
                              x.edit(`Prefix ayarlanıyor.....`).then(x => {
                                         
                                setTimeout(() => {
                                    message.react(tik)
                                    message.reply({embeds: [embed.setDescription(`Prefix başarıyla \`${prefixq}\` olarak ayarlandı!\n\nTopamda **${test.length}** Adet prefix kayıt edilmiş!\n${test.map((data) => `${data}`).join(" , ")}`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                               
                                }, 2500);
                                
                              })
                          })
                      })
                  })
                })
              
           

            }
       
             return;
        }
        if(args[0] == 'sıfırla') {
            let test = data.get(`prefix1_${message.guild.id}`)
            if(!test) {
                message.react(x)
                message.reply({embeds: [embed.setDescription(`Ayarlamadığın bir şeyi sıfırlayamazsın.`)]}).then(x => setTimeout(() => { x.delete() }, time))
                return;
            }

            data.delete(`prefix_${message.guild.id}`)
            data.delete(`prefix1_${message.guild.id}`)
            
            message.reply(`Prefix ayarlanıyor.`).then(x => {
                x.edit(`Prefix ayarlanıyor..`).then(x => { 
                  x.edit(`Prefix ayarlanıyor...`).then(x => { 
                      x.edit(`Prefix ayarlanıyor....`).then(x => {
                          x.edit(`Prefix ayarlanıyor.....`).then(x => {
                                     
                            setTimeout(() => {
                                message.react(tik)
                                message.reply({embeds: [embed.setDescription(`Prefix başarıyla sıfırlandı!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                               
                            }, 2500);
                            
                          })
                      })
                  })
              })
            })
         
            return;
        }

    }
        

    }