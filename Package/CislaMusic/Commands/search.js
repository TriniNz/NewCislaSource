const search = require('yt-search');

exports.run = async (Discord, client, message, args, playlist, loop) => {

  search(args.join(' '), async function(err, res) {

    if(err) message.channel.send(new Discord.RichEmbed()
      .setDescription('Ops... Houve um erro inesperado.')
      .setColor('#f83989')
      .setFooter('CislaMusic ©', client.user.displayAvatarURL)
    )
    
    let searched = res.videos.slice(0, 5);
    
    let txt = "Escolha uma musica: \n\n"
    for(let x=0; x < searched.length; x++) {
      txt += `${parseInt(x) + 1}. *${searched[x].title} (${searched[x].timestamp})*\n`
    }
    
    let msg = await message.channel.send(new Discord.RichEmbed()
      .setDescription(txt)
      .setColor('#f83989')
      .setFooter('Use 6 para cancelar. • CislaMusic ©', client.user.displayAvatarURL)
    )
      
    const filter = M => !isNaN(M.content) && M.content < searched.length + 2 && M.content > 0;
    const collector = message.channel.createMessageCollector(filter, {max: 1});
    
    collector.searched = searched
    
    collector.on('collect', M => {
      if(M.content == 6) return msg.edit("Cancelado.")
      let cmdPlay = require('./play.js');
      args = [searched[parseInt(M.content)-1].url]
      cmdPlay.run(Discord, client, message, args, playlist, loop)
    
      
    })
    
  })
  
}