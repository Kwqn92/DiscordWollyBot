const config = require("../../config.json");
const { joinVoiceChannel } = require("@discordjs/voice");
const db = require("quick.db");
const client = global.client;

module.exports = () => {
    client.user.setPresence({ activity: { name: (config.bot.BotStatus), type: "PLAYING" }, status: "online" });
    client.user.setPresence({ activities: [{ name: config.bot.BotStatus, type: "PLAYING" }], status: "online" });
    const VoiceChannel = client.channels.cache.get(config.guild.voicechannel);
	joinVoiceChannel({
		channelId: VoiceChannel.id,
		guildId: VoiceChannel.guild.id,
		adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
		selfDeaf: true
	});
}

module.exports.conf = {
    name: "ready"
}
