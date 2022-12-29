const APIRequest = require('../API/tacticool/connection');
const generateDate = require('./generateDate');
const { loadFromLog } = require('../local/handleRegistery');


const cache = new Map();

/* cache load yapılacak ve diğer actionlar entegre edilecek. En son ise kod test. 
  Known bugs: type bazen undefined olarak kayıt ediliyor.
*/

const handleRequest = async () => {

  const currentDate = generateDate('past');
  console.log("[HandleRequest] - Tarih:", currentDate);

  // console.log("Status:", response.statusText, "HTTP Code:", response.status);


    const data = await APIRequest();

    if (data) {

     let action_log = new Map();
    
     /* Cacheyi yükle */
     if(!cache.size) {
    
      const memberLogs = await loadFromLog();

      if(memberLogs.length) {

        for await (player of memberLogs) {

        const inClan = data.find(member => member.playerID == player.playerID);

        // Klandan çıkmış
        if(!inClan) { action_log.set(player.playerID, { avatarID: player.avatarID, joinedAt: null, action: "clan_leave"}); continue; }
        // Klandaysa cacheye ekle
        if(inClan) { cache.set(player.playerID, { avatarID: inClan.avatarID, name: inClan.name, role: inClan.currentClan.clanRole}); continue; }

        }

      }


    }
    /* Cacheyi yükle biter*/

    // Olmayan üyeleri çek ve cachele
    for await (member of data) {

    const inCache = await cache.get(member.playerID);

    if(!inCache) cache.set(member.playerID, { avatarID: member.avatarID, name: member.name, role: member.currentClan.clanRole });

    // yeni katılanlar
    if(member.currentClan.joinedAt.startsWith(`${currentDate.year}-${currentDate.month}`) && !inCache) {

      action_log.set(member.playerID, 
      { 
        avatarID: member.avatarID, 
        joinedAt: member.currentClan.joinedAt, 
        action: "clan_join" 
      }); 
    }

    if (inCache) {

    // rütbe değişikliği senaryo 1:
    if(member.currentClan.clanRole != "rookie" && inCache.role != member.currentClan.clanRole) {
    
      action_log.set(member.playerID, 
      { 
        avatarID: member.avatarID, 
        joinedAt: member.currentClan.joinedAt, 
        action: "clan_promote",
        positions: { current: member.current.clanRole, previous: inCache.role} 
      });

      inCache.role = member.currentClan.clanRole;

      continue;

    }

    // rütbe değişikliği senaryo 2:
    if(member.currentClan.clanRole == "rookie" && inCache.role != "rookie") {
    
    action_log.set(member.playerID, 
    { 
      avatarID: member.avatarID, 
      joinedAt: member.currentClan.joinedAt, 
      action: "clan_demote", 
      positions: { current: member.currentClan.clanRole, previous: inCache.role }});

      inCache.role = member.currentClan.clanRole;
      continue;
    }


    // isim değişikliği
    if(member.name != inCache.name) {

    action_log.set(member.playerID, 
    { 
      avatarID: member.avatarID, 
      joinedAt: member.currentClan.joinedAt, 
      action: "name_change" 
    });

      inCache.name = member.name;

    }

    }

    }

    console.log("action-log:", action_log.size)
    console.log("cache: end of scope:", cache.size)

    
    // test area
    /*
    action_log.set("ab9f4960bc52744cd335c9e517c6030d", 
      { 
        avatarID: 48, 
        joinedAt: "2022-09-10T21:35:40.764Z", 
        action: "clan_promote",
        positions: { current: "vp", previous: "rookie" } 
      });



      action_log.set("5e74fb5f46068ef84ebf1e3b0ab6749b", 
      { 
        avatarID: 20861, 
        joinedAt: "2022-09-10T21:35:40.764Z", 
        action: "name_change",

      });

      */
      // test area ends
    return { log: action_log, cache: cache }

    }


}





module.exports = handleRequest