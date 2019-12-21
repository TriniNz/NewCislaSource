const Request = require('request')

exports.run = async (Discord, thisClient) => {
    
    let ServerIP = "jogar.cisla.com.br";

    let membersChannel = "602692031923355670";
    let playersChannel = "602692209275305994";
    let serverStats = "602692371393675264";

    let api = "http://mcapi.us/server/status?ip=" + ServerIP;

    Request(api, function(err, response, body)  {
        if(err) console.log(err)

        body = JSON.parse(body);

        thisClient.channels.get(membersChannel).setName('Membros: ' + thisClient.guilds.get('602679739777417256').memberCount)

        if(body.online == true) {
            thisClient.channels.get(serverStats).setName('Status: Online!')
            thisClient.channels.get(playersChannel).setName('Jogadores: ' + body.players.now)
        } else {
            thisClient.channels.get(serverStats).setName('Status: Manutenção.')
            thisClient.channels.get(playersChannel).setName('Jogadores: -')
        }

    
    })
}