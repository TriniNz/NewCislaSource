exports.run = async (Discord, client, message, args, music) => {
  
    if(music.playlist.length == 0) return message.channel.send('Não há nem uma musica tocando.')
      
      let txt = `Estou tocando: *[${music.playlist[0].title}](${music.playlist[0].url})* enviado por ${music.playlist[0].requested}.\n\n`
      
      for(let x=1; x < music.playlist.length; x++) {
        txt += `${x}. *[${music.playlist[x].title}](${music.playlist[x].url})* enviado por ${music.playlist[x].requested}.\n`
      }
    
    txt += `\n Ao todo tenho ${music.playlist.length} musicas na playlist.`
      
      message.channel.send(new Discord.RichEmbed()
        .setDescription(txt)
        .setColor('#f83989') 
        .setFooter('CislaMusic ©', client.user.displayAvatarURL)
      )
      
  }