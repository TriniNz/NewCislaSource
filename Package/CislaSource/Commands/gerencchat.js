exports.run = async (Discord, thisClient, message, args) => {

    const client = thisClient;

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops. Você não tem permissões suficiente para executar este comando.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    if(message.channel.name.indexOf('⚓') != 0) return  message.channel.send(new Discord.RichEmbed()
    .setDescription('Ops. Não pode-se fazer isto neste canal.')
    .setColor('#f83989')
    .setFooter('CislaSource ©️', client.user.displayAvatarURL)
).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

    let ConfirmMessage = await message.channel.send(new Discord.RichEmbed()
        .setDescription('Escolha a ação:')
        .addField(':bellhop:','Encerrar Ticket.')
        .addField(':key:','Adicionar um membro ao chat.')
        .setFooter('Você tem 30s para aceitar • CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    )

    await ConfirmMessage.react('🛎️');
    await ConfirmMessage.react('🔑');

    const filter = (react, user) => ['🛎️','🔑'].includes(react.emoji.name) && user.id == message.author.id && !user.bot
    const ConfirmRC = ConfirmMessage.createReactionCollector(filter, {time: 30*1000});

    ConfirmRC.on('collect', async rc => {

        switch (rc.emoji.name) {
            case '🔑':
                let msg = await message.channel.send('Marque o membro que será adicionado ao canal.');

                const filterr = M => M.author.id == message.author.id && M.mentions.members.size > 0
                const inviteMember = message.channel.createMessageCollector(filterr, {time: 30*1000, max: 1});

                inviteMember.on('collect', m => {
                    message.channel.overwritePermissions(m.mentions.members.first(), {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true
                    });

                    msg.edit(m.mentions.members.first() + " agora pode falar neste canal.")
                })

                break;
            case '🛎️':
                message.channel.delete(500)
                break
        }
    })

}