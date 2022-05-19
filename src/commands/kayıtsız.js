const Discord = require("discord.js");
const data = require("quick.db");
const config = require("../../config.json")
module.exports = {
    name: "unregistered",
    permission: '',
    aliases: ["unreg", "ksiz", "kayıtsız"],
    execute: async (client, message, args, embed, author, channel, guild) => {

        let tik = client.emojis.cache.get(config.emoji.yes)
        let x = client.emojis.cache.get(config.emoji.no)
        let loading = client.emojis.cache.get(config.emoji.load)

        let control = data.fetch(`kayitsistem${message.guild.id}`) 
        if(!control) {
            message.react(x)
            message.reply({embeds: [embed.setDescription(`**Kayıt sistemi** aktif değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
        }
        let görevli = data.fetch(`kgörevli${message.guild.id}`) 
        let g2 = message.guild.roles.cache.get(görevli.id)
        let kayıtsız = data.fetch(`kkayıtsız${message.guild.id}`)
        let log = data.fetch(`klog${message.guild.id}`) 
        let g3 = message.guild.roles.cache.get(kayıtsız.id)
        const kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!message.member.roles.cache.has(g2) &&  !message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription("Komutu kullanmak için kayıt yetkilisi olmalısın!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if(!kişi) { message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir üye belirtmelisin.")] });
        return }
        if(message.author.id === kişi.id){ message.reply({ embeds: [embed.setDescription("Kendinizi kayıtsıza atamazsınız.")] });
        return}
        await kişi.roles.remove(kişi.roles.cache)
        await kişi.roles.add(kayıtsız.id)
        await kişi.setNickname(`İsim | Yaş`)
        message.reply({ embeds: [embed.setDescription(`${kişi} kullanıcısı başarıyla kayıtsıza (${g3}) atıldı.`)] });
        const embedq = new Discord.MessageEmbed()
        .setTitle(message.guild.name + ' Kayıt Sistemi')
        .setTimestamp()
        .setFooter(config.bot.BotFooter)
        .addField(`${client.emojis.cache.get(config.emoji.star)} Kayıtsız'a alınan kullanıcı`, `${kişi}(${kişi.id})`)
        .addField(`${client.emojis.cache.get(config.emoji.star)} Kayıtsız'a alan yetkili`, `${author.tag}(${author.id})`)
        
        client.channels.cache.get(log.id).send({embeds: [embedq]})

    }
}