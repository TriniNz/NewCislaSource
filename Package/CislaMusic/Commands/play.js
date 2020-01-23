const ytdl = require('ytdl-core');

exports.run = async (Discord, client, message, args, music, loop) => {
  
  if(!message.member.voiceChannel) return message.channel.send(new Discord.RichEmbed()
      .setDescription('Você não está conectado em nem um canal de voz.')
      .setColor('#f83989')
      .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    );

    if(!args[0]) return message.channel.send(new Discord.RichEmbed()
      .setDescription('Não foi possivel encontrar um link em sua mensagem.')
      .setColor('#f83989')
      .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    );
  
   if(music.playlistloopinfo) return message.channel.send(new Discord.RichEmbed()
      .setDescription('O modo de loop-playlist está ativado, desative-o para adicionar mais musicas.')
      .setColor('#f83989')
      .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    );
  
   let validate = await ytdl.validateURL(args[0]);
  
    if (!validate) {
      let path = require('./search.js')
      return path.run(Discord, client, message, args, music, loop)
    }

    var info = await ytdl.getInfo(args[0]);
    let videoInfo = info.player_response.videoDetails
    
    if(!music.connection) music.connection = await message.member.voiceChannel.join();
    if(!music.playlist) music.playlist = [];
    if(!music.loopinfo) music.loopinfo = false;
    if(!music.playlistloopinfo) music.playlistloopinfo = false;
    
    music.playlist.push({
      title: videoInfo.title,
      requested: message.author.username,
      channelID: message.channel.id,
      url: args[0]
    });
    
  if(!music.player) play(Discord, client, message, args, music)
  
  else {
    
    message.channel.send(new Discord.RichEmbed()
        .setDescription(`*[${videoInfo.title}](${args[0]})* foi adicionado a playlist por ${message.author}`)
        .setColor('#f83989')
        .setFooter('CislaMusic ©', client.user.displayAvatarURL)
      );
  }
}

async function play(Discord, client, message, args, music) {
  
  message.channel.send(new Discord.RichEmbed()
      .setDescription(`Estou tocando *[${music.playlist[0].title}](${music.playlist[0].url})* adicionado a playlist por ${music.playlist[0].requested}`)
      .setColor('#f83989')
      .setFooter('CislaMusic ©', client.user.displayAvatarURL)
  );
  
  music.player = await music.connection.playStream(ytdl(music.playlist[0].url, {filter: 'audioonly'}));
   
  music.player.on('end', () => {
     
     end(Discord, client, message, args, music);
     
  })
  
}

async function end(Discord, client, message, args, music) {
  
  if(music.playlistloopinfo) {
    
    music.playlist.push({
      title: music.playlist[0].title,
      requested: music.playlist[0].requested,
      channelID: music.playlist[0].channelID,
      url: music.playlist[0].url
    })
    
  }
  
  if(!music.loopinfo) music.playlist.shift()
  
  if(message.guild.me.voiceChannel.members.size < 2) {
    
    message.guild.me.voiceChannel.leave()
    music.playlist.length = 0
    message.channel.send(new Discord.RichEmbed()
        .setDescription(`Todos sairam do canal, a playlist foi excluida.`)
        .setColor('#f83989')
        .setFooter('CislaMusic ©', client.user.displayAvatarURL)
      )
    
  }
  
  if(music.playlist.length > 0) {
    play(Discord, client, message, args, music);
  
  } else {
    message.guild.me.voiceChannel.leave()
    message.channel.send(new Discord.RichEmbed()
        .setDescription(`A playlist acabou, então irei sair do canal.`)
        .setColor('#f83989')
        .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    );
  }
}



/*exports.run = async (Discord, client, message, args, playlist, loop) => {
  
  
  
    if(!message.member.voiceChannel) return message.channel.send(new Discord.RichEmbed()
      .setDescription('Você não está conectado em nem um canal de voz.')
      .setColor('#f83989')
      .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    );

    if(!args[0]) return message.channel.send(new Discord.RichEmbed()
      .setDescription('Não foi possivel encontrar um link em sua mensagem.')
      .setColor('#f83989')
      .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    );

    let validate = await ytdl.validateURL(args[0]);
  
    if (!validate) {
      let path = require('./search.js')
      return path.run(Discord, client, message, args, playlist, loop)
    }

    var info = await ytdl.getInfo(args[0]);
    let videoInfo = info.player_response.videoDetails
    
    playlist.push({
      title: videoInfo.title,
      requested: message.author.username,
      channelID: message.channel.id,
      url: args[0]
    })
    
    if(playlist.length == 1) {play(playlist, message, client, Discord, loop)} else {
      message.channel.send(new Discord.RichEmbed()
        .setDescription(`${videoInfo.title} foi adicionado a playlist por ${message.author}`)
        .setColor('#f83989')
        .setFooter('CislaMusic ©', client.user.displayAvatarURL)
      );
    }
}

async function play(playlist, message, client, Discord, loop) {
    
    message.channel.send(new Discord.RichEmbed()
        .setDescription(`Estou tocando *[${playlist[0].title}](playlist[0].url)* adicionado a playlist por ${playlist[0].requested}`)
        .setColor('#f83989')
        .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    );
  
  let connection = await message.member.voiceChannel.join()
  let createdSong = await connection.playStream(ytdl(playlist[0].url, {filter: 'audioonly'}));
   
   createdSong.on('end', () => {
     
    end(playlist, message, client, Discord, loop);
     
   })
  
  
}

async function end(playlist, message, client, Discord, loop) {
  
  if(!loop) playlist.shift()
     
  if(playlist.length > 0) {
    play(playlist, message, client, Discord, loop)
  } else {
    message.guild.me.voiceChannel.leave()
    message.channel.send(new Discord.RichEmbed()
        .setDescription(`A playlist acabou, então irei sair do canal!`)
        .setColor('#f83989')
        .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    );
  }

}*/