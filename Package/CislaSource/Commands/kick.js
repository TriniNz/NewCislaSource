exports.run = async (Discord, thisClient, message, args, db) => {
    
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Você não tem a permissão `BAN_MEMBERS` para executar este comando.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    let member = message.mentions.members.first();

    if(!member) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Você não marcou um membro valido.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    let comentario = args.slice(1).join(' ')
    if(!args[2]) comentario = "Má conduta."

    member.send(new Discord.RichEmbed()
        .setFooter("Você foi expulso no Cisla, por '" + comentario + "' - Responsavel: " + message.author.tag + " • CislaSource ©")
        .setColor('#f83989')
    ).catch()

    let time = Date().split(/ +/g);

    member.kick(`${time[2]} de ${time[1]}, ${time[3]}, ás ${time[4]}` + " @| " + message.author.tag + " @| " + comentario).then(() => {
    
    message.channel.send(new Discord.RichEmbed()
        .setFooter("Usuario expulso com sucesso.")
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    message.guild.channels.get('663631967774048256').send(new Discord.RichEmbed()
        
        .setAuthor('Punição')
        .setDescription("Um membro acabou de ser expulso.")
        .addField('Membro: ', member.user.username)
        .addField('Ação:', "Expulsão")
        .addField('Motivo: ', comentario)
        .setThumbnail(member.user.displayAvatarURL)
        .setFooter(`Responsavel: ${message.author.tag}. CislaSource ©`)
        .setColor('#f83989')
    )

})

}