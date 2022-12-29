const APIRequest = require('../../API/tacticool/connection');
const generateDate = require('../../functions/generateDate');

const { handleAvatar } = require('../../API/tacticool/assets/avatars/handleAvatar');


/* HELPER FUNCTION */
const handleRankNames = (rankName) => {

switch(rankName) {

 case "president":

 return rankName = "President (Başkan)"

 case "vp":

 return rankName = "V.P (Başkan Yardımcısı)"

 case "rookie":

 return rankName = "Rookie (Acemi)"
}

}


const clanID = "41560205483919c546d812f2bce1ef32";

class TimeLine {

constructor(player) {

 this.target = player

}



async join() {

const since = generateDate('compare', this.target[1].joinedAt);
const today = generateDate('today');

// console.log(`Aranan Tarih: ${today} katıldığı tarih: ${since}`);
if(today == since) {
console.log(this.target[0], "için clan_join isteği alındı.");

const data = await APIRequest(this.target[0]);
console.log("Interaction join:", data[0]);

if(data) {
// Join info
const recent = data.find(entry => entry.type === "clan_join" && entry.clanID == clanID);

if(recent) {

const nameHistory = data.find(entry => entry.type == "name_change" && entry.clanID == clanID);

// cachede name property henüz yok o yüzden aynı isimler kontrol edilmiyor.

if(nameHistory) recent['previousName'] = nameHistory.name; 

// toplam giris/cıkıs sayısı
const totalJoin = data.filter(entries => entries.type == "clan_join" && entries.clanID == clanID);
const totalLeave = data.filter(entries => entries.type == "clan_leave" && entries.clanID == clanID);

if(totalJoin.length && totalLeave.length) {

const sinceDay = generateDate('since-day', totalLeave.at(0).createdAt);

recent['record'] = { total: totalJoin.length, days: sinceDay};
recent['avatar'] = handleAvatar(this.target[1].avatarID);
recent['action'] = { color: "GREEN", type: "Klana Katıldı"};

return recent;

}

}

}


}


}



async leave() {

const data = await APIRequest(this.target[0]);
console.log("Interaction Leave:", data[0])

if(data) { 

const recent = data.find(entry => entry.type === "clan_leave" && entry.clanID == clanID);

if(recent) {

recent['avatar'] = handleAvatar(this.target[1].avatarID);
recent['action'] = { color: 'RED', type: "Klandan Ayrıldı"}

return recent;

}

}
    
}



async rankPromote(newRank, oldRank) {
const data = await APIRequest(this.target[0]);

if(data) {
    
const recent = data.find(entry => entry.type === "clan_promote" && entry.clanID == clanID);
console.log("Interaction Promote:", recent)

if(recent) {

oldRank = handleRankNames(oldRank);
newRank = handleRankNames(newRank);

recent['avatar'] = handleAvatar(this.target[1].avatarID);
recent['ranks'] = { old: oldRank, new: newRank};
recent['action'] = { color: 'YELLOW', type: "Rütbe Atladı"};

return recent;
    
}
}

}

async rankDemote(newRank, oldRank) {

const data = await APIRequest(this.target[0]);

if(data) {

const recent = data.find(entry => entry.type === "clan_demote" && entry.clanID == clanID);

if(recent) {

oldRank = handleRankNames(oldRank);
newRank = handleRankNames(newRank);
    
recent['avatar'] = handleAvatar(this.target[1].avatarID);
recent['ranks'] = { old: oldRank, new: newRank};
recent['action'] = { color: 'ORANGE', type: "Rütbe Değiştirildi"};

return recent

}
}
        

}

async nameChange() {

const data = await APIRequest(this.target[0]);

if(data) {

const recent = data.find(entry => entry.type === "name_change" && entry.clanID == clanID);
console.log("Interaction Name:", recent)

if(recent) {

recent['avatar'] = handleAvatar(this.target[1].avatarID);
recent['names'] = { old: recent.prevName }
recent['action'] = { color: 'BLUE', type: "İsim Değiştirildi"}

return recent;

}

}
}

}




module.exports = TimeLine