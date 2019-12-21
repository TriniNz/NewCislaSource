exports.run = async (Discord, thisClient, message, args, db) => {
    
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Você não tem a permissão `ADMINISTRATOR` para executar este comando.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    let member = message.mentions.members.first();

    if(!member) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Você não marcou um membro valido.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    let role = message.mentions.roles.first();

    if(!role) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Você não marcou um membro valido.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    if(!member.roles.find(r => r.id == role.id)) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Este membro não é ' + role)
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    let motivo = args.slice(2).join(' ')
    if(!args[3]) motivo = 'Motivos internos.'


    member.removeRole(role).then(async sucess => {
        message.reply(new Discord.RichEmbed()
            .setDescription('Sucesso! ' + member + " perdeu seu cargo na equipe. ex-" + role)
            .setFooter("Responsavel: " + message.author.tag + ' CislaSource ©', thisClient.user.displayAvatarURL)
            .setColor('#f83989')
        ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

        message.guild.channels.get('602887344692920362').send(new Discord.RichEmbed()
            .setAuthor('Remoção. ', thisClient.user.displayAvatarURL)
            .setDescription(`\n\n• _Membro:_ ${member}\n• _Cargo:_  ${role}.\n• _Observação:_ ${motivo}\n`)
            .setThumbnail(member.user.displayAvatarURL)
            .setFooter(`Responsavel: ${message.author.tag}. CislaSource ©`, message.author.displayAvatarURL)
            .setColor('#ff1a1a')
            .setTimestamp(new Date())
        )
    })
}