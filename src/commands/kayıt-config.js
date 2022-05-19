const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "kayıt-ayarlar",
    aliases: ["kayıtayar","kayıtayar"],
    cooldown: 3,
    permission: "ADMINISTRATOR",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = config.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix 
        
        let tik = client.emojis.cache.get(config.emoji.yes)
        let x = client.emojis.cache.get(config.emoji.no)
        let loading = client.emojis.cache.get(config.emoji.load)

        let control = data.fetch(`kayitsistem${message.guild.id}`) 
        if(!control) control = "Ayarlanmamış!"; else control = "Aktif"
        let görevli = data.fetch(`kgörevli${message.guild.id}`) 
        if(!görevli) görevli = "Ayarlanmamış!"; else görevli = `<@&${görevli.id}>`
        let kanal11 = data.fetch(`kkanal${message.guild.id}`)
        if(!kanal11) kanal11 = "Ayarlanmamış!"; else kanal11 = `<#${kanal11.id}>`
        let kayıtsız = data.fetch(`kkayıtsız${message.guild.id}`)
        if(!kayıtsız) kayıtsız = "Ayarlanmamış!"; else kayıtsız = `<@&${kayıtsız.id}>`
        let kayıtlı = data.fetch(`kkayıtlı${message.guild.id}`) 
        if(!kayıtlı) kayıtlı = "Ayarlanmamış!"; else kayıtlı = `<@&${kayıtlı.id}>`
        let log = data.fetch(`klog${message.guild.id}`) || data.fetch(`modlog${message.guild.id}`)
        if(!log) log = "Ayarlanmamış!"; else log = `<#${log.id}>` 
        let chat = data.fetch(`kchat${message.guild.id}`) 
        if(!chat) chat = "Ayarlanmamış!"; else chat = `<#${chat.id}>` 
        let erkek = data.fetch(`kerkek${message.guild.id}`) 
        if(!erkek) erkek = "Ayarlanmamış!"; else erkek = `<@&${erkek.id}>`
        let kadın = data.fetch(`kkadın${message.guild.id}`) 
        if(!kadın) kadın = "Ayarlanmamış!"; else kadın = `<@&${kadın.id}>`
        let cinsiyetsistemiq = data.fetch(`kcinsiyetsistem1${message.guild.id}`)
        if(!cinsiyetsistemiq) cinsiyetsistemiq = "Aktif değil!"; else cinsiyetsistemiq = `Aktif`
        let minyaş = data.fetch(`kminyas${message.guild.id}`) 
        if(!minyaş) minyaş = "12"; else minyaş = `${minyaş}`

        if(!control) {
          message.react(no)
          message.reply({embeds: [embed.setDescription(`**Kayıt sistemi** aktif değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
      return;
  }

        if(!args[0]) {
            const embedq = new MessageEmbed()
        .setColor('BLACK')
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
        .setTitle(`${client.user.username} Kayıt sistemi`)
        .addField(`\`kayıtsistemi:\``, control, true)
        .addField(`\`kayıtgörevlisi:\``, görevli, true)
        .addField(`\`kayıtkanalı:\``, kanal11, true)
        .addField(`\`kayıtlırolü:\``, kayıtlı, true)
        .addField(`\`kayıtsızrolü:\``, kayıtsız, true)
        .addField(`\`kayıtlogkanalı:\``, log, true)
        .addField(`\`sohbetkanalı:\``, chat, true)
        .addField(`\`erkekrolü:\``, erkek, true)
        .addField(`\`kadınrolü:\``, kadın, true)
        .addField(`\`minimumyaş:\``, minyaş, true)
        .addField(`\`cinsiyetsistemi:\``, cinsiyetsistemiq, true)
        .setDescription(`Kayıt sistemi ayarlarını ayarlamak için \`${prefix}kayıt-ayar [değişken]\`\nDeğişkenler tür isimleridir. Örn: \`${prefix}kayıt-ayar kayıtlırolü\`\n`)
        message.react(loading)
        message.reply({embeds: [embedq]}).then(x => setTimeout(() => { x.delete() }, 90000))
        return;
        }
        if(args[0] == 'kayıtgörevlisi') {
            let kanal = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            if(!kanal) {
                    const embeds = new MessageEmbed()
         .setDescription(`${message.author} Bir Rol Etiketle!!.`)
         .setColor('0x800d0d')
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
            }
              await data.set(`kgörevli${message.guild.id}`,kanal) 
                     const embeds = new MessageEmbed()
         .setDescription(`${message.author} Kayıt görevlisi rolü ${kanal} Olarak Ayarlandı!.`)
         .setColor('0x800d0d')
       .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
        }

        if(args[0] == 'kayıtkanalı') {
            let kanalf = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
            if(!kanalf) {
                    const embeds = new MessageEmbed()
         .setDescription(`${message.author} Bir kanal Etiketle!!.`)
         .setColor('0x800d0d')
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
            } 
              await data.set(`kkanal${message.guild.id}`, kanalf)
                     const embeds = new MessageEmbed()
         .setDescription(`${message.author} Kayıt Kanalı ${kanalf} Olarak Ayarlandı!.`)
         .setColor('0x800d0d')
       .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
        }
        if(args[0] == 'kayıtlırolü') {
            let krolü = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            if(!krolü) {
                    const embeds = new MessageEmbed()
         .setDescription(`${message.author} Bir rol Etiketle!!.`)
         .setColor('0x800d0d')
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
            }
              await data.set(`kkayıtlı${message.guild.id}`,krolü) 
                     const embeds = new MessageEmbed()
         .setDescription(`${message.author} Kayıtlı rolü ${krolü} Olarak Ayarlandı!.`)
         .setColor('0x800d0d')
       .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
        }
        if(args[0] == 'kayıtsızrolü') {
            let ksizrol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            if(!ksizrol) {
                    const embeds = new MessageEmbed()
         .setDescription(`${message.author} Bir rol Etiketle!!.`)
         .setColor('0x800d0d')
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
            }
              await data.set(`kkayıtsız${message.guild.id}`,ksizrol) 
                     const embeds = new MessageEmbed()
         .setDescription(`${message.author} Kayıtsız rolü ${ksizrol} Olarak Ayarlandı!.`)
         .setColor('0x800d0d')
       .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
        }
        if(args[0] == 'kayıtlogkanalı') {
            let klog = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
            if(!klog) {
                    const embeds = new MessageEmbed()
         .setDescription(`${message.author} Bir kanal Etiketle!!.`)
         .setColor('0x800d0d')
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
            }
              await data.set(`klog${message.guild.id}`,klog)
                     const embeds = new MessageEmbed()
         .setDescription(`${message.author} Kayıt log kanalı ${klog} Olarak Ayarlandı!.`)
         .setColor('0x800d0d')
       .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
        }
        if(args[0] == 'sohbetkanalı') {
            let chatq = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
            if(!chatq) {
                    const embeds = new MessageEmbed()
         .setDescription(`${message.author} Bir kanal Etiketle!!.`)
         .setColor('0x800d0d')
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
            }
              await data.set(`kchat${message.guild.id}`,chatq)
                     const embeds = new MessageEmbed()
         .setDescription(`${message.author} Sohbet kanalı ${chatq} Olarak Ayarlandı!.`)
         .setColor('0x800d0d')
       .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
        }
        if(args[0] == 'erkekrolü') {
            if(!data.fetch(`kcinsiyetsistem1${message.guild.id}`)) {
                message.react(x)
                message.reply({embeds: [embed.setDescription(`Öncelikle Cinsiyet sistemini açmalısın!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }
            let erol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            if(!erol) {
                    const embeds = new MessageEmbed()
         .setDescription(`${message.author} Bir rol Etiketle!!.`)
         .setColor('0x800d0d')
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
            }
              await data.set(`kerkek${message.guild.id}`,erol) 
                     const embeds = new MessageEmbed()
         .setDescription(`${message.author} Erkek rolü ${erol} Olarak Ayarlandı!.`)
         .setColor('0x800d0d')
       .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
        }
        if(args[0] == 'kadınrolü') {
            if(!data.fetch(`kcinsiyetsistem1${message.guild.id}`)) {
                message.react(x)
                message.reply({embeds: [embed.setDescription(`Öncelikle Cinsiyet sistemini açmalısın!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }
            let krol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            if(!krol) {
                    const embeds = new MessageEmbed()
         .setDescription(`${message.author} Bir rol Etiketle!!.`)
         .setColor('0x800d0d')
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
            }
              await data.set(`kkadın${message.guild.id}`,krol) 
                     const embeds = new MessageEmbed()
         .setDescription(`${message.author} Kadın rolü ${krol} Olarak Ayarlandı!.`)
         .setColor('0x800d0d')
       .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
        }
        if(args[0] == 'minimumyaş') {
            let minyas = args[1]
            if(!minyas && !isNaN(minyas)) {
                    const embeds = new MessageEmbed()
         .setDescription(`${message.author} Bir yaş gir!!.`)
         .setColor('0x800d0d')
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
            }
              await data.set(`kminyas${message.guild.id}`,minyas) 
                     const embeds = new MessageEmbed()
         .setDescription(`${message.author} Minimum kayıt yaşı ${minyas} Olarak Ayarlandı!.`)
         .setColor('0x800d0d')
       .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
                     .setFooter(message.author.tag + ` Tarafından İstendi`)
         .setTimestamp()
           message.channel.send({embeds: [embeds]}).then(x => {
             message.delete()
             setTimeout(() => {
               x.delete()
             }, 5000);
           })
        }
        if(args[0] == 'cinsiyetsistemi') {
           
            if(!data.fetch(`kcinsiyetsistem1${message.guild.id}`)) {
                data.set(`kcinsiyetsistem1${message.guild.id}`,'true')
                data.delete(`kkayıtlı${message.guild.id}`)
                message.reply({embeds: [embed.setDescription(`Cinsiyet sistemi başarıyla açıldı!`)]})
                return;
            }
            if(data.fetch(`kcinsiyetsistem1${message.guild.id}`)) {
                data.delete(`kcinsiyetsistem1${message.guild.id}`)
                data.delete(`kerkek${message.guild.id}`)
                data.delete(`kkadın${message.guild.id}`)
                message.reply({embeds: [embed.setDescription(`Cinsiyet sistemi başarıyla kapatıldı!`)]})
                return;
            }
        }
    }
        

    }
