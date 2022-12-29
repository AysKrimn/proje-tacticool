const { event } = require('../../base/handleTrigger');
const { getFromGuildLog, addToGuildLog } = require('../../../local/handleGuildConfig');



module.exports = {
 
     userPermissions: ["MANAGE_GUILD"],

     data: {
          
     name: "ayarla",
     name_localizations: {'en-US': "set"},
     description: "bildirim alacağınız kanalı seçin",
     description_localizations: {'en-US': "sets information channel"},

     options: 
     [
       {
          name: "kanal",
          name_localizations: {'en-US': "channel"},
          description: "kanal seçin",
          description_localizations: {'en-US': "specify channel"},
          type: 7,
          required: true
       }     
     ]

     },
    
    async run(constants) {
    const channel = constants.interaction.options.getChannel('kanal');

    if(!channel.manageable) return constants.reply(constants.bot.response.channel, constants.interaction);
    if(channel.type != "GUILD_TEXT") return constants.reply(constants.bot.response.notText, constants.interaction);

    const currentGuild = await getFromGuildLog(channel.guild.id);

    if(currentGuild && currentGuild.infoChannel == channel.id) {

    return constants.reply(constants.bot.response.channelInLog, constants.interaction, true);

    }

    await addToGuildLog({ id: channel.guild.id, infoChannel: channel.id}, constants.config, true)

    return constants.interaction.reply(constants.bot.response.channelSet(channel.name)).then(() => {
    // eventi başlat
    event.emit('start', channel.guild.id);
    });

        
    },
    };