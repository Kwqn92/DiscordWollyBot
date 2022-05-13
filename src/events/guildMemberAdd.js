const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const data = require("quick.db");
const { string } = require("zod");


module.exports = async (member) => {

    let girdiki = client.emojis.cache.get(config.emoji.guard1)
    let otorol = data.fetch(`otorol${member.guild.id}`)
    let otorolkanal = data.fetch(`otorolkanal${member.guild.id}`)
    let otorolmesaj = data.fetch(`otorolmesaj${member.guild.id}`)

    if(!otorol || !otorolkanal) return; 

    let avatar = member.displayAvatarURL({dynamic: true, size: 1024})
    if(avatar.endsWith(".gif?size=1024")) {
        if(!otorolmesaj) {

            const girdi = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(member.user.avatarURL({format: 'gif'}))
            .setAuthor({name: member.guild.name})
            .setDescription(`${girdiki} | ${member} **Adlı kullanıcı sunucuya katıldı!** <@&${otorol}> **Rolü başarıyla verildi!**`)
            .setFooter((config.bot.BotFooter), member.guild.iconURL()) 
            member.guild.channels.cache.get(otorolkanal).send({embeds: [girdi]})
        } else {
            let mesaj = otorolmesaj.replace('-kullanıcı-', member).replace('-sunucu-', member.guild.name).replace('-rol-', `<@&${otorol}>`)
        
            const girdi = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({name: member.guild.name})
            .setThumbnail(member.user.avatarURL({format: 'gif'}))
            .setDescription(`**${mesaj}**`)
            .setFooter((config.bot.BotFooter), member.guild.iconURL()) 
            member.guild.channels.cache.get(otorolkanal).send({embeds: [girdi]})
        }
        } else {    if(!otorolmesaj) {

            const girdi = new MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(member.user.avatarURL())
            .setAuthor({name: member.guild.name})
            .setDescription(`${girdiki} | ${member} **Adlı kullanıcı sunucuya katıldı!** <@&${otorol}> **Rolü başarıyla verildi!**`)
            .setFooter((config.bot.BotFooter), member.guild.iconURL()) 
            member.guild.channels.cache.get(otorolkanal).send({embeds: [girdi]})
        } else {
            let mesaj = otorolmesaj.replace('-kullanıcı-', member).replace('-sunucu-', member.guild.name).replace('-rol-', `<@&${otorol}>`)
        
            const girdi = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({name: member.guild.name})
            .setThumbnail(member.user.avatarURL())
            .setDescription(`**${mesaj}**`)
            .setFooter((config.bot.BotFooter), member.guild.iconURL()) 
            member.guild.channels.cache.get(otorolkanal).send({embeds: [girdi]})
        }
        }

    member.guild.members.cache.get(member.id).roles.add(otorol)
    

}

module.exports.conf = {
    name: "guildMemberAdd"
}
