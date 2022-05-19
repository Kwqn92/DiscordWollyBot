const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "kayıt-sistemi",
    aliases: ["kayıtsistemi"],
    cooldown: 3,
    permission: "",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let time = config.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix 
        
        let tik = client.emojis.cache.get(config.emoji.yes)
        let x = client.emojis.cache.get(config.emoji.no)
        let yükleniyor = client.emojis.cache.get(config.emoji.load)


        let control = data.fetch(`kayitsistem${message.guild.id}`)

        if(!args[0]) {
            message.react(x)
            message.reply({embeds: [embed.setDescription(`Kayıt sistemini aktif etmek için \`aç\` kapatmak için \`kapat\` yazmalısın!`)]}).then(x => {setTimeout(() => {x.delete(), message.delete()},time * 1000)})
        }
    
        if(args[0] == 'aç') {
            if(control) return;
            message.reply(`${yükleniyor} Kayıt sistemi ayarlanıyor.`).then(x => {
                x.edit(`${yükleniyor} Kayıt sistemi ayarlanıyor..`).then(x => { 
                  x.edit(`${yükleniyor} Kayıt sistemi ayarlanıyor...`).then(x => { 
                      x.edit(`${yükleniyor} Kayıt sistemi ayarlanıyor....`).then(x => {
                          x.edit(`${yükleniyor} Kayıt sistemi ayarlanıyor.....`).then(y => {
                                     
                            setTimeout(() => {
                                data.set(`kayitsistem${message.guild.id}`, message.guild.id)
                                message.react(tik)
                                message.reply({embeds: [embed.setDescription(`Kayıt sistemi başarıyla aktif edildi!\n Kayıt sistemi hakkında bilgi almak için\`${prefix}kayıt-sistemi bilgi\``)]}).then(x => {setTimeout(() => {x.delete(), message.delete()},time * 1000)})        
                             }, 2500);
                            
                          })
                      })
                  })
              })
            })
               
  
        }
        
        if(args[0] == 'kapat') {
            if(!control) return;
            message.reply(`${yükleniyor} Kayıt sistemi ayarlanıyor.`).then(x => {
                x.edit(`${yükleniyor} Kayıt sistemi ayarlanıyor..`).then(x => { 
                  x.edit(`${yükleniyor} Kayıt sistemi ayarlanıyor...`).then(x => { 
                      x.edit(`${yükleniyor} Kayıt sistemi ayarlanıyor....`).then(x => {
                          x.edit(`${yükleniyor} Kayıt sistemi ayarlanıyor.....`).then(y => {
                                   
                            setTimeout(() => {
                                data.delete(`kayitsistem${message.guild.id}`)
                                data.delete(`kgörevli${message.guild.id}`) 
                                data.delete(`kkanal${message.guild.id}`)
                                data.delete(`kkayıtsız${message.guild.id}`)
                                data.delete(`kkayıtlı${message.guild.id}`) 
                                data.delete(`klog${message.guild.id}`) 
                                data.delete(`kchat${message.guild.id}`) 
                                data.delete(`kerkek${message.guild.id}`) 
                                data.delete(`kkadın${message.guild.id}`) 
                                data.delete(`kcinsiyetsistem1${message.guild.id}`)
                                data.delete(`kminyas${message.guild.id}`)
                                message.react(tik)
                                message.reply({embeds: [embed.setDescription(`Kayıt sistemi başarıyla Deaktif edildi!\n Kayıt sistemi hakkında bilgi almak için\`${prefix}kayıt-sistemi bilgi\``)]}).then(x => {setTimeout(() => {x.delete(), message.delete()},time * 1000)})        
                             }, 2500);
                            
                          })
                      })
                  })
              })
            })
              
  
        }

        if(args[0] == 'bilgi') {
           const embedq = new MessageEmbed()
           .setColor('BLACK')
           .setTimestamp()
           .setFooter((config.bot.BotFooter), message.guild.iconURL()) 
           .setDescription(`
           __**Kayıt sistemi nasıl işler ?**__
           Kayıt sistemi hem cinsiyet, hem tekil kayıt şeklinde işleyebilmektedir.
           kayıt sisteminin doğru çalışması için tüm ayarlamaların ayarlanması gereklidir!
           kayıt sistemi varsayılan olarak tekil kayıt(erkek/kadın ayırmadan) kayıt etmektedir,
           kayıt komutlarını görmek için \`${prefix}yardım\` menüsündeki kayıt kısmını kontrol ediniz.
           `)
           message.reply({embeds: [embedq]})
        }
    

}}