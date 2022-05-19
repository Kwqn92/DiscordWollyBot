const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "küfür-engel",
    aliases: ["küfürengel"],
    cooldown: 3,
    permission: "ADMINISTRATOR",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = config.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix 
        
        let tik = client.emojis.cache.get(config.emoji.yes)
        let x = client.emojis.cache.get(config.emoji.no)
        let loading = client.emojis.cache.get(config.emoji.load)


        if(args[0] == 'sıfırla') {
            let control = data.fetch(`küfürlog${message.guild.id}`)
            if(!control) {
                message.react(x)
                message.reply({embeds: [embed.setDescription(`ayarlı olmayan bir şeyi sıfırlayamazsın!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }
            await data.delete(`küfürlog${message.guild.id}`)

            message.react(tik)
    message.reply({embeds: [embed.setDescription(`Log kanalı başarıyla sıfırlandı!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
    return;

        }

        
     
        let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!kanal) {
            message.react(x)
message.reply({embeds: [embed.setDescription(`Bir kanal etiketlemelisin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
return;
        }

        await data.set(`küfürlog${message.guild.id}`,kanal)

        message.react(tik)
message.reply({embeds: [embed.setDescription(`Log kanalı ${kanal} olarak ayarlandı!\nSıfırlamak için \`${prefix}küfür-engel sıfırla\``)]}).then(x => setTimeout(() => { x.delete() }, 5000))




    }
        

    }
