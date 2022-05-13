const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const data = require("quick.db");
const { string } = require("zod");


module.exports = async (member) => {


    let sayaç = data.fetch(`sayac${member.guild.id}`)
    let sayaçkanal = data.fetch(`sayackanal${member.guild.id}`)
    let sayacmesaj = data.fetch(`sayacmesajı${member.guild.id}`)

    if(sayaç || sayaçkanal) {
        let avatar = member.displayAvatarURL({dynamic: true, size: 1024})
        if(avatar.endsWith(".gif?size=1024")) {
            if(!sayacmesaj) {
    
                const girdi = new MessageEmbed()
                .setColor('RED')
                .setThumbnail(member.user.avatarURL({format: 'gif'}))
                .setAuthor({name: member.guild.name})
                .setDescription(` ${member.username} **Adlı kullanıcı sunucudan ayrıldı!** \`${member.guild.memberCount}\` kaldık, **${sayaç}** kişi olmamıza \`${sayaç - member.guild.memberCount}\` kişi kaldı!`)
                .setTimestamp()
                .setFooter((config.bot.BotFooter), member.guild.iconURL()) 
                member.guild.channels.cache.get(sayaçkanal).send({embeds: [girdi]})
            } else {
                let mesaj = sayacmesaj.replace('-kullanıcı-', member).replace('-sunucu-', member.guild.name).replace('-uyesayısı-', member.guild.memberCount).replace('-kalan-', sayaç - member.guild.memberCount).replace('-hedef-', sayaç)
            
                const girdi = new MessageEmbed()
                .setColor('RED')
                .setAuthor({name: member.guild.name})
                .setThumbnail(member.user.avatarURL({format: 'gif'}))
                .setDescription(mesaj)
                .setTimestamp()
                .setFooter((config.bot.BotFooter), member.guild.iconURL()) 
                member.guild.channels.cache.get(sayaçkanal).send({embeds: [girdi]})
            }
            }
    }

}

module.exports.conf = {
    name: "guildMemberRemove"
}
