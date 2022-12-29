const { application } = require('../index');
const { MessageEmbed } = require('discord.js');
const { addToLog, removeFromLog } = require('../../../local/handleRegistery');

const generateDate = require('../../../functions/generateDate')


module.exports = async (member, guildId) => {

    const guildConfig = application.config.get(guildId);

    if(guildConfig && guildConfig.infoChannel != null) {
    
    const url = `https://tactistats.com/#player/${member.playerID}/overview`;
    const date = generateDate('member-log', member.createdAt);

    const embed = new MessageEmbed()

    .setColor(member.action.color)
    .setAuthor({ name: member.name, url: url, iconURL: member.avatar.url })
    .setDescription(`• **Link:** [Profil Bağlantısı](${url})`)
    .setFooter({ text: `${member.action.type}: ${date}`})

    /* Embedi Güncelle */
    if(member.type == "clan_join" && member.previousName) { 
        
    embed.description += `\n• **Bu klandaki önceki ismi:** **\`${member.previousName}\`**`; 
    
    if(member.record) {

    embed.setColor('ORANGE');
    embed.setFooter({ text: `${embed.footer.text}\nKayıtlarda ${member.record.total} katılma. Son ayrılmadan bu yana ${member.record.days}`});
    
    }
    // koşullar true ama sadece isim değişikliliği yoksa
    } else if (member.type == "clan_join" && member.record) {

     embed.setColor('ORANGE');
     embed.setFooter({ text: `${embed.footer.text}\nKayıtlarda ${member.record.total} katılma. Son ayrılmadan bu yana ${member.record.days}`});

    }


    if(member.type == "clan_promote") { embed.description += `\n• **Yeni Rütbe:** **\`${member.ranks.new}\`**`; }
    if(member.type === "clan_demote") { embed.description += `\n• **Değişiklik:** **\`${member.ranks.old}\`**'dan **\`${member.ranks.new}\`** oldu.`; }
    if(member.type === "name_change") { embed.description += `\n• **Önceki ismi:** **\`${member.names.old}\`**\n• **Yeni ismi:** **\`${member.name}\`**`; }

    /* EMBEDİ GÜNCELLE BİTER */

    await guildConfig.infoChannel.send({ embeds: [embed]}).then(() => {
    
    if(member.type == "clan_join") return addToLog({ playerID: member.playerID, avatarID: member.avatar.iconId, name: member.name, type: member.actionType, date: date});
    if(member.type == "clan_leave") return removeFromLog({ playerID: member.playerID});
    
            
    }).catch(onError => { console.log("[HandleMessage] - Planlanmayan kanal değişikliği.") })

    }
}