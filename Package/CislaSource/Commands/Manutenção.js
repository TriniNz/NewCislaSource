exports.run = async (Discord, thisClient, message, args, db) => {
    message.channel.send(new Discord.RichEmbed() 
        .setDescription(`Ops... Este comando está em manutenção, caso seja urgente contate <@429825875467304960> no privado.`)
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})
}