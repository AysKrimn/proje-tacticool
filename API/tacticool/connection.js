const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const delay = require('../../functions/handleDelay');

const waitUntill = 60000;



const makeRequest = async (playerId) => {

let endPoint;

try {
    
if(playerId) endPoint = `https://api.tactistats.com/api/timeline/${playerId}`
else endPoint = "https://api.tactistats.com/api/clans/41560205483919c546d812f2bce1ef32/players";


/* Request Starts */

const response = await fetch(endPoint);

if(!response || response == null) {

if(!playerId) {

 console.log("[Handle Request] - İçerik bulunamadı. Birazdan yeniden başlanacak.");
 await delay(waitUntill);
 return makeRequest(); 

} else return false

}


if(response && response.status == 502) {

if(!playerId) {

console.log("[Handle Request] - Bağantı sağlanamadı. Birazdan yeniden başlanacak.");
await delay(waitUntill);
return makeRequest();

} else return false

}

const data = await response.json();
if(!data || data == null) return makeRequest();



if (playerId) return data.timeline;

return data.players;


} catch (error) {
    
    console.log("[API Connection]:", error);
}


}



module.exports = makeRequest