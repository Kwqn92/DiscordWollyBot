const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const data = require("quick.db");


module.exports = async (member) => {


    data.push(`memberquitname_${member.guild.id + member.id}`, `\`${member.username}\``)



}

module.exports.conf = {
    name: "guildMemberRemove"
}
