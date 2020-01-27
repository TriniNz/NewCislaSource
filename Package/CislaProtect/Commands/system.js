    const OS = require('os')
    const cpuStat = require('cpu-stat');

exports.run = async (Discord, client, message, args, Client_CislaMusic, Client_CislaSource) => {

    let infoCislaSource = Math.floor(Client_CislaSource.ping);
    let infoCislaMusic = Math.floor(Client_CislaMusic.ping);
    let infoCislaProtect = Math.floor(client.ping);

    if(infoCislaSource == "NaN") infoCislaSource = "OFF, :("; else infoCislaSource = `ON! ${infoCislaSource}ms.`;
    if(infoCislaMusic == "NaN") infoCislaMusic = "OFF, :("; else infoCislaMusic = `ON! ${infoCislaMusic}ms.`;
    if(infoCislaProtect == "NaN") infoCislaProtect = "OFF, :("; else infoCislaProtect = `ON! ${infoCislaProtect}ms.`;

    cpuStat.usagePercent((err, percent, seconds) => {
        if (err) message.channel.send("Ops... Houve um erro inesperado.")

        message.channel.send(new Discord.RichEmbed()
            .setDescription(`**Status do sistema:**\n • CislaSource: ${infoCislaSource}\n• CislaMusic: ${infoCislaMusic}\n• CislaProtect: ${infoCislaProtect}\n\n **Infomações do sistema:**\n• CPU: ${Math.floor(percent)}% Utilizado. \n• RAM: ${Math.floor(OS.freemem()/OS.totalmem()*100)}% Utilizado.`)
            .setColor('#f83989')
            .setFooter("CislaProtect ©")
            .setTimestamp(new Date())
        ).then(msg => {msg.delete(15*1000); message.delete(15*1000)})
    });
}