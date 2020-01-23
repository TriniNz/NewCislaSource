exports.run = async (Discord, thisClient, message, args, db) => {

    message.channel.send(new Discord.RichEmbed()
        .setDescription('Está querendo se tornar um parceiro do Cisla? Vou te passar alguns requisitos que será necessario preencher.')
        .addField('Youtuber',"_Para se tornar um Youtuber parceiro do Cisla será necessario ter:_\n • **800 Membros** inscritos em seu canal.\n • Retorno agradavel em views.\n → Vantagens: acesso ao vip EXTREME", true)
        .addBlankField(true)
        .addField('Youtuber Mirim',"_ Para se tornar um Youtuber Mirim parceiro do Cisla será necessario ter:_\n • **200 Membros** inscritos em seu canal.\n • Retorno agradavel em views.\n → Vantagens: acesso ao vip STANDARD", true)
        .setFooter('Atenciosamente CislaSource ©', thisClient.user.displayAvatarURL)
        .setThumbnail('https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
        .setColor('#ff3333')
    )
}