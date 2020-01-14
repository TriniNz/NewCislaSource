exports.run = async (Discord, thisClient, message, args) => {
    message.channel.send(new Discord.RichEmbed()
        .setDescription("O ip de nosso servidor é *jogar.Cisla.com.br*")
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})
}