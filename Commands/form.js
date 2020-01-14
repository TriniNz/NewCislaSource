exports.run = async (Discord, thisClient, message, args) => {
    message.channel.send(new Discord.RichEmbed()
        .setDescription("Para acessar o formulario oficial do Cisla [clique aqui!](https://www.cisla.com.br/)")
        .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
    ).then(msg => {message.delete(15*1000); msg.delete(15*1000)})
}