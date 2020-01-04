const Request = require('request')

exports.run = async (Discord, thisClient) => {
    
    let ServerIP = "jogar.cisla.com.br";

    let membersChannel = "657721554574114846";
    let playersChannel = "657721557367390218";
    let serverStats = "657721584286695426";

    let api = "http://mcapi.us/server/status?ip=" + ServerIP;

    Request(api, function(err, response, body)  {
        if(err) console.log(err)

        body = JSON.parse(body);

        thisClient.channels.get(membersChannel).setName('Membros: ' + thisClient.guilds.get('657631998634098699').memberCount)

        if(body.online == true) {
            thisClient.channels.get(serverStats).setName('Status: Online!')
            thisClient.channels.get(playersChannel).setName('Jogadores: ' + body.players.now)
        } else {
            thisClient.channels.get(serverStats).setName('Status: Manutenção.')
            thisClient.channels.get(playersChannel).setName('Jogadores: -')
        }

    
    })
}
