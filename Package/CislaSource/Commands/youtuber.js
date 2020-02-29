exports.run = async (Discord, thisClient, message, args, db) => {

    message.channel.send(new Discord.RichEmbed()
        .setDescription('Está querendo se tornar um parceiro do Cisla? Antes vou te passar algumas informações importantes:\n• O Cash será depositado após o video ser postado, juntamente com a tag.\n• Será necessário fazer um novo pedido de tag a cada vídeo postado.\n• Caso não haja nem um video após 7 dias sua tag será removida.')
        .addField('Youtuber',"_Para se tornar um Youtuber parceiro do Cisla será necessario ter:_\n • **800 Membros** inscritos em seu canal.\n • Retorno agradavel em views.\n → Vantagens: 5 unidades de Cash por vídeo gravado.", true)
        .addBlankField(true)
        .addField('Youtuber Mirim',"_ Para se tornar um Youtuber Mirim parceiro do Cisla será necessario ter:_\n • **200 Membros** inscritos em seu canal.\n • Retorno agradavel em views.\n → Vantagens: 3 unidades de Cash por vídeo gravado.", true)
        .setFooter('Atenciosamente CislaSource ©', thisClient.user.displayAvatarURL)
        .setThumbnail('https://i.pinimg.com/originals/de/1c/91/de1c91788be0d791135736995109272a.png')
        .setColor('#ff3333')
    )
}
