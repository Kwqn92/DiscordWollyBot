const Discord = require("discord.js");
const data = require("quick.db");
const config = require("../../config.json")
module.exports = {
    name: "teyit-sayı",
    cooldown: 3,
    aliases: ["kayıt-sayı", "teyitsayı", "kayıtsayı"],
    permission: '',
    execute: async (client, message, args, embed, author, channel, guild) => {
        let control = data.fetch(`kayitsistem${message.guild.id}`) 
        if(!control) {
            message.react(no)
            message.reply({embeds: [embed.setDescription(`**Kayıt sistemi** aktif değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
        }
        let user;
        var member = message.mentions.users.first()
        if(!member) {
            user = message.author.id
        } else {
            user = member.id
        }
        let görevli = data.fetch(`kgörevli${message.guild.id}`) 
        let g2 = message.guild.roles.cache.get(görevli.id)
        let kadın = await data.fetch(`kkadınsayi_${user}`) || "0"
        let erkek = await data.fetch(`kerkeksayi_${user}`) || "0"
        let toplam = await data.fetch(`ktoplam_${user}`) || "0"

        const a = new Discord.MessageEmbed()
        .setDescription(`<@${user}> adlı kişinin teyit durumu`)
        .addField(`Erkek kayıt`,String(erkek), true)
        .addField(`Kadın kayıt`,String(kadın), true)
        .addField(`Toplam kayıt`,String(toplam), true)
        .setColor(message.member.displayHexColor)
        .setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 }))
        .setTimestamp()
        .setFooter((config.bot.BotFooter), message.guild.iconURL())
        message.channel.send({embeds:[a]})
        

       

        }
}