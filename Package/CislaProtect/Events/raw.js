exports.run = async (Discord, client, raw) => {
    const MessageID = "658005971553222656"
    const EmojiMessage = "✅"
    const RemoveRoleID = "657652606646222861"
    const AdcRoleID = "657652601487228952"

    if(raw.t == "MESSAGE_REACTION_ADD") {
        if(client.users.get(raw.d.user_id).bot) return;
        if(raw.d.emoji.name != EmojiMessage) return;
        if(raw.d.message_id != MessageID) return;

        let author = client.guilds.get(raw.d.guild_id).members.get(raw.d.user_id);
        let roleRemove = client.guilds.get(raw.d.guild_id).roles.get(RemoveRoleID);
        let RoleAdc = client.guilds.get(raw.d.guild_id).roles.get(AdcRoleID);

        author.removeRole(roleRemove);
        author.addRole(RoleAdc);

        author.send(new Discord.RichEmbed()
            .setDescription("Sua conta foi verificada com sucesso. Agora já pode desfrutar de todo nosso conteudo.")
            .setColor('#f83989')
            .setFooter('CislaProtect ©', client.user.displayAvatarURL)
        ).catch(() => {})

        client.channels.get('658350015181357057').send(`${author} foi verificado.`);

    }

}