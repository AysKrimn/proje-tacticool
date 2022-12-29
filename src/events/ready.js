const registerSlashCommands = require('../base/saveSlashCommands');

const { event } = require('../base/handleTrigger');
const { getFromGuildLog, addToGuildLog } = require('../../local/handleGuildConfig')
// const event = require('../base/handleTrigger');

module.exports = async (client) => {
console.log("[Ready]: Otomasyon hazırlanıyor..");

client.config = new Map();

const guilds = await [...client.guilds.cache.values()];

for(const guild of guilds ) {
// local olarak kaydet
registerSlashCommands(guild)

const registeredConfig = await getFromGuildLog();

if(registeredConfig.length) {

const currentGuild = registeredConfig.find(g => g.id == guild.id)

// guild varsa kanalı bul
if(currentGuild && currentGuild.infoChannel != null) {
    
const infoChannel = await guild.channels.fetch(currentGuild.infoChannel);

if(infoChannel) {

client.config.set(guild.id, { infoChannel: infoChannel });
event.emit('start', guild.id);

} else console.log(`${guild.name} sunucusunda bilgilendirme kanalı bulunamadı.`);

} else if (!currentGuild) {
    // yoksa yapıyı oluştur
   await addToGuildLog({ id: guild.id, infoChannel: null})
   console.log(`${guild.name} için kayıt yapıldı.`);
}

}


}


    
}