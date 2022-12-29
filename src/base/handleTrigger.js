const events = require('events');
const trigger = new events.EventEmitter();

const handleRequest = require('../../functions/handleRequest');
const handlePlayerTimeLine = require('../../functions/handlePlayerTimeLine');
const generateDate = require('../../functions/generateDate');
const handleDelay = require('../../functions/handleDelay');

trigger.on('start', async (guildId) => {
console.log("[HandleTrigger] Timing başlıyor. Guild ID:", guildId);


const members = await handleRequest();

if(!members) {
await handleDelay(9000)
console.log("Trigger yeniden başlatılıyor..");   
return trigger.emit('start', guildId);
}

await handlePlayerTimeLine(members.log, members.cache, guildId);



setTimeout(() => {
const currentTime = generateDate('cycle');
console.log(`[${currentTime}] - Devir tekrar başlatılıyor.`);
trigger.emit('start', guildId);    

// 1 dakika da 1 çalış
}, 60000);

});



module.exports = { event: trigger };