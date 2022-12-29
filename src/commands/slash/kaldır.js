const { addToGuildLog } = require('../../../local/handleGuildConfig');
module.exports = {
    userPermissions: ["MANAGE_GUILD"],

    /*
    data: new SlashCommandBuilder()
   .setName('kaldır')
   .setDescription('bildirim mesajlarını kaldırın')
   .addStringOption(option =>
    option.setName('kanal')
    .setDescription('işlemi doğrulayın')
    .setRequired(true)
    
    .addChoices({ name: "onaylıyorum", value: "onay"})),
   */

   data: {

    name: "kaldır",
    name_localizations: {'en-US': "remove"},
    description: "bildirim mesajını kaldırır",
    description_localizations: {'en-US': "removes notification channel"},
    options: 
    [
        {

        name: "kanal",
        name_localizations: {'en-US': "channel"},
        description: "işlemi doğrula",
        description_localizations: {'en-US': "confirm action"},
        type: 3,
        choices: [{ name: "onaylıyorum", value: "onay", name_localizations: {'en-US': "confirm"}}]
        }
    ]
   
   },

   
   async run(constants) {

    const currentGuild = await getFromGuildLog(constants.interaction.guildId);

    if(currentGuild && currentGuild.infoChannel != null) {

    await addToGuildLog({ id: constants.interaction.guildId, infoChannel: null}, constants.config, true)
    return constants.reply(constants.bot.response.cancel, constants.interaction);

    }


    constants.reply(constants.bot.response.noChannel, constants.interaction);
       
   },
   };