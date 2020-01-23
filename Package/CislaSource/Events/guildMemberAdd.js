exports.run = async (Discord, thisClient, member, db) => {
    thisClient.channels.get('663637541584633856').send(new Discord.RichEmbed()
        .setAuthor(`${member.user.tag} chegou! Que a festa comece 🎉`, member.guild.iconURL)
        .setDescription(`Você é nosso membro numero ${member.guild.members.size}`)
        .addField(`Nossas informações basicas: `,`    • IP: [_Jogar.cisla.com.br_](http://www.cisla.com.br/)\n   • SITE: _[CislaShop](http://www.cisla.com.br/)_\n    • APLICAÇÃO: [_Formulario para ajudante_](https://docs.google.com/forms/d/e/1FAIpQLSewdIkGk_O6TG4yqkgVkIWlglUoODm9cxv1aWeodsyWQFJr4Q/viewform)  `)
        .addField(`Leia as regras para não ser punido.`,`Você pode utilizar _/regras_ ingame, para ver as regras do servidor, ou ir em <#602713323653562370>, para ver as regras do Discord.`)
        .addField(`Nos ajude a crescer!`,`Convide mais membros ao nosso Discord, assim tornando o servidor cada vez mais famoso!\n    • [Invite](https://discord.gg/TwjH6ww)`)
        .setFooter('CislaSource © Sua diversão é a nossa satisfação.', thisClient.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL)
        .setColor('#f83989')
    )
}