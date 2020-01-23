exports.run = async (Discord, thisClient, message, args) => {

    let client = thisClient;

    if(!message.member.hasPermission('MANAGE_MESSAGES')) message.channel.send(new Discord.RichEmbed()
        .setDescription('Você não tem permissão para executar este comando.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    let Mention = message.mentions.members.first();

    if(!Mention && !args[0]) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Marque um usuario ou defina um limite de mensagens a ser apagadas.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    if(Mention && !isNaN(args[1])) {
        
        message.channel.fetchMessages({limit: args[1]}).then(async Fetched => {

        
            let Fetchedfordelete = Fetched.filter(Msg => Msg.author.id == Mention.id)
        
            await message.channel.bulkDelete(Fetchedfordelete);
            await message.channel.send(new Discord.RichEmbed()
                .setDescription(`Apaguei ${Fetched.size} mensagens do autor ${Mention}.`)
                .setColor('#f83989')
                .setFooter(`Em: ${message.channel.name} • Responsavel: ${message.author.username}. • CislaSource ©️`)
            )
       })
    }

    if(!Mention && !isNaN(args[0])) {
       message.channel.fetchMessages({limit: args[0]}).then(async Fetched => {

            Fetched.array()
            await message.channel.bulkDelete(Fetched);
            await message.channel.send(new Discord.RichEmbed()
                .setDescription(`Apaguei ${Fetched.size} mensagens.`)
                .setColor('#f83989')
                .setFooter(`Em: ${message.channel.name} • Responsavel: ${message.author.username}. • CislaSource ©️`)
            )
       }) 
    }
}