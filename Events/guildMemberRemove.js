exports.run = async (Discord, thisClient, member, db) => {
    thisClient.channels.get('663637565005627402').send(new Discord.RichEmbed()
        .setFooter(`${member.user.tag} saiu! Até mais.`, member.user.displayAvatarURL)
        .setColor('#f83989')
    )
}