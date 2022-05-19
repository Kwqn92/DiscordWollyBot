const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const client = global.client = new Client(
  {intents: 131071}
);
const config = require('./config.json')
const data = require('quick.db')
const { readdir } = require("fs");
require("moment-duration-format");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
client.cooldown = new Map();
client.commandblocked = [];

require("./src/helpers/function")(client);
require('./src/helpers/mongoHandler');

readdir("./src/commands/", (err, files) => {
  if (err) console.error(err)
  files.forEach(f => {
    let prop = require("./src/commands/" + f)
    console.log(`[COMMAND] ${prop.name} yüklendi!`);
    commands.set(prop.name, prop);
    prop.aliases.forEach(alias => {
      aliases.set(alias, prop.name);
    });
  });
});

readdir("./src/events", (err, files) => {
  if (err) return console.error(err);
  files.filter((file) => file.endsWith(".js")).forEach((file) => {
    let prop = require(`./src/events/${file}`);
    if (!prop.conf) return;
    client.on(prop.conf.name, prop);
    console.log(`[EVENT] ${prop.conf.name} yüklendi!`);
  });
});


client.login(config.bot.token)
  .then(() => console.log(`Bot ${client.user.username} olarak giriş yaptı!`))
  .catch((err) => console.log(`Bot Giriş yapamadı sebep: ${err}`));


  client.on('message', async message => {
    if (message.content === '.fakekatıl') { 
      client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
        }
    });
    
    client.on('message', async message => {
    if (message.content === '.fakeayrıl') { 
      client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
        }
    });
    



  client.on('messageCreate', async message => {
    let control = data.fetch(`küfürlog${message.guild.id}`) || data.fetch(`modlog${message.guild.id}`) 
    if(!control) return;

    const küfürler = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];

    try {
      if(küfürler.some(kelimeler => message.content.includes(kelimeler))) {
        if(!message.member.permissions.has("BAN_MEMBERS")) {
          message.delete()
          message.channel.send(`${message.author} Küfür etmemelisin!`).then(x => setTimeout(() => { x.delete() }, 5000))
     
            data.add(`küfürwarn${message.guild.id + message.author.id}`,1)

        }
      }
     } catch (error) {
      console.log(error);
     }

  })

  client.on('messageUpdate', async(oldMessage, newMessage) => {
    let control = data.fetch(`küfürlog${newMessage.guild.id}`) || data.fetch(`modlog${newMessage.guild.id}`) 
    if(!control) return;

    const küfürler = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];

    try {
      if(küfürler.some(kelimeler => newMessage.content.includes(kelimeler))) {
        if(!newMessage.member.permissions.has("BAN_MEMBERS")) {
          newMessage.delete()
          newMessage.channel.send(`${newMessage.author} Küfür etmemelisin!`).then(x => setTimeout(() => { x.delete() }, 5000))

   
            data.add(`küfürwarn${newMessage.guild.id + newMessage.author.id}`,1)
         
        }
      }
     } catch (error) {
      console.log(error);
     }

  })


 