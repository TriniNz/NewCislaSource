exports.run = async (Discord, thisClient, message, args, db) => {

    let getMembers = role.members;
    let Members = [];
    getMembers.map(U => Members.push(U.id))

    for(let x=0; x < Members.length; x++) {
        let Member = message.guild.members.get(Members[x]);
        let vote;
        try {
        vote = db.get('voteSystem').find({"MemberVotedID": Member.id}).value().Votes
        } catch(err) {
            if(err == "TypeError: Cannot read property 'Votes' of undefined") vote = 0
        } 

        txt += `*${Member}*, votos: ${vote}\n`;
    }

    let Msg = await message.channel.send(new Discord.RichEmbed()
        .setDescription(txt)
    );
}