const Turkish = new Map();

const constants = [
    
    [
    "bilgi",
    
    { 
    deal: "Bu klana girerek döngü başına minimum 30k yıldız, minimum 750 hizmet madalyası yapmayı kabul etmiş olursunuz. Döngü başında bu kriterleri yerine getirmeyen kişiler uyarılacak, devamı halinde klandan atılacaktır.",
    missions: (name) => { return  `Aktif olarak **${name}** kanalını takip edin ve ajanları oradaki talimatlara göre gönderin.`},
    club: (name) => { return `Yıldız puanlarını kullanmadan önce lütfen **${name}** kanalında bir talimat olup olmadığını kontrol edin eğer yoksa yetkili kişilerin talimatlarını bekleyin.`},
    time: (day, hour, min, sec) => { return `${day} gün, ${hour} saat, ${min} dakika ve ${sec} saniyedir hizmetteyim.`}
    }

    ],

    [

    "ayarla",

    {
    channel: "Belirttiğiniz kanalı yönetebilmek için geçerli izinlerim yok.",
    channelInLog: "Bu kanal zaten bildirim kanalı olarak ayarlanmış.",
    notText: "Sadece yazı kanalları bildirim kanalı olarak ayarlanabilir.",
    channelSet: (channelName) => { return `Başarılı bir şekilde ${channelName} bildirim kanalı olarak ayarlandı.`}    
    }

    ],

    [

    "kaldır",

    {
    cancel: "Artık Klan hakkında girdi/çıktı bilgileri almayacaksınız.",
    noChannel: "Aktif olarak seçmiş olduğunuz mevcut bir bildirim kanalı bulunamadı."

    }

    ],

    [

    "yardım",

    {
    info: `Klan hakkında girdi/çıktı bilgileri almak için lütfen bir kanal seçip ayarlayın.
    Bilgi kanalını /ayarla kanal veya kanal id şeklinde ayarlayabilirsiniz.
    
    Eğer, artık bildirim mesajları almak istemiyorsanız kayıtlı kanalı silmeniz veya /kaldır onaylıyorum yaparak seçili bildirim kanalını kaldırabilirsiniz.
    
    • Bu otomasyon TRK klanı ve ailesi için oluşturulmuştur. Botu oluşturan kişi **Kalamar#9068** dır. Eğer otomasyon hakkında sorularınız veya tespit ettiğiniz hatalar olursa lütfen geliştiriciye ulaşın.`
    }

    ],

    [

    "permissions",

    {
    permission: "Bu komutu kullanmak için gerekli izinlere sahip değilsin.",
    unexpected: "Bir hata meydana geldi lütfen daha sonra tekrar deneyiniz.",
    }

    ]
]



// key-value şeklinde entegre et.
constants.find(k => {

Turkish.set(k[0], k[1]);

})




module.exports = Turkish;