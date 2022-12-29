const { application} = require('../../API/discord/index');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('node:fs');


const commands = [];
const commandFiles = fs.readdirSync('./src/commands/slash').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
const command = require(`../commands/slash/${file}`);
const file_name = file.split(".")[0];

//commands.push(command.data.toJSON());
commands.push(command.data);
application.slash.set(file_name, command);

}

const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);

// slash komutlarını kaydet
const call = (guild) => {

(async () => {
	try {
		console.log('Uygulama komutları (/) yükleniyor.');

		await rest.put(
			Routes.applicationGuildCommands(application.user.id, guild.id),
			{ body: commands },
		);

       console.log('/ komutları başarılı bir şekilde yüklendi.');
       
	} catch (error) {
		console.error(error);
	}
})();

}


module.exports = call;
