// dilleri aktar
const TR = require('../../locale/tr/message');
const EN = require('../../locale/en-US/message');

const handleReply = require('../../functions/reply');

// @TIP Slash komutlarına perm vs eklemek için guild.commandsfetch() 
// işlemiyle guildden key,value ayrıştırılarak komut idsi alınır.

module.exports = async (client, interaction) => {

if (!interaction.isCommand()) return;
console.log("interAction:", interaction);

const command = client.slash.get(interaction.commandName);
if (!command) return;
    
console.log("kmd:", command.data);
// Botun vereceği cevabı ayarla
const error = {};
const bot = {};
const userLanguage = interaction.locale;

switch(userLanguage) {

case "tr":
bot.response = TR.get(command.data.name);
error.response = TR.get("permissions");
break;


default:
bot.response = EN.get(command.data.name);
error.response = EN.get("permissions");


}


// kullanıcının izinlerini kontrol et.
if(command.userPermissions.length && !interaction.member.permissions.has(command.userPermissions)) {

return handleReply(error.response.permission, interaction);
    
}


try {

command.run({interaction: interaction, config: client.config, reply: handleReply, bot });
    
} catch (error) {
    
handleReply(error.response.unexpected, interaction, true);
console.log(error);

}

}