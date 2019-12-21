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

        let fotoURL = message.author.displayAvatarURL;

        let xpDisplay = valor.XPdisplay;
        let xp = valor.XPcount;
        let name = member.user.username;
        let level = valor.Level;
    
        let limite = level*500
        let ondasys = Math.floor(xp/level*100/550)
    
        let Background = await Jimp.read('https://cdn.discordapp.com/attachments/560256504998133780/641377423492907008/Background.png')
        let ondaVerde = await Jimp.read('https://cdn.discordapp.com/attachments/560256504998133780/641377441235075132/poca_verde.png')
        let firstGround = await Jimp.read('https://cdn.discordapp.com/attachments/560256504998133780/641377437372121088/first_ground.png')
        let foto = await Jimp.read(fotoURL)
        let mascara = await Jimp.read('https://cdn.discordapp.com/attachments/560256504998133780/641377439477399553/mask.png')
        
        let font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
        let fontXP = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
    
        mascara.resize(150, 150);
        foto.resize(150, 150);
        foto.mask(mascara);
    
        Background.composite(ondaVerde, 0, 100-ondasys);
        Background.composite(firstGround, 0, 0);
        Background.composite(foto, 49, 32);
    
        Background.print(font, 200, 11, name);
        Background.print(fontXP, 300, 85, xpDisplay);
        Background.print(fontXP, 355, 140, level).write('image.png');
    
        message.channel.send(``, {files: ['image.png']}).then(m => {
            Fs.unlink('image.png', (err) => {if(err) console.log(err)})
        })


    } catch (err) {

        if(err.message == "Cannot read property 'XPdisplay' of undefined") return message.channel.send(new Discord.RichEmbed()
            .setDescription('Ops... Ocorreu um erro ao encontrar este membro.')
            .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
            .setColor('#f83989')
        ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})
        
    }

}