const Request = require('request')
exports.run = async (Discord, thisClient, message, args, db) => {
  
  let client = thisClient;

    var server = "Jogar.Cisla.com.br"
    var api = 'http://mcapi.us/server/status?ip=' + server

    Request(api, function(err, response, body) {
        if(err) {
            console.log(err);
        }
        body = JSON.parse(body);
        
        if(body.online === true) {
        
        function removeColor(text = `${body.motd}`) {
            return text.replace(/(§\S[0-9][a-f][A-F])/g, '')
        }
          
            message.channel.send(new Discord.RichEmbed()
              .setAuthor(server)    
              .setDescription(`${removeColor()}\n\n• Versão: *${body.server.name}*\n• Jogadores: *${body.players.now}/${body.players.max}*`)
              .setColor("#6699FF")
              .setFooter("Cisla ©")
              .setTimestamp(new Date())
            ).then(msg => {
                msg.delete(15*1000)
                message.delete(15*1000)
            })
        } else 
        {

            message.channel.send(new Discord.RichEmbed()
              .setAuthor(server)    
              .setDescription(`O servidor está em manutenção, ou desconectado.`)
              .setColor("#6699FF")
              .setFooter("Cisla ©")
              .setTimestamp(new Date())
            ).then(msg => {
                msg.delete(15*1000)
                message.delete(15*1000)
            })
        }
    });

}
