const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "kayıt",
    aliases: ["k"],
    cooldown: 3,
    permission: "",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = config.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix 
        
        let yes = client.emojis.cache.get(config.emoji.yes)
        let no = client.emojis.cache.get(config.emoji.no)
        let load = client.emojis.cache.get(config.emoji.load)


        //! Kayıt config
        let control = data.fetch(`kayitsistem${message.guild.id}`) 
        let görevli = data.fetch(`kgörevli${message.guild.id}`) 
        let kkanal = data.fetch(`kkanal${message.guild.id}`)
        let kayıtsız = data.fetch(`kkayıtsız${message.guild.id}`)
        let kayıtlı = data.fetch(`kkayıtlı${message.guild.id}`) 
        let log = data.fetch(`klog${message.guild.id}`) || data.fetch(`modlog${message.guild.id}`)
        let chat = data.fetch(`kchat${message.guild.id}`) 
        let erkek = data.fetch(`kerkek${message.guild.id}`) 
        let kadın = data.fetch(`kkadın${message.guild.id}`) 
        let cinsiyetsistemi = data.fetch(`kcinsiyetsistem1${message.guild.id}`)
        let minyaş = data.fetch(`kminyas${message.guild.id}`) || 12


        /* -------------------------------------------------------------------- */
        //! Cinsiyetsistemi
        let sex;
        if(cinsiyetsistemi) sex = true; else sex = false;
       // console.log(sex)
       // console.log(kkanal.id)
       // console.log(channel.id)
       // console.log(erkek)
       // console.log(kadın)
        //! Cinsiyetsistemi

        //! Hatalar
        if(!control) {
            message.react(no)
            message.reply({embeds: [embed.setDescription(`**Kayıt sistemi** aktif değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
        }
        if(!görevli) {
            message.react(no)
            message.reply({embeds: [embed.setDescription(`**Kayıt görevlisi** ayarlı değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
            return;
        }
        if(!kkanal) {
            message.react(no)
            message.reply({embeds: [embed.setDescription(`**Kayıt kanalı** ayarlı değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
            return;
        }
        if(!kayıtsız) {
            message.react(no)
            message.reply({embeds: [embed.setDescription(`**Kayıtsız rolü** ayarlı değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
            return;
        }
        if(!log) {
            message.react(no)
            message.reply({embeds: [embed.setDescription(`Kayıt **log kanalı** ayarlı değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
            return;
        }
        if(!chat) {
            message.react(no)
            message.reply({embeds: [embed.setDescription(`**Sohbet kanalı** ayarlı değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
            return;
        }

        var kayıtkanalı = message.guild.channels.cache.get(kkanal.id)
        var kgörevli = message.guild.roles.cache.get(görevli.id)
        if(message.channel !== kayıtkanalı) {
            message.react(no)
            message.reply({embeds: [embed.setDescription(`Bu komutu yalnızca ${kayıtkanalı} kanalında kullanabilirsin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
            return;
        }
        
        if(!message.member.roles.cache.has(görevli.id) && !message.member.permissions.has("ADMINISTRATOR")) {
            message.react(no)
            message.reply({embeds: [embed.setDescription(`Bu komutu yalnızca ${kgörevli} rolüne sahip olan kullanıcılar kullanabilir!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
            return;
        }



        if(sex == true) {
            if(!erkek) {
                message.react(no)
                message.reply({embeds: [embed.setDescription(`**Erkek rolü** ayarlı değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }
            if(!kadın) {
                message.react(no)
                message.reply({embeds: [embed.setDescription(`**kadın rolü** ayarlı değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }

 
  var logkanali = message.guild.channels.cache.get(kkanal.id)  // LOGKANALİİD
 
    var rolcukE = message.guild.roles.cache.get(erkek.id) // ERKEK ROLÜ İD
    var rolcukK = message.guild.roles.cache.get(kadın.id) // KIZ ROLÜ İD

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) {
        message.react(no)
        message.reply({embeds: [embed.setDescription(`Kayıt edilecek bir kişi etiketlemelisin`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
    }
    let isim = args[1]
    if(!isim && !isNaN(isim) && isim.length < 15) {
        message.react(no)
        message.reply({embeds: [embed.setDescription(`Geçerli bir isim girmelisin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
    }
    let yaş = args[2]
    if(!yaş && isNaN(yaş) && isim <= minyaş) {
        message.react(no)
        message.reply({embeds: [embed.setDescription(`Geçerli bir yaş girmelisin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
    }
    if(!member.roles.cache.has(kayıtsız.id)) {
        message.react(no)
        message.reply({embeds: [embed.setDescription(`kayıtsız rolüne sahip olmayan birini kayıt edemezsin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
        return;
    }
 
    var mesaj = await logkanali.send(`${member} adlı kullanıcıyı kayıt etmek için bir cinsiyet seçin.`);
    await mesaj.react("💙")
    await mesaj.react("❤️")
 
    
    const filter = (r, user) => user.id !== client.user.id && user.id == author.id;
 
 
    try {
        var collector = mesaj.createReactionCollector(filter, {
            max: 1,
            time: 600000,
        });
 
      
    } catch(e) {
            console.log(e)  
    }
   
 
    collector.on("collect", async (r, user) => {

        
 
        if(r.emoji.name == "💙") {
            message.guild.members.cache.get(member.id).setNickname(isim + ' | ' + yaş)
            let erqeq = message.guild.roles.cache.get(erkek.id)
            member.roles.add(erqeq)
            member.roles.remove(kayıtsız.id)
            data.push(`isimler_${message.guild.id + member.id}`, `\`${isim} | ${yaş}\``);
            data.add(`ktoplam_${message.guild.id + author.id}`, 1)
            data.add(`kerkeksayi_${message.guild.id + author.id}`, 1)
            const names = data.get(`isimler_${message.guild.id + member.id}`)

            if (!names) {
                message.reply({ embeds: [embed.setDescription(`<@${member.id}> adlı kullanıcı başarıyla kayıt edildi! \`${isim}\` adı ve \`${yaş}\` yaşında ${author.tag} kişi tarafından kayıt edildi!`)] });
            } else {
                message.reply({ embeds: [embed.setDescription(`<@${member.id}> adlı kullanıcı başarıyla kayıt edildi! \`${isim}\` adı ve \`${yaş}\` yaşında ${author.tag} kişi tarafından kayıt edildi!\n\n Kullanıcının toplamda " ${names.length} " isim kayıtı görüntülendi.\n${names.map((data) => `${data}`).join("\n")}`)] });
            }
            const embedq = new MessageEmbed()
       .setTitle(message.guild.name + ' Kayıt Sistemi')
           .setTimestamp()
           .setFooter(config.bot.BotFooter)
           .addField(`${client.emojis.cache.get(config.emoji.online)} Kayıt edilen kullanıcı`, `${member}(${member.id})`)
           .addField(`${client.emojis.cache.get(config.emoji.online)} Kayıt eden yetkili`, `${author.tag}(${author.id})`)
           .addField(`${client.emojis.cache.get(config.emoji.online)} Kişinin Adı`, isim)
           .addField(`${client.emojis.cache.get(config.emoji.online)} Kişinin Yaşı`, yaş)
           
           client.channels.cache.get(log.id).send({embeds: [embedq]})
           client.channels.cache.get(chat.id).send(`${member} sunucuya kayıt oldu, aramıza hoş geldin!`);
      
           }
           if(r.emoji.name == "❤️") {
            message.guild.members.cache.get(member.id).setNickname(isim + ' | ' + yaş)
            let erqeq1 = message.guild.roles.cache.get(kadın.id)
            member.roles.add(erqeq1)
            member.roles.remove(kayıtsız.id)
            data.push(`isimler_${message.guild.id + member.id}`, `\`${isim} | ${yaş}\``);
            data.add(`ktoplam_${message.guild.id + author.id}`, 1)
            data.add(`kkadınsayi_${message.guild.id + author.id}`, 1)

            const names = data.get(`isimler_${message.guild.id + member.id}`)

            if (!names) {
                message.reply({ embeds: [embed.setDescription(`<@${member.id}> adlı kullanıcı başarıyla kayıt edildi! \`${isim}\` adı ve \`${yaş}\` yaşında ${author.tag} kişi tarafından kayıt edildi!`)] });
            } else {
                message.reply({ embeds: [embed.setDescription(`<@${member.id}> adlı kullanıcı başarıyla kayıt edildi! \`${isim}\` adı ve \`${yaş}\` yaşında ${author.tag} kişi tarafından kayıt edildi!\n\n Kullanıcının toplamda " ${names.length} " isim kayıtı görüntülendi.\n${names.map((data) => `${data}`).join("\n")}`)] });
            }
            const embedq = new MessageEmbed()
           .setTitle(message.guild.name + ' Kayıt Sistemi')
           .setTimestamp()
           .setFooter(config.bot.BotFooter)
           .addField(`Kayıt edilen kullanıcı`, `${member}(${member.id})`)
           .addField(`Kayıt eden yetkili`, `${author.tag}(${author.id})`)
           .addField(`Kişinin Adı`, isim)
           .addField(`Kişinin Yaşı`, yaş)
           
           client.channels.cache.get(log.id).send({embeds: [embedq]})
           client.channels.cache.get(chat.id).send(`${member} sunucuya kayıt oldu, aramıza hoş geldin!`);
      
           }
           
           
     });
 
 
     collector.on('end', async collected => {
        if(mesaj) await setTimeout(() => { mesaj.delete() }, 5000)
    });
 
 
           

    return;
        }

        if(sex == false) {
            if(!kayıtlı) {
                message.react(no)
                message.reply({embeds: [embed.setDescription(`**Kayıtlı rolü** ayarlı değil!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }

            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!member) {
                message.react(no)
                message.reply({embeds: [embed.setDescription(`Kayıt edilecek bir kişi etiketlemelisin`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }
            let isim = args[1]
            if(!isim) {
                message.react(no)
                message.reply({embeds: [embed.setDescription(`bir isim girmelisin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }
            if(isim.length > 15) {
                message.react(no)
                message.reply({embeds: [embed.setDescription(`Geçerli bir isim girmelisin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }   
            let yaş = args[2]
            if(!yaş) {
                message.react(no)
                message.reply({embeds: [embed.setDescription(`Geçerli bir yaş girmelisin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }
            if(yaş < minyaş) {
                message.react(no)
                message.reply({embeds: [embed.setDescription(`Geçerli bir yaş girmelisin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }
            
            if(!member.roles.cache.has(kayıtsız.id)) {
                message.react(no)
                message.reply({embeds: [embed.setDescription(`kayıtsız rolüne sahip olmayan birini kayıt edemezsin!`)]}).then(x => setTimeout(() => { x.delete() }, 5000))
                return;
            }

            message.guild.members.cache.get(member.id).setNickname(isim + ' | ' + yaş)
            member.roles.add(kayıtlı.id)
            member.roles.remove(kayıtsız.id)
            data.push(`isimler_${member.id}`, `\`${isim} | ${yaş}\``);
            data.add(`ktoplam_${author.id}`, 1)

            const names = data.get(`isimler_${member.id}`)

            if (!names) {
                message.reply({ embeds: [embed.setDescription(`<@${member.id}> adlı kullanıcı başarıyla kayıt edildi! \`${isim}\` adı ve \`${yaş}\` yaşında ${author.tag} kişi tarafından kayıt edildi!`)] });
            } else {
                message.reply({ embeds: [embed.setDescription(`<@${member.id}> adlı kullanıcı başarıyla kayıt edildi! \`${isim}\` adı ve \`${yaş}\` yaşında ${author.tag} kişi tarafından kayıt edildi!\n\n Kullanıcının toplamda " ${names.length} " isim kayıtı görüntülendi.\n${names.map((data) => `${data}`).join("\n")}`)] });
            }

            const embedq = new MessageEmbed()
            .setTitle(message.guild.name + ' Kayıt Sistemi')
            .setTimestamp()
            .setFooter(config.bot.BotFooter)
            .addField(`Kayıt edilen kullanıcı`, `${member}(${member.id})`)
            .addField(`Kayıt eden yetkili`, `${author.tag}(${author.id})`)
            .addField(`Kişinin Adı`, isim)
            .addField(`Kişinin Yaşı`, yaş)
            
            client.channels.cache.get(log.id).send({embeds: [embedq]})
            client.channels.cache.get(chat.id).send(`${member} sunucuya kayıt oldu, aramıza hoş geldin!`);
       
return;
        }



    }
        

    }