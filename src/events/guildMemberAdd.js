const data = require("quick.db");
const config = require("../../config.json");
const moment = require("moment");
const client = global.client;
moment.locale("tr");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js")



module.exports = async (member,embed) => {

    let control = data.fetch(`kayitsistem${member.guild.id}`) 
    let görevli = data.fetch(`kgörevli${member.guild.id}`) 
    let kkanal = data.fetch(`kkanal${member.guild.id}`)
    var kurulus = (Date.now() - member.user.createdTimestamp);
    var zaman = moment.duration(kurulus).format("Y [yıl], M [ay]");
    var zaman2 = moment.duration(kurulus).format("DD [Gün], HH [saat], mm [dakika], ss [saniye]");
    const date = moment(member.user.createdAt)
    const startedAt = Date.parse(date);
    var msecs = Math.abs(new Date() - startedAt);
    const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
    msecs -= years * 1000 * 60 * 60 * 24 * 365;
    const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
    msecs -= months * 1000 * 60 * 60 * 24 * 30;
    const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
    msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
    const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
    msecs -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(msecs / (1000 * 60 * 60));
    msecs -= hours * 1000 * 60 * 60;
    const mins = Math.floor((msecs / (1000 * 60)));
    msecs -= mins * 1000 * 60;
    const secs = Math.floor(msecs / 1000);
    msecs -= secs * 1000;
    var string = "";
    if (years > 0) string += `${years} yıl ${months} ay`
    else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks + " hafta" : ""}`
    else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days + " gün" : ""}`
    else if (days > 0) string += `${days} gün ${hours > 0 ? hours + " saat" : ""}`
    else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins + " dakika" : ""}`
    else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs + " saniye" : ""}`
    else if (secs > 0) string += `${secs} saniye`
    string = string.trim();
    const endAt = member.user.createdAt
    const gün = moment(new Date(endAt).toISOString()).format('DD')
    const ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    const yıl = moment(new Date(endAt).toISOString()).format('YYYY')
    const saat = moment(new Date(endAt).toISOString()).format('HH:mm')
    const kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
    if(control && kkanal) {
        let g2 = member.guild.roles.cache.get(görevli.id)
        if (kurulus > 604800000) {
            member.setNickname(`İsim | Yaş`);
    
    /**
     * :tada::tada: Sunucumuza hoş geldin ${member}!
            
    Hesabın ${kuruluş} tarihinde (**${zaman}**) önce oluşturulmuş.
    Sunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin!
    
    <@&${config.registration.staff}> rolündeki yetkililerimiz seninle ilgilenecektir.
    
    Seninle birlikte **${member.guild.memberCount}** üyeye ulaştık!
     */
    
    let aktif = client.emojis.cache.get(config.emoji.online)
    let kırz = client.emojis.cache.get(config.emoji.idle)
    let loading = client.emojis.cache.get(config.emoji.load)
            member.guild.channels.cache.get(kkanal.id).send(`
          ${loading} Sunucumuza hoş geldin ${member}!
            
          ${loading} Hesabın \`${kuruluş}\` tarihinde (**${zaman}**) önce oluşturulmuş. Durumun \`Güvenli\` ${aktif}
            Sunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin!
            
            ${g2} rolündeki yetkililerimiz seninle ilgilenecektir.
            
            Seninle birlikte \`${member.guild.memberCount}\` üyeye ulaştık!
                    `);

             
    
        } else {
            member.guild.channels.cache.get(kkanal.id).send(`
            ${loading} Sunucumuza hoş geldin ${member}!
            
            ${loading} Hesabın \`${kuruluş}\` tarihinde (**${zaman}**) önce oluşturulmuş. Durumun \`Şüpheli!\` ${kırz}
            Sunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin!
            
            ${g2} rolündeki yetkililerimiz seninle ilgilenecektir.
            
            Seninle birlikte \`${member.guild.memberCount}\` üyeye ulaştık!
                    `);
        }
    
    
    }
    
    let girdiki = client.emojis.cache.get(config.emoji.guard1)
    let otorolkanal = data.fetch(`otorolkanal${member.guild.id}`)
    let otorolmesaj = data.fetch(`otorolmesaj${member.guild.id}`)
    let otorol = data.fetch(`otorol${member.guild.id}`)
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