const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "yardım",
    aliases: ["help"],
    cooldown: 3,
    permission: "",
    execute: async (client, message, args, author, channel, guild) => {

        let time = config.bot.cooldown
        let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix 
        
        let tik = client.emojis.cache.get(config.emoji.yes)
        let x = client.emojis.cache.get(config.emoji.no)
        let loading = client.emojis.cache.get(config.emoji.load)
        let yıldız = client.emojis.cache.get(config.emoji.star)

        const rowr = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("yrdm")
                    .setPlaceholder("Yardım")
                    .addOptions([
                        {
                            label: `Moderasyon`,
                            description: `Yetkili komutlarını gösterir`,
                            value: 'option',
                        },
                        {
                            label: "Kayıt",
                            description: "Teyit komutlarını gösterir",
                            value: "option-2"
                        },
                        {
                            label: "Kullanıcı",
                            description: "Kullanıcı komutlarını gösterir",
                            value: "option-3"
                        },
                        {
                            label: "Koruma",
                            description: "Koruma komutlarını gösterir",
                            value: "option-4"
                        },
                    ])
            )

        const embed = new MessageEmbed() // Moderasyon
        .setColor("BLACK")
        .setTitle(`${client.user.username} - Moderasyon komutları`)
        .setTimestamp()
        .setFooter((config.bot.BotFooter), message.guild.iconURL()) 
        .setDescription(`
        ${yıldız} | **${prefix}otorol-ayarla** = Otorolü ayarlarsınız
        ${yıldız} | **${prefix}otorol-mesaj** = Otorol mesajını ayarlarsınız
        ${yıldız} | **${prefix}otorol-sıfırla** = Otorolü sıfırlarsınız.
        ${yıldız} | **${prefix}temizle** = Sohbetten mesaj silersiniz.
        ${yıldız} | **${prefix}prefix** = Sunucuya özel değişken ayarlarsınız.
        ${yıldız} | **${prefix}iltifat-sistemi** = iltifat sistemini açarsınız.
        `)

        const embed2 = new MessageEmbed() // Kayıt
        .setTitle(`${client.user.username} - Kayıt komutları`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter((config.bot.BotFooter), message.guild.iconURL()) 
        .setDescription(`
        ${yıldız} | **${prefix}kayıt-sistemi** = Kayıt sistemini açarsınız.
        ${yıldız} | **${prefix}kayıt-ayarlar** = Kayıt ayarlarını açarsınız.
        ${yıldız} | **${prefix}kayıt** = belirttiğiniz kullanıcıyı kayıt edersiniz.
        ${yıldız} | **${prefix}kayıt-sayı** = Kayıt yetkilisinin kayıt sayısını gösterir.
        ${yıldız} | **${prefix}kayıtsız** = etiketlediğiniz kullanıcıyı kayıtsıza atar.
        ${yıldız} | **${prefix}isimdeğiştir** = etiketlediğiniz kullanıcının ismini değiştirir.
        `)

        const embed3 = new MessageEmbed() // kullanıcı
        .setTitle(`${client.user.username} - Kullanıcı komutları`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter((config.bot.BotFooter), message.guild.iconURL()) 
        .setDescription(`
        ${yıldız} | **${prefix}avatar** = belirtiğiniz kullanıcının avatarını gönderir.

        `)

        const embed4 = new MessageEmbed() // Koruma
        .setTitle(`${client.user.username} - Koruma komutları`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter((config.bot.BotFooter), message.guild.iconURL()) 
        .setDescription(`
        ${yıldız} | **${prefix}küfür-engel** = Küfür engelleme sistemini açarsınız.
        `)

        const filter = i => i.customId === 'yrdm' && i.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            let choice = i.values[0]
            if (choice === 'option') {
                await i.reply({ embeds: [embed], ephemeral: true });
            } else if(choice === "option-2") {
                await i.reply({ embeds: [embed2], ephemeral: true });
            } else if(choice === "option-3") {
                await i.reply({ embeds: [embed3], ephemeral: true })
            } else if(choice === "option-4") {
                await i.reply({ embeds: [embed4], ephemeral: true })
            }
        });

        collector.on('end', collected => {
            collected.delete()
        });


        message.channel.send({content: `Toplamda **${client.commands.size}** adet komut bulunmaktadır!`,components: [rowr] })
    }
    }
        

    

