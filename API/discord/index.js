const { Client, Intents, Collection } = require('discord.js');

const client = new Client({ 

intents: 
[
Intents.FLAGS.GUILDS,
Intents.FLAGS.GUILD_MEMBERS,
], 

partials: ["MESSAGE"] });


// genel slash komutları.
client.slash = new Collection();
client.login(process.env.TOKEN).then(async () => {

client.user.setActivity({ name: "/yardım", type: "WATCHING"});    


});


module.exports = { application: client }