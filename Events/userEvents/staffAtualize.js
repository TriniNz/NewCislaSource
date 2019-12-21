exports.run = async (Discord, thisClient) => {

    let messageID = "658083580567617548"

    let diretores = ['']
    let gerentes = ['']
    let administradores = ['']
    let moderadores = ['']
    let ajudantes = ['']

    let groups = [diretores, gerentes, administradores, moderadores, ajudantes]

    thisClient.guilds.get('657631998634098699').roles.get('657652589403308060').members.map(c => {
        if(thisClient.guilds.get('657631998634098699').roles.get('657652589403308060').members.size <= 0) return;

        let string = ''

        if(c.user.presence.status == "online") {string += "<:presence_on:640907688464744448> " + c.user.username;}
        if(c.user.presence.status == "idle") {string += "<:presence_aus:640907688494104576> " + c.user.username;}
        if(c.user.presence.status == "offline") {string += "<:presence_off:640907688196440106> " + c.user.username;}
        if(c.user.presence.status == "dnd") {string += "<:presence_ocu:640907688460419102> " + c.user.username;}

        diretores.push(string);
    })

    thisClient.guilds.get('657631998634098699').roles.get('657652613525012492').members.map(c => {
        if(thisClient.guilds.get('657631998634098699').roles.get('657652613525012492').members.size <= 0) return;
        let string = ''

        if(c.user.presence.status == "online") {string += "<:presence_on:640907688464744448> " + c.user.username;}
        if(c.user.presence.status == "idle") {string += "<:presence_aus:640907688494104576> " + c.user.username;}
        if(c.user.presence.status == "offline") {string += "<:presence_off:640907688196440106> " + c.user.username;}
        if(c.user.presence.status == "dnd") {string += "<:presence_ocu:640907688460419102> " + c.user.username;}

        gerentes.push(string);
    })

    thisClient.guilds.get('657631998634098699').roles.get('657652607501860875').members.map(c => {
        if(thisClient.guilds.get('657631998634098699').roles.get('657652607501860875').members.size <= 0) return;
        let string = ''

        if(c.user.presence.status == "online") {string += "<:presence_on:640907688464744448> " + c.user.username;}
        if(c.user.presence.status == "idle") {string += "<:presence_aus:640907688494104576> " + c.user.username;}
        if(c.user.presence.status == "offline") {string += "<:presence_off:640907688196440106> " + c.user.username;}
        if(c.user.presence.status == "dnd") {string += "<:presence_ocu:640907688460419102> " + c.user.username;}

        administradores.push(string);
    })

    thisClient.guilds.get('657631998634098699').roles.get('657652608290390036').members.map(c => {
        if(thisClient.guilds.get('657631998634098699').roles.get('657652608290390036').members.size <= 0) return;
        let string = ''

        if(c.user.presence.status == "online") {string += "<:presence_on:640907688464744448> " + c.user.username;}
        if(c.user.presence.status == "idle") {string += "<:presence_aus:640907688494104576> " + c.user.username;}
        if(c.user.presence.status == "offline") {string += "<:presence_off:640907688196440106> " + c.user.username;}
        if(c.user.presence.status == "dnd") {string += "<:presence_ocu:640907688460419102> " + c.user.username;}

        moderadores.push(string);
    })

    thisClient.guilds.get('657631998634098699').roles.get('657652622257422342').members.map(c => {
        if(thisClient.guilds.get('657631998634098699').roles.get('657652622257422342').members.size <= 0) return;
        let string = ''

        if(c.user.presence.status == "online") {string += "<:presence_on:640907688464744448> " + c.user.username;}
        if(c.user.presence.status == "idle") {string += "<:presence_aus:640907688494104576> " + c.user.username;}
        if(c.user.presence.status == "offline") {string += "<:presence_off:640907688196440106> " + c.user.username;}
        if(c.user.presence.status == "dnd") {string += "<:presence_ocu:640907688460419102> " + c.user.username;}

        ajudantes.push(string);
    })

    if(thisClient.guilds.get('657631998634098699').roles.get('657652589403308060').members.size <= 0) diretores.push('Não encontrado.');
    if(thisClient.guilds.get('657631998634098699').roles.get('657652613525012492').members.size <= 0) gerentes.push('Não encontrado.');
    if(thisClient.guilds.get('657631998634098699').roles.get('657652607501860875').members.size <= 0) administradores.push('Não encontrado.');
    if(thisClient.guilds.get('657631998634098699').roles.get('657652608290390036').members.size <= 0) moderadores.push('Não encontrado.');
    if(thisClient.guilds.get('657631998634098699').roles.get('657652622257422342').members.size <= 0) ajudantes.push('Não encontrado.');

    thisClient.channels.get('657721576208203837').fetchMessage(messageID).then(async MsgEdit => {
        MsgEdit.edit(new Discord.RichEmbed()
            .setDescription("A equipe de moderação é composta por <@&657652622257422342>, <@&657652608290390036>, <@&657652607501860875>, <@&657652613525012492>, e <@&657652589403308060>. Segue a lista de membros.")
            .addField(`_Diretores [${thisClient.guilds.get('657631998634098699').roles.get('657652589403308060').members.size}]:_`, diretores)
            .addField(`_Gerentes [${thisClient.guilds.get('657631998634098699').roles.get('657652613525012492').members.size}]:_`, gerentes)
            .addField(`_Administradores [${thisClient.guilds.get('657631998634098699').roles.get('657652607501860875').members.size}]:_`, administradores)
            .addField(`_Moderadores [${thisClient.guilds.get('657631998634098699').roles.get('657652608290390036').members.size}]:_`, moderadores)
            .addField(`_Ajudantes [${thisClient.guilds.get('657631998634098699').roles.get('657652622257422342').members.size}]:_`, ajudantes)
            .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
            .setColor('#f83989')
        )
    })
}