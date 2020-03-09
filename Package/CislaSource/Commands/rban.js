exports.run = async (Discord, thisClient, message, args) => {
	
  let client = thisClient
  
	if(!message.member.roles.some(r => ["★» Diretor","★» Gerente","★» Administrador","★» Moderador","★» GC","★» Ajudante"].includes(r.name))) return message.channel.send(new Discord.RichEmbed()
		.setDescription('Você não tem permissão para executar este comando.')
		.setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
	);
	
	let string = args.join(' ');
	let item = string.split(';');
	
  const	name = item[0];
  const motivo = item[1];
  const prova = item[2];
  const tipo = item[3];
		
	if(!name || !motivo || !prova || !tipo) return message.channel.send(new Discord.RichEmbed()
		.setDescription("Comando utilizado incorretamente. O uso correto é `!regban Nickname; Motivo; Prova; Tipo.`")
		.setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
	)
	
	client.channels.get('681934440888533045').send(new Discord.RichEmbed()
		.setAuthor(message.author.username, message.author.displayAvatarURL)
		.setDescription("registrou uma punição.")
		.addField('Usuario punido:', name)
		.addField('Motivo:', motivo)
		.addField('Provas:', prova)
		.addField('Punição:', tipo)
		.setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
        .setColor('#f83989')
	).then(Sucess => message.channel.send(new Discord.RichEmbed().setFooter('Punição registrada com sucesso.').setColor('#f83989')));
}
