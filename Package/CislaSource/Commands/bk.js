const PastebinAPI = require('pastebin-js')


exports.run = async (Discord, thisClient, message, args) => {

    let client = thisClient

    if(message.author.id !== "429825875467304960") {
        return message.channel.send("Este é um comando privado aos desenvolvedores.").then(msg => msg.delete(15*3000))
    }
    var time = Date().split(/ +/g);

    let pastebin = new PastebinAPI({
    'api_dev_key' : process.env.TOKENAPI,
    });

    pastebin
    .createPasteFromFile("./Database.json", `Backup - DataBase • ${time[2]} de ${time[1]}, ${time[3]}, ás ${time[4]}`, null, 1, "N")
    .then(function (data) {
        let embed = new Discord.RichEmbed()
            .setDescription(`DataBase copiada com sucesso. Backup foi enviado no seu privado.`)
            .setColor("#6699FF")
            .setFooter("Cisla ©")
            .setTimestamp(new Date())
        message.channel.send(embed).then(msg => msg.delete(15*1000))

        message.author.send("Backup database. " + data)
        console.log(data);
    })
    .fail(function (err) {
        console.log(err);
    });

}