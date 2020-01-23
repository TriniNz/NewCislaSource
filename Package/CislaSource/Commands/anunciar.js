exports.run = async (Discord, thisClient, message, args, db) => {
    
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Você não tem a permissão `ADMINISTRATOR` para executar este comando.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    let channel = message.mentions.channels.first();

    if(!channel) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Você não marcou nem um canal em sua mensagem.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    if(!args[1]) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Isto não é um anuncio valido.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    channel.send(new Discord.RichEmbed()
        .setAuthor('Anúncio da Administração.', thisClient.user.displayAvatarURL)
        .setDescription("\n    " + args.slice(1).join(' '))
        .setFooter(`Responsavel: ${message.author.tag}. CislaSource ©`, message.author.displayAvatarURL)
        .setColor('#f83989')
        .setTimestamp(new Date())
    ).then(msg => {
        message.reply(new Discord.RichEmbed()
            .setDescription('Sucesso! Anuncio enviado para ' + channel)
            .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
            .setColor('#f83989')
        )
    })
}