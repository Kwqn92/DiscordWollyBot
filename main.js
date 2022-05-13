const { Client, Collection, Intents } = require("discord.js");
const client = global.client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES
  ]
});

const config = require('./config.json')
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

const nodemon = require('nodemon')
client.login(config.bot.token)
  .then(() => console.log(`Bot ${client.user.username} olarak giriş yaptı! nodemonla`))
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
    