
module.exports = async (client, channel) => {

let guildCache = client.config.get(channel.guild.id);

if (guildCache) {

guildCache.infoChannel = null;
console.log(`${channel.guild.name} sunucusunda bildirim kanalı silindi.`);
}



}
