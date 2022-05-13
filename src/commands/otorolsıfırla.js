const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const ayarlar = require('../../config.json')
module.exports = {
    name: "otorol-sıfırla",
    aliases: ["otorolsıfırla"],
    cooldown: 3,
    permission: "ADMINISTRATOR",
    execute: async (client, message, args, embed, author, channel, guild) => {


        let time = ayarlar.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || ayarlar.bot.prefix 
        

        let yes = client.emojis.cache.get(ayarlar.emoji.yes)
        let no = client.emojis.cache.get(ayarlar.emoji.no)
        let load = client.emojis.cache.get(ayarlar.emoji.load)
        
        
        let otorol = data.fetch(`otorol${message.guild.id}`)
        let otorolkanal = data.fetch(`otorolkanal${message.guild.id}`)
        let otorolmesaj = data.fetch(`otorolmesaj${message.guild.id}`)
        if(!otorol || !otorolkanal || !otorolmesaj) {
            message.react(no)
        message.reply({embeds: [embed.setDescription(`Ayarlanmamış bir şeyi sıfırlayamazsın!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
        }
        
        await data.delete(`otorol${message.guild.id}`)
        await data.delete(`otorolkanal${message.guild.id}`)
        await data.delete(`otorolmesaj${message.guild.id}`)
        message.react(yes)
        message.reply({embeds: [embed.setDescription(`Otorol başarıyla sıfırlandı! Tekrar ayarlamak için\n\`${prefix}otorol-ayarla\``)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        
        

    }
}
