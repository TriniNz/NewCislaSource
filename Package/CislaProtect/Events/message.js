exports.run = async (Discord, client, message, Client_CislaMusic, Client_CislaSource) => {

    let prefix = '+';

    const args = message.content.trim().split(/ +/g);
    const cmd = args.shift().toLowerCase().replace(prefix, '');

    if(message.guild.id != '657631998634098699') return undefined;

    if(message.content.indexOf(prefix) == 0) {
        
        try {
            let Path = require("../Commands/" + cmd + ".js");
            return Path.run(Discord, client, message, args, Client_CislaMusic, Client_CislaSource);
            
        } catch (err) {
            console.log(err);
            return message.channel.send(new Discord.RichEmbed()
                .setDescription('Comando não encontrado.')
                .setFooter(`CislaProtect ©`, client.user.displayAvatarURL)
                .setColor('#f83989')
            )
        }
    }
}