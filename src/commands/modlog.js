const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "mod-log",
    aliases: ["modlog"],
    cooldown: 3,
    permission: "ADMINISTRATOR",
    enabled: false,
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = config.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix 
        
        let tik = client.emojis.cache.get(config.emoji.yes)
        let x = client.emojis.cache.get(config.emoji.no)
        let loading = client.emojis.cache.get(config.emoji.load)


 

        if(!args[0]) {
            let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
            if(!kanal) {
                message.react(x)
    message.reply({embeds: [embed.setDescription(`Bir kanal etiketlemelisin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
    return;
            }

            await data.set(`modlog${message.guild.id}`,kanal)

            message.react(tik)
    message.reply({embeds: [embed.setDescription(`Mod Log kanalı ${kanal} olarak ayarlandı!\nSıfırlamak için \`${prefix}modlog sıfırla\``)]}).then(x => setTimeout(() => { x.delete() }, 5000))
    return;
        }
        if(args[0] == 'sıfırla') {
            let control = data.fetch(`modlog${message.guild.id}`)
            if(!control) {
                message.react(x)
                message.reply({embeds: [embed.setDescription(`ayarlı olmayan bir şeyi sıfırlayamazsın!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }
            await data.delete(`modlog${message.guild.id}`)

            message.react(tik)
    message.reply({embeds: [embed.setDescription(`Mod Log kanalı başarıyla sıfırlandı!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
    return;

        }



    }
        

    }
