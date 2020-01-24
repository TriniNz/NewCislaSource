exports.run = async (Discord, client, message, music) => {

    if(message.author.bot) return;
    
    if(message.mentions.users.first() && message.mentions.users.first().id == '667774922302423060') return message.channel.send(new Discord.RichEmbed()
        .setDescription("Estes são os comandos do CislaMusic:\n\n• **Help** - Mostra a você esta mensagem\n• **Loop** - Mantem a mesma musica tocando quando ativado.\n• **Pause** - Pausa a musica.\n• **Play** - Adiciona uma nova musica a playlist.\n• **Playlist-loop** - Mantem a playlist atual em loop.\n• **Playlist** - Mostra as informações da playlist atual.\n• **Skip** - Pula a musica atual.\n• **Stop** Encerra a playlist e desconecta o bot.\n• **Unpause** - Volta a musica caso pausada.")
        .setColor('#f83989') 
        .setFooter('Meu prefixo é ! • CislaMusic ©', client.user.displayAvatarURL)
    ).then(Msg => {Msg.delete(15*1000); message.delete(15*1000)})
    
    const prefix = "!"
    
    const args = message.content.slice(prefix).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase().replace(prefix, "");

    let Path_Help = require('../Commands/help.js');
    let Path_Loop = require('../Commands/loop.js');
    let Path_Pause = require('../Commands/pause.js');
    let Path_Play = require('../Commands/play.js');
    let Path_PlaylistLoop = require('../Commands/playlist-loop.js');
    let Path_Playlist = require('../Commands/playlist.js');
    let Path_Skip = require('../Commands/skip.js');
    let Path_Stop = require('../Commands/stop.js');
    let Path_Unpause = require('../Commands/unpause.js');

    if(message.content.indexOf(prefix) != 0 || message.channel.id != "657721551776514069") return undefined;

    if(cmd == "ajuda" || cmd == "help" || cmd == "h") return Path_Help.run(Discord, client, message, args, music);
    if(cmd == "loop" || cmd == "repetir") return Path_Loop.run(Discord, client, message, args, music);
    if(cmd == "pause" || cmd == "pausar") return Path_Pause.run(Discord, client, message, args, music);
    if(cmd == "play" || cmd == "tocar") return Path_Play.run(Discord, client, message, args, music);
    if(cmd == "playlistloop") return Path_PlaylistLoop.run(Discord, client, message, args, music);
    if(cmd == "playlist" || cmd == "lista") return Path_Playlist.run(Discord, client, message, args, music);
    if(cmd == "skip" || cmd == "pular") return Path_Skip.run(Discord, client, message, args, music);
    if(cmd == "stop" || cmd == "parar") return Path_Stop.run(Discord, client, message, args, music);
    if(cmd == "unpause" || cmd == "despausar") return Path_Unpause.run(Discord, client, message, args, music);
    if(cmd) return message.channel.send(new Discord.RichEmbed()
        .setDescription(`Ops. Este comando não existe!`)
        .setFooter('CislaSource ©', client.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(cmdNotFound => {cmdNotFound.delete(15*1000); message.delete(15*1000)})
}