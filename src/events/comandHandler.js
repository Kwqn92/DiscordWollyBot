const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const data = require("quick.db");
const ms = require('ms');

module.exports = async (message) => {

    let prefix = data.fetch(`prefix_${message.guild.id}`) || config.bot.prefix;
    const ownerr = client.users.cache.get(config.bot.owner);
    if (prefix && !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(command));
    const author = message.author
    const channel = message.channel
    const guild = message.guild
    const embed = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 })).setTimestamp().setFooter((config.bot.BotFooter), message.guild.iconURL()) 

    //? Bakım Control
    if(cmd && cmd.name !== 'bakım' && author.id !== ownerr.id) {
       const control = data.fetch(client.user.id);
       if(control) {
        var DURATION = require('humanize-duration');
        const control2 = await data.fetch(client.user.id+':)');
        var TIMESTAMP = Date.now() - control2.time
        var sebep = control2.reason
        var RESULT = DURATION(TIMESTAMP, { language: 'tr', round: true, conjunction: ', ', serialComma: false });
        message.react(config.emoji.no);
        return message.reply({embeds: [embed.setDescription(`Bot şu anda bakımdadır!\nYaklaşık **${RESULT} önce** bakıma girmiştir.\nBakım alan ${control2.author.tag}\n\nBakım sebebi:\n \`${sebep}\``)]})
       }
    }

    if (cmd) {

        if(cmd.enabled == false) {
            message.reply({embeds: [embed.setDescription(`${client.emojis.cache.get(config.emoji.no)} Bu komut şu anda kullanıma kapalıdır!`)]})
            return;
        }

        //? Cooldown Control
        let cooldown = await data.fetch(`cooldown${author.id}`)
        let time = cmd.cooldown || config.bot.cooldown
        if(cooldown && message.author.id != config.bot.owner) {
            data.delete(`cooldown${author.id}`)
            message.reply({embeds: [embed.setDescription(`\`${cmd.name}\` komutunu kullanabilmek için \`${cmd.cooldown || config.bot.cooldown}\` saniye beklemelisin!`)]})
            return;
        }
        if(!cooldown) {
            await data.set(`cooldown${author.id}`,'cooldown')
            setTimeout(() => {
                data.delete(`cooldown${author.id}`)
            }, time * 1000)
        }
        //? Cooldown Control
        if(cmd.permission == 'OWNER' && author.id !== config.bot.owner) {
            message.reply({embeds: [embed.setDescription(`${client.emojis.cache.get(config.emoji.no)} Bu komutu kullanabilmek için \`Sahibim\` olmalısın!`)]})
            return;
           }
       if(!message.member.permissions.has(cmd.permission)) {
           message.reply({embeds: [embed.setDescription(`${client.emojis.cache.get(config.emoji.no)} Bu komutu kullanabilmek için \`${cmd.permission}\` yetkisine sahip olmalısın!`)]})
        return;
        }
        cmd.execute(client, message, args, embed, author, channel, guild);

    }
}

module.exports.conf = {
    name: "messageCreate"
}
