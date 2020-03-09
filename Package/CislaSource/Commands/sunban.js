exports.run = async (Discord, thisClient, message, args) => {

    const client = thisClient;

    let ConfirmMessage = await message.channel.send(new Discord.RichEmbed()
        .setDescription('Você tem certeza que deseja iniciar um ticket de punições?')
        .setFooter('Você tem 30s para aceitar • CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    )

    await ConfirmMessage.react('✅');

    const filter = (react, user) => react.emoji.name == "✅" && user.id == message.author.id && !user.bot
    const ConfirmRC = ConfirmMessage.createReactionCollector(filter, {time: 30*1000, max: 1});

    ConfirmRC.on('collect', async rc => {
        const chCreated = await message.guild.createChannel(`⚓ ${message.author.username}`, {type: 'text', max: 1});

        await chCreated.setParent('686375156255293543');
        await chCreated.lockPermissions();

        await chCreated.overwritePermissions(message.member, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        });

        await ConfirmMessage.edit(new Discord.RichEmbed()
            .setDescription('Canal criado! Esta mensagem será apagada.')
            .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
            .setColor('#f83989')
        ).then(msg => msg.delete(30*1000));

        await chCreated.send(`Olá, ${message.author}\n • Este é o seu canal de ticket. Para iniciar envie as seguintes informações: \`\`\`Seu nickname:\nResponsavel pela sua punição:\nDefesa:\nComprovações de sua defesa (Provas a seu favor): \`\`\`\n Caso não haja estas informações sua revisão pode ser negada instantaneamente.`)
    })

}