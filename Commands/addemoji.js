exports.run = async (Discord, thisClient, message, args) => {

    let clinet = thisClient
    
    if(!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Você não tem permissão para executar este comando.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})
    
    if(message.attachments.size == 0) {

        let URL = args[0];
            if(!URL) return message.channel.send(new Discord.RichEmbed()
                .setDescription("Ops... Você esqueceu do link do seu emoji.")
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})
        
        let name = args.splice(1).join('')
        console.log(name)
        console.log(URL)

        if(!name) return message.channel.send(new Discord.RichEmbed()
            .setDescription("Ops.. Você esqueceu do nome do seu emoji.")
            .setColor('#f83989')
            .setFooter('CislaSource ©️', client.user.displayAvatarURL)
        ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

        let exURL = URL.split('.')[URL.split('.').length - 1];

        if(URL && name && exURL == "png" || exURL == "jpg" || exURL == "jpeg" || exURL == "gif") {
            message.guild.createEmoji(URL, name.toLowerCase()).then(async Sucess => {
                await message.channel.send(new Discord.RichEmbed()
                    .setDescription(`Seu emoji foi adicionado com sucesso! :${name}:`)
                    .setColor('#f83989')
                    .setFooter('CislaSource ©️', client.user.displayAvatarURL)
                )

            }).catch(err => {
                if(err) message.channel.send(new Discord.RichEmbed()
                    .setDescription(`Ops.. Algo errado aconteceu. `)
                    .setColor('#f83989')
                    .setFooter('Pode ser que sua imagem seja muito pesada. • CislaSource ©️', client.user.displayAvatarURL)
                )
            })
            
        } else message.channel.send(new Discord.RichEmbed()
            .setDescription(`Ops.. Este arquivo não é suportado. `)
            .setColor('#f83989')
            .setFooter('CislaSource ©️', client.user.displayAvatarURL)
        )

    } 
    
    else if(message.attachments.size == 1) {

        let URL = message.attachments.first().url;
            if(!URL) return message.channel.send(new Discord.RichEmbed()
                .setDescription("Ops... Você esqueceu do link do seu emoji.")
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})
        
        let name = args.splice(0).join('')
        console.log(name)
        console.log(URL)

        if(!name) return message.channel.send(new Discord.RichEmbed()
            .setDescription("Ops.. Você esqueceu do nome do seu emoji.")
            .setColor('#f83989')
            .setFooter('CislaSource ©️', client.user.displayAvatarURL)
        ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})

        let exURL = URL.split('.')[URL.split('.').length - 1];

        if(URL && name && exURL == "png" || exURL == "jpg" || exURL == "jpeg" || exURL == "gif") {
            message.guild.createEmoji(URL, name.toLowerCase()).then(async Sucess => {
                await message.channel.send(new Discord.RichEmbed()
                    .setDescription(`Seu emoji foi adicionado com sucesso! :${name}:`)
                    .setColor('#f83989')
                    .setFooter('CislaSource ©️', client.user.displayAvatarURL)
                )

            }).catch(err => {
                if(err) message.channel.send(new Discord.RichEmbed()
                    .setDescription(`Ops.. Algo errado aconteceu. `)
                    .setColor('#f83989')
                    .setFooter('Pode ser que sua imagem seja muito pesada. • CislaSource ©️', client.user.displayAvatarURL)
                )
            })
            
        } else message.channel.send(new Discord.RichEmbed()
            .setDescription(`Ops.. Este arquivo não é suportado. `)
            .setColor('#f83989')
            .setFooter('CislaSource ©️', client.user.displayAvatarURL)
        )

    }
}