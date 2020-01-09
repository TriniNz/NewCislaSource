exports.run = async (Discord, thisClient, message, args) => {

    let client = thisClient
    
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops. Você não tem permissões suficiente para executar este comando.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    let Mention = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!Mention) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops. Você não marcou nem um membro valido.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})
    
    let Motivo = args.slice(1).join(' ')
    if(!args[2]) Motivo = "Má conduta."

    let warn1 = message.guild.roles.find(r => r.name === "WARN I");
    let warn2 = message.guild.roles.find(r => r.name === "WARN II");
    let warn3 = message.guild.roles.find(r => r.name === "WARN III");
    
    let warn2find = Mention.roles.find(r => r.name === "WARN II");
    let warn1find = Mention.roles.find(r => r.name === "WARN I");
    let warn3find = Mention.roles.find(r => r.name === "WARN III");


    if(!warn1find) Mention.addRole(warn1).then(Sucess => {

        message.channel.send(new Discord.RichEmbed()
            .setFooter(`Aviso enviado com sucesso. Número de avisos de ${Mention.user.username}: 1/3. • CislaSource ©️`)
            .setColor('#f83989')
        )

        client.channels.get('663631967774048256').send(new Discord.RichEmbed()
            .setAuthor("Punição.")
            .setDescription("Um membro acabou de ser avisado.")
            .addField('Membro: ',`${Mention.user.username}`)
            .addField('Ação: ', "Aviso, 1 de 2 restantes.")
            .addField("Motivo: ", Motivo)
            .setThumbnail(Mention.user.displayAvatarURL)
            .setFooter(`Responsavel: ${message.author.username} • CislaSource ©️`, client.user.displayAvatarURL)
            .setColor('#f83989')
        )
    })

    if(warn1find) Mention.addRole(warn2).then(Sucess => {

        message.channel.send(new Discord.RichEmbed()
            .setFooter(`Aviso enviado com sucesso. Número de avisos de ${Mention.user.username}: 2/3. • CislaSource ©️`)
            .setColor('#f83989')
        )

        client.channels.get('663631967774048256').send(new Discord.RichEmbed()
            .setAuthor("Punição.")
            .setDescription("Um membro acabou de ser avisado.")
            .addField('Membro: ',`${Mention.user.username}`)
            .addField('Ação: ', "Aviso, 2 de 1 restantes.")
            .addField("Motivo: ", Motivo)
            .setThumbnail(Mention.user.displayAvatarURL)
            .setFooter(`Responsavel: ${message.author.username} • CislaSource ©️`, client.user.displayAvatarURL)
            .setColor('#f83989')
        )
    })

    if(warn2find) Mention.ban("O membro excedeu o numero de avisos.").then(Sucess => {

        Mention.send("Esta é uma copia do motivo de sua punição.",new Discord.RichEmbed()
            .setAuthor("Punição.")
            .setDescription("Um membro acabou de ser banido.")
            .addField('Membro: ',`${Mention.user.username}`)
            .addField('Ação: ', "Banimento, o membro avisado diversas vezes.")
            .addField("Motivo: ", Motivo)
            .setThumbnail(Mention.user.displayAvatarURL)
            .setFooter(`Responsavel: ${message.author.username} • CislaSource ©️`, client.user.displayAvatarURL)
            .setColor('#f83989')
        ).catch(err => {})

        message.channel.send(new Discord.RichEmbed()
            .setFooter(`O membro foi banimento. Número de avisos de ${Mention.user.username}: 3/3. • CislaSource ©️`)
            .setColor('#f83989')
        )

        client.channels.get('663631967774048256').send(new Discord.RichEmbed()
            .setAuthor("Punição.")
            .setDescription("Um membro acabou de ser banido.")
            .addField('Membro: ',`${Mention.user.username}`)
            .addField('Ação: ', "Banimento, o membro avisado diversas vezes.")
            .addField("Motivo: ", Motivo)
            .setThumbnail(Mention.user.displayAvatarURL)
            .setFooter(`Responsavel: ${message.author.username} • CislaSource ©️`, client.user.displayAvatarURL)
            .setColor('#f83989')
        )
    })
}