exports.run = async (Discord, client, message, args) => {

    let totalSeconds = (client.uptime / 1000);
    let uptime_d = Math.floor(totalSeconds / 86400);
    let uptime_h = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let uptime_m = Math.floor(totalSeconds / 60);
    let uptime_s = Math.floor(totalSeconds % 60);

    message.channel.send(new Discord.RichEmbed()
        .setDescription(`**Uptime:**\n ${uptime_d}:${uptime_h}:${uptime_m}:${uptime_s}`)
        .setFooter(`CislaProtect ©`, client.user.displayAvatarURL)
        .setColor('#f83989')
    )
}