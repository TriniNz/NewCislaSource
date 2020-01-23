exports.run = async (Discord, client, message, args, music) => {
  
    message.channel.send(new Discord.RichEmbed()
        .setDescription("Estes são os comandos do CislaMusic:\n\n• **Help** - Mostra a você esta mensagem\n• **Loop** - Mantem a mesma musica tocando quando ativado.\n• **Pause** - Pausa a musica.\n• **Play** - Adiciona uma nova musica a playlist.\n• **Playlist-loop** - Mantem a playlist atual em loop.\n• **Playlist** - Mostra as informações da playlist atual.\n• **Skip** - Pula a musica atual.\n• **Stop** Encerra a playlist e desconecta o bot.\n• **Unpause** - Volta a musica caso pausada.")
        .setColor('#f83989') 
        .setFooter('Meu prefixo é ! • CislaMusic ©', client.user.displayAvatarURL)
    ).then(Msg => {Msg.delete(15*1000); message.delete(15*1000)})
}