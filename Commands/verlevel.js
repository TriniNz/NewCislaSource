const Jimp = require('jimp');
const Fs = require('fs');

exports.run = async (Discord, thisClient, message, args, db) => {

    function formatNumber(number) {
        let result = ""
        let splitNumber = number.split('')

        if(splitNumber.length < 4) {//Não muda
            return result = number
        }
        if(splitNumber.length == 4){//1K - 9K
            return result = splitNumber[0] + "K" + splitNumber[1] + splitNumber[2] + splitNumber[3]
        }
        if(splitNumber.length == 5){//10K - 99K
            return result = splitNumber[0] + splitNumber[1] + "K" + splitNumber[2] + splitNumber[3] + splitNumber[4]
        }
        if(splitNumber.length == 6){//100K - 999K
            return result = splitNumber[0] + splitNumber[1] + splitNumber[2] + "K" + splitNumber[3] + splitNumber[4] + splitNumber[5]
        }
        if(splitNumber.length == 7){//1M - 9M 
            return result = splitNumber[0] + "M" + splitNumber[1] + splitNumber[2] + splitNumber[3] + splitNumber[4] + splitNumber[5] + splitNumber[6]
        }
        if(splitNumber.length == 8){//10M - 99M
            return result = splitNumber[0] + splitNumber[1] + "M" + splitNumber[2] + splitNumber[3] + splitNumber[4] + splitNumber[5] + splitNumber[7]
        }
        if(splitNumber.length == 9){//100M - 999M
            return result = splitNumber[0] + splitNumber[1]+ splitNumber[2] + "M" + splitNumber[3] + splitNumber[4] + splitNumber[5] + splitNumber[8]
        }
        if(splitNumber.length == 10){//1B > ...
            return result = splitNumber[0] + "B"
        }

        return result;
    }

    let member = message.mentions.members.first();

    if(message.mentions.members.size <= 0) member = message.member

    try {
        
        let valor = db.get('RankSystem').find({"id": member.id}).value();

        let fotoURL = member.user.displayAvatarURL;

        let xpDisplay = valor.XPdisplay;
        let xp = valor.XPcount;
        let name = member.user.username;
        let level = valor.Level;
        let limiteDisplay = formatNumber(level*500)
    
        let limite = level*500
        let ondasys = Math.floor(xp/level*100/550)
    
        let userphoto = await Jimp.read(fotoURL);
        let background = await Jimp.read('https://cdn.discordapp.com/attachments/570796258835562496/664734896517939201/Background.png');
        let bar = await Jimp.read('https://cdn.discordapp.com/attachments/570796258835562496/664734965975744522/bar.png');
        let firstground = await Jimp.read('https://cdn.discordapp.com/attachments/570796258835562496/664735023425126400/firstground.png');
        let icon = await Jimp.read('https://cdn.discordapp.com/attachments/570796258835562496/664755763826262053/iconurl.png')
        let mask = await Jimp.read('https://cdn.discordapp.com/attachments/570796258835562496/664734810006224896/mask.png');

        let font = await Jimp.loadFont('./font/font.fnt');

        mask.resize(760, 760);
        userphoto.resize(760, 760);
        icon.resize(240, 240)

        userphoto.mask(mask);
        

        background.composite(bar, -2215+ondasys*22, 0);
        background.composite(firstground, 0, 0);
        background.composite(userphoto, 112, 442-10)
        background.composite(icon, 597 + 25, 727 + 210)

        background.print(font, 1066, 750 + 20, name)
        background.print(font, 1582, 981, ondasys + "%")
        background.print(font, 1258, 1219, "XP : " + xpDisplay + "/" + limiteDisplay)


    } catch (err) {

        if(err.message == "Cannot read property 'XPdisplay' of undefined") return message.channel.send(new Discord.RichEmbed()
            .setDescription('Ops... Ocorreu um erro ao encontrar este membro.')
            .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
            .setColor('#f83989')
        ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})
        
    }

}