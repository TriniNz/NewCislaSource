exports.run = async (Discord, client, message, args, db) => {

    let dados = db.get('voteSystem').value()
    let confirm = db.get('voteSystem').find({"MemberID": message.author.id}).value()

    if(confirm != undefined) return message.channel.send(new Discord.RichEmbed()
        .setDescription("Você já utilizou seu voto.")
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(Msg => {Msg.delete(15*1000); message.delete(15*1000)})

    let role = message.guild.roles.find(R => R.name == "★» Ajudante");

    if(message.member.roles.find(R => R.name == "★» Ajudante")) return message.channel.send(new Discord.RichEmbed()
        .setDescription("Você não pode votar pois já é um ajudante.")
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(Msg => {Msg.delete(15*1000); message.delete(15*1000)})

    let getMembers = role.members;
    let Members = [];
    getMembers.map(U => Members.push(U.id))

    if(getMembers.size < 1) return message.channel.send(new Discord.RichEmbed()
        .setDescription("Não há membros suficiente para iniciar a votação.")
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(Msg => {Msg.delete(15*1000); message.delete(15*1000)})

    let txt = "Escolha o melhor ajudante em sua opinião:\n\n";

    for(let x=0; x < Members.length; x++) {
        let Member = message.guild.members.get(Members[x]);
        let vote;
        try {
        vote = db.get('voteSystem').find({"MemberVotedID": Member.id}).value().Votes
        } catch(err) {
            if(err == "TypeError: Cannot read property 'Votes' of undefined") vote = 0
        } 

        txt += `**${x+1}**. *${Member}*, votos: ${vote}\n`;
    }

    let Msg = await message.channel.send(new Discord.RichEmbed()
        .setDescription(txt)
    );

    let filter = (F) => F.author.id == message.author.id && F.content > 0 && F.content < Members.length + 1
    const Collector = message.channel.createMessageCollector(filter, {max: 1});

    Collector.on('collect', C => {

        let Member = message.guild.members.get(Members[C.content - 1]);
        let AjudanteVotado = db.get('voteSystem').find({"MemberVotedID": Member.id}).value();
        
        try {

            db.get('voteSystem').find({"MemberVotedID": Member.id}).assign({"Votes": AjudanteVotado.Votes + 1}).write()

        } catch (err) {
            if(err == "TypeError: Cannot read property 'Votes' of undefined") {
                db.get("voteSystem").push({
                    "Name": Member.user.username,
                    "MemberVotedID": Member.id,
                    "Votes": 1
                }).write()
            }
        }

        db.get("voteSystem").push({
            "Member": message.author.username,
            "MemberID": message.author.id,
            "VoteTo": Member.user.username
        }).write()

        message.channel.send(new Discord.RichEmbed()
            .setDescription("Sucesso! Seu voto foi registrado com exito.")    
            .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
            .setColor('#f83989')
        )

    });
}