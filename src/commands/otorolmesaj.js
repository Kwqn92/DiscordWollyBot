const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const ayarlar = require('../../config.json')
module.exports = {
    name: "otorol-mesajı",
    aliases: ["otorolmesajı", "otorol-mesaj"],
    cooldown: 3,
    permission: "ADMINISTRATOR",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = ayarlar.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || ayarlar.bot.prefix 

        let tik = client.emojis.cache.get(ayarlar.emoji.yes)
        let x = client.emojis.cache.get(ayarlar.emoji.no)
        let load = client.emojis.cache.get(ayarlar.emoji.load)
        
        
        let otorol = data.fetch(`otorol${message.guild.id}`)
        let otorolkanal = data.fetch(`otorolkanal${message.guild.id}`)
        let otorolmesaj = data.fetch(`otorolmesaj${message.guild.id}`)
        
        if(!otorol || !otorolkanal) {
            message.react(x)
        message.reply({embeds: [embed.setDescription(`Otorol ayarlamadan Giriş mesajını ayarlayamazsın!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
        }
        
        let mesaj = args.join(' ')
        if(!mesaj) {
            message.react(x)
            message.reply({embeds: [embed.setDescription(`Bir otorol giriş mesajı ayarlamalısın! Kullanabileceğin değişkenler\n\`-kullanıcı- & -sunucu- & -rol-\``)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
        }
        
        
        
        await data.set(`otorolmesaj${message.guild.id}`,mesaj)
        message.react(tik)
        message.reply({embeds: [embed.setDescription(`Otorol mesajı başarıyla\`${mesaj}\` olarak ayarlandı!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        
        

    }
}
