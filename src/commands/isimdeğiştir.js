const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "isimdeğiştir",
    aliases: ["isimdeğiştir"],
    cooldown: 3,
    permission: "MANAGE_NICKNAMES",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = config.bot.cooldown * 1000;
        let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix 
        
        let tik = client.emojis.cache.get(config.emoji.yes)
        let x = client.emojis.cache.get(config.emoji.no)
        let loading = client.emojis.cache.get(config.emoji.load)

        let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!kişi) {
            message.react(x)
            message.reply({embeds: [embed.setDescription(`Lütfen bir Kullanıcı ve bir isim girin. Doğru kullanım \`${prefix}isimdeğiştir [@kullanıcı] [Yeni isim]\``)]}).then(x => setTimeout(() => { x.delete() }, time))
            return;
        }
        let isim = args.slice(1).join(' ')
        if(!isim) {
            message.react(x)
            message.reply({embeds: [embed.setDescription(`Lütfen bir Kullanıcı ve bir isim girin. Doğru kullanım \`${prefix}isimdeğiştir [@kullanıcı] [Yeni isim]\``)]}).then(x => setTimeout(() => { x.delete() }, time))
            return;
        }


        let names = data.get(`changename${message.guild.id + kişi.id}`)

        message.guild.members.cache.get(kişi.id).setNickname(isim)
        data.push(`changename${message.guild.id + kişi.id}`, `\`${isim}\``)
        message.react(tik)
        message.reply({embeds: [embed.setDescription(`\`${kişi.user.tag}\` Adlı kullanıcının ismi başarıyla \`${isim}\` olarak değiştirildi!\n\n${names.map((data) => `${data}`).join("\n")}`)]}).then(x => setTimeout(() => { x.delete() }, time))
        return;


    }
        

    }