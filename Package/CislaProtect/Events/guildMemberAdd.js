exports.run = async (Discord, client, member) => {

    member.addRole('657652606646222861');
    member.send(new Discord.RichEmbed()
        .setDescription("Olá. Eu sou o Cisla Security, para ter acesso a todo conteudo do nosso servidor, você terá que se registrar clicando na reação da seguinte mensagem: **https://discordapp.com/channels/657631998634098699/657989537825423401/658005971553222656**")
        .setColor('#f83989')
        .setFooter('CislaProtect ©', client.user.displayAvatarURL)
    ).catch(() => {})

}