exports.run = async (Discord, thisClient, message, args, db) => {

    var a = []

    db.get("RankSystem").value().map(t => {
        let xp = t.allXPCount
        a.push(xp)
    })


    function bubbleSort(a) {
        var swapped;
            do {
            swapped = false;
                for (var i=0; i < a.length-1; i++) {
                if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
                }
            }
        } while (swapped);
    }

    bubbleSort(a);

    try {

        let top1qnt = a.length - 1
        let top2qnt = a.length - 2
        let top3qnt = a.length - 3
        let top4qnt = a.length - 4
        let top5qnt = a.length - 5
        let top6qnt = a.length - 6


        let top1search = db.get("RankSystem").find({allXPCount: a[top1qnt]}).value()
        let top2search = db.get("RankSystem").find({allXPCount: a[top2qnt]}).value()
        let top3search = db.get("RankSystem").find({allXPCount: a[top3qnt]}).value()
        let top4search = db.get("RankSystem").find({allXPCount: a[top4qnt]}).value()
        let top5search = db.get("RankSystem").find({allXPCount: a[top5qnt]}).value()
        let top6search = db.get("RankSystem").find({allXPCount: a[top6qnt]}).value()


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

    message.channel.send(new Discord.RichEmbed()
        .setTitle('🎖 Leaderboard')
        .setDescription("Estes são os seis membros que mais utilizam o servidor:\n ")
        .addField(`🥇 - ${top1search.user}`,`⠀• _XP:_ ${top1search.XPdisplay}/${formatNumber(String(top1search.Level*550))}\n⠀• _Progresso:_ ${Math.floor(top1search.XPcount/top1search.Level*100/550)}%\n⠀• _Level:_ ${top1search.Level}\n⠀• _Moedas:_ ${top1search.Coindisplay}`)
        .addField(`🥈 - ${top2search.user}`,`⠀• _XP:_ ${top2search.XPdisplay}/${formatNumber(String(top2search.Level*550))}\n⠀• _Progresso:_ ${Math.floor(top2search.XPcount/top2search.Level*100/550)}%\n⠀• _Level:_ ${top2search.Level}\n⠀• _Moedas:_ ${top2search.Coindisplay}`)
        .addField(`🥉 - ${top3search.user}`,`⠀• _XP:_ ${top3search.XPdisplay}/${formatNumber(String(top3search.Level*550))}\n⠀• _Progresso:_ ${Math.floor(top3search.XPcount/top3search.Level*100/550)}%\n⠀• _Level:_ ${top3search.Level}\n⠀• _Moedas:_ ${top3search.Coindisplay}`)
        .addField(`[4] - ${top4search.user}`,`⠀• _XP:_ ${top4search.XPdisplay}/${formatNumber(String(top4search.Level*550))}\n⠀• _Progresso:_ ${Math.floor(top4search.XPcount/top4search.Level*100/550)}%\n⠀• _Level:_ ${top4search.Level}\n⠀• _Moedas:_ ${top4search.Coindisplay}`, true)
        .addField(`[5] - ${top5search.user}`,`⠀• _XP:_ ${top5search.XPdisplay}/${formatNumber(String(top5search.Level*550))}\n⠀• _Progresso:_ ${Math.floor(top5search.XPcount/top5search.Level*100/550)}%\n⠀• _Level:_ ${top5search.Level}\n⠀• _Moedas:_ ${top5search.Coindisplay}`, true)
        .addField(`[6] - ${top6search.user}`,`⠀• _XP:_ ${top6search.XPdisplay}/${formatNumber(String(top6search.Level*550))}\n⠀• _Progresso:_ ${Math.floor(top6search.XPcount/top6search.Level*100/550)}%\n⠀• _Level:_ ${top6search.Level}\n⠀• _Moedas:_ ${top6search.Coindisplay}`, true)
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    
    ).then(msg => {msg.delete(120*1000); message.delete(120*1000)})

    } catch(err) {
        
        message.channel.send(new Discord.RichEmbed()
            .setFooter('Ainda não há membros suficiente para calcular a leaderboard. • Cisla ©')
            .setColor('#f83989')
        ).then(msg => {msg.delete(120*1000); message.delete(120*1000)})

    }
    
}