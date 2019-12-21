exports.run = async (Discord, thisClient, message, args, db) => {

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Você não tem a permissão `BAN_MEMBERS` para executar este comando.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    if(!args[0] || isNaN(args[0]) || args[0].length < 17 || args[0].length >= 21) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Ops... Isto não é um ID valido.')
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

    message.guild.fetchBan(`${args[0]}`).then(({user, reason}) => {

        message.channel.send(new Discord.RichEmbed()
            .setAuthor('Unban.')
            .setThumbnail(user.displayAvatarURL)
            .setDescription(`Tem certeza que deseja desbanir ${user.tag}?`)
            .addField(`_Informações da punição:_`, ` • _Usuario:_ ${user.tag}\n • _Motivo:_ ${reason.split('@|')[2]}\n • _Responsavel:_ ${reason.split('@|')[1]}\n • _Data do acontecimento:_ ${reason.split('@|')[0]}`)
            .setFooter('Para confirmar esta ação reaja com: ✅, se não, aguarde 30s. • CislaSource ©', thisClient.user.displayAvatarURL)
            .setColor('#f83989')
        ).then(Confirm => {
            Confirm.react('✅')

            const filter = (reaction, user) => reaction.emoji.name == "✅" && user.id === message.author.id
            const confirmCollector = Confirm.createReactionCollector(filter, {time: 30*1000, max: 1})

            confirmCollector.on('collect', async c => {
                message.guild.unban(user).then(() => {
                    Confirm.edit(new Discord.RichEmbed()
                        .setAuthor('Unban.')
                        .setThumbnail(user.displayAvatarURL)
                        .setDescription(`Sucesso! ${user.tag} foi desbanido.`)
                        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
                        .setColor('#f83989')
                    )
                    Confirm.clearReactions()

                    message.guild.channels.get('602717447933657099').send(new Discord.RichEmbed()
                        .setAuthor('Unban.')
                        .setDescription(`• _Membro:_ ${user.tag}`)
                        .setThumbnail(user.displayAvatarURL)
                        .setFooter(`Responsavel: ${message.author.tag}. CislaSource ©`)
                        .setColor('#f83989')
                    )
                }).catch(err => {message.reply('Houve um erro inesperado.'); console.log(err)})
            })

            confirmCollector.on('end', c => {

                Confirm.edit(new Discord.RichEmbed()
                    .setAuthor('Unban.')
                    .setThumbnail(user.displayAvatarURL)
                    .setDescription(`Ação cancelada.`)
                    .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
                    .setColor('#f83989')
                ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})
                Confirm.clearReactions()
            })
        })
        

    }).catch(err => {
        if(err.message == "Unknown Ban") {
        
            return message.channel.send(new Discord.RichEmbed()
                .setDescription('Ops... Este Membro não está banido.')
                .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
                .setColor('#f83989')
            ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})

        } else console.log(err)
    })

}