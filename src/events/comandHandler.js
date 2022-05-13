const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const data = require("quick.db");
const ms = require('ms');

module.exports = async (message) => {

    const ownerr = client.users.cache.get(config.bot.owner);
    if (config.bot.prefix && !message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(command));
    const author = message.author
    const channel = message.channel
    const guild = message.guild
    const embed = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 })).setTimestamp().setFooter((config.bot.BotFooter), message.guild.iconURL()) 

    if (cmd) {
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

       if(! message.member.permissions.has(cmd.permission)) {
           message.reply({embeds: [embed.setDescription(`${client.emojis.cache.get(config.emoji.no)} Bu komutu kullanabilmek için \`${cmd.permission}\` yetkisine sahip olmalısın!`)]})
        return;
        }
        cmd.execute(client, message, args, embed, author, channel, guild);

    }
}

module.exports.conf = {
    name: "messageCreate"
}
