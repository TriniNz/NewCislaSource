exports.run = async (Discord, thisClient, message, args) => {

    let client = thisClient

    if(!message.member.roles.find(r => r.name == "★» Equipe Cisla «★")) return message.channel.send(new Discord.RichEmbed()
        .setDescription("Sem permissão.")
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    if(!args) return message.channel.send(new Discord.RichEmbed()
        .setDescription("Comando usado incorretamente. Use `!ausencia Motivo | Data.`")
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    let Txt = args.join(' ').split('|');
    if(!Txt[1]) return message.channel.send(new Discord.RichEmbed()
        .setDescription("Você esqueceu a data de volta.")
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    message.guild.channels.get('657721578263674910').send(new Discord.RichEmbed()
        .setAuthor('Ausência. ', thisClient.user.displayAvatarURL)
        .setDescription(`\n\n• _Membro:_ ${message.author}\n• _Motivo:_  ${Txt[0]}.\n• _Data do retorno:_ ${Txt[1]}\n`)
        .setThumbnail(message.author.displayAvatarURL)
        .setFooter(`Responsavel: ${message.author.tag}. CislaSource ©`, message.author.displayAvatarURL)
        .setColor('#f83989')
        .setTimestamp(new Date())
    )
}
