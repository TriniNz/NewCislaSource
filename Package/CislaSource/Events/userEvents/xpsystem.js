exports.run = async (Discord, thisClient, message, db) => {

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

    function xpSystem(logChannel, XPquant, COINquant) {

        if(!db.has('RankSystem').value()) {db.set('RankSystem', [])}

        try {
            let valorDB = db.get('RankSystem').find({id: `${message.author.id}`}).value()
            if(valorDB.id) {

            let randomXPQuant = Math.floor(Math.random() * XPquant.length)
            
            db.get('RankSystem').find({id: `${message.author.id}`}).assign({allXPCount: valorDB.allXPCount+XPquant[randomXPQuant]}).write()
            db.get('RankSystem').find({id: `${message.author.id}`}).assign({XPcount: valorDB.XPcount+XPquant[randomXPQuant]}).write()
            db.get('RankSystem').find({id: `${message.author.id}`}).assign({XPdisplay: formatNumber(`${valorDB.XPcount}`)}).write()

            if(valorDB.XPcount >= valorDB.Level*550) {
                db.get('RankSystem').find({id: `${message.author.id}`}).assign({XPcount: 0}).write()
                db.get('RankSystem').find({id: `${message.author.id}`}).assign({XPdisplay: 0}).write()
                db.get('RankSystem').find({id: `${message.author.id}`}).assign({Level: valorDB.Level+1}).write()

                let randomCoinQuant = Math.floor(Math.random() * COINquant.length)

                db.get('RankSystem').find({id: `${message.author.id}`}).assign({Coinscount: valorDB.Coinscount+COINquant[randomCoinQuant]}).write()
                db.get('RankSystem').find({id: `${message.author.id}`}).assign({Coindisplay: formatNumber(`${valorDB.Coinscount}`)}).write()

                message.guild.channels.get(logChannel).send(new Discord.RichEmbed()
                    .setDescription(`:tada: Parabéns! ${message.author}, acabou de subir de level!\n\n *Level atual: ${valorDB.Level}*\n*XP: ${valorDB.XPdisplay}/${formatNumber(`${valorDB.Level*550}`)}*\n*Coins: ${valorDB.Coindisplay}*\n`)
                    .setFooter(`Você ganhou ${COINquant[randomCoinQuant]} coins ao subir de nivel!`)
                    .setThumbnail(message.author.displayAvatarURL)
                    .setColor('#f83989')
                )
            }
        }

        } catch(err) {
            if(err.message == "Cannot read property 'id' of undefined") {
                db.get('RankSystem').push({
                    user: message.author.username,
                    id: message.author.id,
                    XPcount: 0,
                    allXPCount: 0,
                    Level: 1,
                    XPdisplay: 0,
                    Coinscount: 0,
                    Coindisplay: 0,
                }).write()
            } else console.log(err)
        }
    }

    xpSystem("662377257846702081", [10,15,20,25,30,35,40,50,60,70,100,120,150,500,1000,2000,3000], [100,200,300,500,1000])

}