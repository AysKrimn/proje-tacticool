const English = new Map();

const constants = [
    
    [
    "bilgi",
    { 
    deal: "By joining this clan, you agree to make a minimum of 30k stars and a minimum of 750 service medals per cycle. People who do not fulfill these criteria will be warned and kicked out from clan if violation is repeated.",
    missions: (name) => { return `Actively follow the **${name}** channel and assing your operators according to the instructions from there.`},
    club: (name) => { return `Please read the **${name}** channel or wait for the instructions from the clan officers before you use clan pass points.`},
    time: (day, hour, min, sec) => { return `Runtime: ${day} days, ${hour} hours, ${min} mins and ${sec} seconds.`}
    }

    ],

    [

    "ayarla",
    {

    channel: "I don't have enough permissions to manage specified channel.",
    channelInLog: "This channel already set as member-logs.",
    notText: "Only text channels can be set as information channel.",
    channelSet: (channelName) => { return `Successfully set ${channelName} as member-logs.`}       
    }

    ],

    [

    "kaldır",
    {
    cancel: "Request taken. You will not receive any notification anymore.",
    noChannel: "Couldn't find notification channel."
    }

    ],

    [

    "yardım",
    
    {
    info: `If you want to receive join/leave notifications set a text channel for that.
    You can set notification channel with following usage /ayarla #channel or channel id.
        
    If you don't want to receive nofitications messages anymore simply delete that channel or type /kaldır onaylıyorum.
        
    • This automation has been created for TRK clan and its community. The creator of bot is **Kalamar#9068**. If you have questions regarding the bot or you have encountered bugs please contact to bot developer.`
    }
    
    ],
    
    [

    "permissions",
    {
    permission: "You don't have enough permissions to run this command.",
    unexpected: "An error occured please try again later.",
    }

    ]

]



// key-value şeklinde entegre et.
constants.find(k => {

English.set(k[0], k[1]);

})




module.exports = English;