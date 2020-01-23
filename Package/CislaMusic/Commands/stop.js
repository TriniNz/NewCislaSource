exports.run = async (Discord, client, message, args, music, loop) => {
  
    if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send(new Discord.RichEmbed()
      .setDescription('Você não tem permissão para executar este comando')
      .setColor('#f83989')
      .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    )
  
    if(!music.playlist) return message.channel.send(new Discord.RichEmbed()
      .setDescription('Não está tocando nem uma musica.')
      .setColor('#f83989')
      .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    )
  
    music.player.destroy()
    message.guild.me.voiceChannel.leave();
    music.playlist.length = 0
    message.channel.send(new Discord.RichEmbed()
          .setDescription(`A musica foi parada por ${message.author}.`)
          .setColor('#f83989')
          .setFooter('CislaMusic ©', client.user.displayAvatarURL)
      );
  }