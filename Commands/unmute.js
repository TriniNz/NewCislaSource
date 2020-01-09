exports.run = async (Discord, thisClient, message, args) => {

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops. Você não tem permissões suficiente para executar este comando.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    let mention = message.mention.members.fisrt();
        if(!mention) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops. Você não marcou nem um membro valido.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    if(!mention.roles.get('657652609905197096')) return message.channel.send(new Discord.RichEmbed
        .setDescription('Ops. este membro não está mutado.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    )

    let Motivo = args.slice(1).join(' ')
        if(!args[2]) Motivo = "Boa conduta."

    mention.removeRole('657652609905197096').then(Sucess => {
        client.channels.get('663631967774048256').send(new Discord.RichEmbed()
            .setAuthor('Punições')
            .setDescription("Um membro acabou de ser desmutado.")
            .addField('Membro: ', mention.user.username)
            .addField('Ação:', "Unmute")
            .addField('Motivo: ', Motivo)
            .setThumbnail(mention.user.displayAvatarURL)
            .setFooter(`Responsavel: ${message.author.tag}. CislaSource ©`)
            .setColor('#f83989')
        )
    })
}