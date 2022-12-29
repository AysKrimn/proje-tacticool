const { addToGuildLog } = require('../../local/handleGuildConfig');
const registerSlashCommands = require('../base/saveSlashCommands');

module.exports = async (client, guild) => {
await addToGuildLog({ id: guild.id, infoChannel: null }, client.config)

console.log(guild.name, "sunucusu için konfig oluşturuldu.");

// slash komutlarını oluştur
registerSlashCommands(guild);

}