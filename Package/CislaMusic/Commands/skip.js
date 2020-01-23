const ytdl = require('ytdl-core');

exports.run = async (Discord, client, message, args, music) => {
  
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
  
  message.channel.send(new Discord.RichEmbed()
    .setDescription(`${message.author} pulou a musica.`)
    .setColor('#f83989') 
    .setFooter('CislaMusic ©', client.user.displayAvatarURL)
  )
  
    music.player.end()
  
}