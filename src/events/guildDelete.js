const { deleteFromGuildLog } = require('../../local/handleGuildConfig');


module.exports = async (client, guild) => {

await deleteFromGuildLog({id: guild.id}, client.config)

console.log(guild.name, "sunucusu için konfig silindi.");


}