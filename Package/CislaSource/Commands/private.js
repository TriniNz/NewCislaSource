exports.run = async (Discord, thisClient, message, args) => {

    let client = thisClient;

    let permissionsArray = ["★» Diretor",  "★» Gerente", "★» Administrador", "★» Moderador", "★» GC", "★» Ajudante da semana", "★» Ajudante", "Extreme", "Armagedon", "YouTuber"]

    if(!args[0]) return message.channel.send(new Discord.RichEmbed()
        .setDescription('Argumento não encontrado. Use `!private help` para ter acesso a todos os subcomandos.')
        .setColor('#f83989')
        .setFooter('CislaSource ©️', client.user.displayAvatarURL)
    )

    switch (args[0]) {
        case "create":

            if(!message.member.roles.some(r=>permissionsArray.includes(r.name))) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você não tem permissão para executar este comando.')
                .setColor('#f83989')
               .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            let existe = false

            message.member.roles.map(r => {
                if(r.name.split('')[1] == '⭐') existe = true
            })

            if(existe) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você já participa de uma sala privada, ou é dono de uma, saia para continuar.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            let category = message.guild.channels.find(c => c.name.toUpperCase() == "SALAS PRIVADAS" && c.type == 'category')

            let Ch = await message.guild.createChannel(`priv-${message.author.id}`, {type: 'text'}).then(Ch => Ch.setParent(category))
            let Rl = await message.guild.createRole({
                name: `[⭐] - ${message.author.id}`,
                color: '#080376',
                position: 2
            });

            await Ch.lockPermissions()

            Ch.overwritePermissions(Rl, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
                
            });

            message.member.addRole(Rl)
            Ch.send(new Discord.RichEmbed()
                .setDescription("Não fique sozinho nesta brincadeira!")
                .addField('Convide amigos para sua sala privada:',"Use `!private invite @Amigo` no chat de comandos!")
                .setFooter("Lembre-se, os superiores tem acesso a este chat, então informações confidenciais podem ser compartilhadas.")
                .setColor('#f83989')
            ).then(async Msg => {await Msg.pin(); await Msg.channel.bulkDelete(1)})

            await message.channel.send(new Discord.RichEmbed()
                .setFooter('Sua sala privada foi criada com sucesso! :sunglass:')
            )
            
            break;

        case "remove":

            if(!message.member.roles.some(r=>permissionsArray.includes(r.name))) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você não tem permissão para executar este comando.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            let ChFind = message.guild.channels.find(c => c.name == `priv-${message.author.id}`);
            let RlFind = message.guild.roles.find(r => r.name == `[⭐] - ${message.author.id}`);

            if(!ChFind && !RlFind) return message.channel.send(new Discord.RichEmbed()
                .setDescription("Você não tem nem uma sala privada para ser apagado.")
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            );

            message.channel.send(new Discord.RichEmbed()
                .setDescription('Tem certeza que deseja apagar sua sala privada?')
                .setColor('#f83989')
                .setFooter("Para confirmar reaja com '✅'! • CislaSource ©️")
            ).then(async Msg => {
                Msg.react('✅');
                Msg.delete(40*1000)

                let Filter = (React, User) => React.emoji.name == '✅' && User.id == message.author.id && !User.bot
                let RC = Msg.createReactionCollector(Filter, {time: 40*100, max: 1})


                RC.on('collect', async collected => {
                    ChFind.delete(1000);
                    RlFind.delete(1000);

                    message.channel.send(new Discord.RichEmbed()
                        .setFooter('Sucesso. Sua sala privada foi apagada com exito.')
                        .setColor('#f83989')
                    ).then(M => M.delete(15*1000))
                })
            })

            break;

        case "invite":

            if(!message.member.roles.some(r=>permissionsArray.includes(r.name))) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você não tem permissão para executar este comando.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            if(message.mentions.members.size <= 0) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você não marcou nem um membro valido.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            let MemberInvited = message.mentions.members.first()

            let OwnerChFind = message.guild.channels.find(c => c.name == `priv-${message.author.id}`);
            let OwnerRlFind = message.member.roles.find(r => r.name == `[⭐] - ${message.author.id}`);

            if(!OwnerChFind && !OwnerRlFind) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você não é dono de nem uma sala privada.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            let Participa = false

            MemberInvited.roles.map(r => {
                if(r.name.split('')[1] == '⭐') Participa = true
            })

            if(Participa) return message.channel.send(new Discord.RichEmbed()
                .setDescription('O membro convidado já participa de uma sala privada.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            message.channel.send(new Discord.RichEmbed()
                .setDescription("Você foi convidado para entrar na sala privada do(a) " + message.author)
                .setColor('#f83989')
                .setFooter("Para confirmar reaja com '✅'! • CislaSource ©️", client.user.displayAvatarURL)
            ).then(Msg => {
                Msg.react('✅')
                Msg.channel.send(`${MemberInvited}`)

                let mFilter = (React, User) => React.emoji.name == '✅' && User.id == MemberInvited.id && !User.bot
                let AcceptInvite = Msg.createReactionCollector(mFilter, {max: 1, time: 30*1000})

                AcceptInvite.on('collect', async collected => {

                    MemberInvited.addRole(OwnerRlFind);
                    OwnerChFind.send(new Discord.RichEmbed()
                        .setFooter(`${MemberInvited.user.username} entrou na sala privada.`)
                    )

                    Msg.delete(1000)
                })
            })

            break;

        case "kick":

            if(!message.member.roles.some(r=>permissionsArray.includes(r.name))) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você não tem permissão para executar este comando.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            if(message.mentions.members.size <= 0) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você não marcou nem um membro valido.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            let MemberKick = message.mentions.members.first()

            let OwnerChSearch = message.guild.channels.find(c => c.name == `priv-${message.author.id}`);
            let OwnerRlSearch = message.member.roles.find(r => r.name == `[⭐] - ${message.author.id}`);

            if(!OwnerChSearch && !OwnerRlSearch) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você não é dono de nem uma sala privada.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            let KickedRlSearch = MemberKick.roles.find(r => r.name == `[⭐] - ${message.author.id}`)

            if(!KickedRlSearch) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Este membro não faz parte da sua sala privada.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            MemberKick.removeRole(KickedRlSearch);
            OwnerChSearch.send(new Discord.RichEmbed()
                .setFooter(`${MemberKick.user.username} não faz mais parte desta sala privada.`)
            )

            break;

        case "leave":

            let existir = true
            let rl = 0

            message.member.roles.map(r => {
                if(r.name.split('')[1] == '⭐') {existir = false; rl = r}
            })

            if(existir) return message.channel.send(new Discord.RichEmbed()
                .setDescription('Você não participa de nem uma sala privada.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )

            let roleName = String(rl.name);
            roleName = roleName.split(' ')[2]

            if(message.author.id == roleName) return message.channel.send(new Discord.RichEmbed()
                .setDescription('O dono da sala privada não pode sair da mesma. Use `!private remove`.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )


            let ChExit = message.guild.channels.find(c => c.name == `priv-${roleName}`);
            
            ChExit.send(new Discord.RichEmbed()
                .setFooter(`${message.author.username} retirou-se desta sala privada.`)
            )
            message.member.removeRole(rl)
        

            break;

        case "help":
            message.channel.send(new Discord.RichEmbed()
                .setDescription("Este comando cria uma sala privada. Mas lembre-se, cada membro tem direito de ficar em uma sala privada por vez.")
                .addField('!private create','Criará sua sala privada.')
                .addField('!private remove', 'Apagará sua sala privada.')
                .addField('!private invite @user', 'Convidará pessoas para sua sala privada.')
                .addField('!private kick @user', 'Expulsará o usuario marcado.')
                .addField('!private leave','Você sairá da sala privada que se encontra.')
                .setColor('#f83989')
                .setFooter('CislaSource ©️', client.user.displayAvatarURL)
            )
            break;
    
        default:

        message.channel.send(new Discord.RichEmbed()
            .setDescription('Argumento não encontrado. Use `!private help` para ter acesso a todos os subcomandos.')
            .setColor('#f83989')
            .setFooter('CislaSource ©️', client.user.displayAvatarURL)
        
        )
            break;
    }
    
}