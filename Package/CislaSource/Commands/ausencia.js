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

    message.guild.channels.get('670441853455433729').send(new Discord.RichEmbed()
        .setAuthor(`Ausencia.`, message.author.displayAvatarURL)
        .addField(`Membro: `, `${message.author.username}`)
        .addField(`Motivo:`,`${Txt[0]}`)
        .addField(`Data do retorno:`,`${Txt[1]}`)
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    )
}