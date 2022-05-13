const { MessageEmbed } = require("discord.js")
const data = require('quick.db')
const config = require('../../config.json')
module.exports = {
    name: "avatar",
    aliases: ["pp"],
    cooldown: 3,
    permission: "",
    execute: async (client, message, args, embed, author, channel, guild) => {

        let muser = message.mentions.users.first();
        let userid;
        if(isNaN(args[0])){
          if(!muser){
            userid = message.author.id;
          }else{
            userid = muser.id;
          }
        }else{
          userid = args[0];

        } 
        let user = await client.users.fetch(userid);
        let avatar = user.displayAvatarURL({dynamic: true, size: 1024})
        if(avatar.endsWith(".gif?size=1024")) {

            let embed = new MessageEmbed()
            .setAuthor(user.tag + '', user.displayAvatarURL())
        .setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
            .setColor("RANDOM")
            message.channel.send({embeds: [embed]})
            
            } else {
            
              let embed = new MessageEmbed()
            .setAuthor(user.tag + '', user.displayAvatarURL())
            .setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
            .setColor("RANDOM")
            message.channel.send({embeds: [embed]})
            
            }


    }
}
