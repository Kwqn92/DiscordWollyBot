const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const ayarlar = require('../../config.json')
module.exports = {
    name: "otorol",
    aliases: ["otorol-ayarla","otorolayarla"],
    cooldown: 3,
    permission: "ADMINISTRATOR",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = ayarlar.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || ayarlar.bot.prefix 
        

        let yes = client.emojis.cache.get(ayarlar.emoji.yes)
        let no = client.emojis.cache.get(ayarlar.emoji.no)
        let load = client.emojis.cache.get(ayarlar.emoji.load)
        
        
        let rol = message.mentions.roles.first()
        let kanal = message.mentions.channels.first()
        if(!rol) {
            message.react(no)
        message.reply({embeds: [embed.setDescription(`Bir **rol** etiketlemelisin! Doğru kullanım: \n\`${prefix}otorol-ayarla [@rol] [#kanal] \``)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
        }
        if(!kanal) {
            message.react(no)
        message.reply({embeds: [embed.setDescription(`Bir **kanal** etiketlemelisin! Doğru kullanım: \n\`${prefix}otorol-ayarla [@rol] [#kanal] \``)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
        }
        
        await data.set(`otorol${message.guild.id}`,rol.id)
        await data.set(`otorolkanal${message.guild.id}`,kanal.id)
        message.react(yes)
        message.channel.send({embeds: [embed.setDescription(`Otorol başarıyla ayarlandı!\n\`${rol.name}\` Rolüne ve \`${kanal.name}\` kanalı olarak ayarladım!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        
        

    }
}
