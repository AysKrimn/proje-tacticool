/*
@handlePlayerTimeLine - since, today
@handleRequest - currentDate
@handleTrigger - currentTime
@handleMessage - date

fonksiyonların kullandığı tarihler burada ayrıştırılır.
*/

const timezone = require('moment-timezone');

const date = (request, createdAt) => {

if(request == "since-day") {

timezone.locale('TR');
    
return timeDifference = timezone(createdAt).toNow(true)


}


const today = timezone.tz(createdAt, 'Europe/Madrid').locale('tr-TR').format('DD MM MMMM YYYY dddd HH:mm')
const components = today.split(' ');

//console.log("[Date FN]:", "CreatedAt:", createdAt, "Bugün formatı:", today);
/*
0. dizin: GÜN 
1. dizin: AY 
2. dizin: AY İSMİ 
3. dizin: YIL 
4. dizin: GÜN İSMİ 
5. dizin: SAAT/DK
*/
switch(request) {

case "today":

return `${components[0]} ${components[2]}`;

case "past":

return { year: components[3], month: components[1] , day: components[0] }


case "cycle":
    
return time = timezone.tz(createdAt, 'Europe/Istanbul').locale('tr-TR').format('HH:mm');

case "compare":

return `${components[0]} ${components[2]}`;

case "now":

return `${components[0]} ${components[2]} ${components[3]} ${components[4]}`;


case "member-log":
return logTime = timezone.tz(createdAt, 'Europe/Istanbul').locale('tr-TR').format('DD MMMM YYYY dddd HH:mm')


}



}




module.exports = date;