const timeLines = require('../src/base/handleStructure');
const handleMessage = require('../API/discord/embed/handleMessage');

const { application } = require('../API/discord/index');


/* TODO: GUILD ID ENTEGRE EDILECEK DAHA SORNA APPLICATIN İLE KONTROLU SAGLANACAK */
const handlePlayerTimeLine = async (log, cache, guildId) => {

if(!cache.size || !log.size) return console.log("[HandlePlayerTimeLine] Local arrayda veri yok.");
console.log("pIDS",log);


for (cachedMember of log) {

const guildConfig = application.config.get(guildId);

if(guildConfig.infoChannel != null) {

// create instance
const action = new timeLines(cachedMember);
const inCache = await cache.get(cachedMember[0]);
// klandan çıkmışsa
if(!inCache) cachedMember[1].action = "clan_leave";

if(cachedMember[1].action) {
    
let data;

switch(cachedMember[1].action) {

case "clan_join":

data = await action.join();
if(data) handleMessage(data, guildId);
break;


case "clan_leave":

data = await action.leave();
if(data) handleMessage(data, guildId)
break;

case "clan_promote":

data = await action.rankPromote(cachedMember[1].positions.current, cachedMember[1].positions.previous);
if(data) handleMessage(data, guildId)
break;

case "clan_demote":

data = await action.rankDemote(cachedMember[1].positions.current, cachedMember[1].positions.previous);
if(data) handleMessage(data, guildId)
break;

case "name_change":
data = await action.nameChange();
if(data) handleMessage(data, guildId);
break;
    
}

}

} else break;

}



}






module.exports = handlePlayerTimeLine