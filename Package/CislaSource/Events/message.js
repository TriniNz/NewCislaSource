exports.run = async (Discord, thisClient, message, db, dbcmd, cooldown) => {

    let prefix = "!"

    let ranksys = true
    let devmod = false

    if(message.author.bot) return;
    
    if(message.channel.id == '657721551776514069') return;

    if(message.content.indexOf(">") == 0 && message.channel.id == '657721574056787979') {message.react('✅'); message.react('❎')}

    const args = message.content.trim().split(/ +/g);
    const cmd = args.shift().toLowerCase().replace(prefix, '');

    const cmdValue = dbcmd.get('Commands')

    if(devmod && message.author.id != '429825875467304960' && message.content.indexOf(prefix) == 0) return require('../Commands/Manutenção.js').run(Discord, thisClient, message, args, db);

    if(message.content.indexOf(prefix) != 0 && message.channel.type != "dm" && ranksys) {
        if(!cooldown.has(message.author.id)) {
            
            cooldown.add(message.author.id)

            require('./userEvents/xpsystem.js').run(Discord, thisClient, message, db);
        }
        setTimeout(() => {
            cooldown.delete(message.author.id)   
        }, 3*1000)
    }

    if(message.content.indexOf(prefix) == 0) { 
        try {
            let cmdSearch = cmdValue.find({aliases: [cmd]}).value();

            if(cmdSearch.manutenção) return require('../Commands/Manutenção.js').run(Discord, thisClient, message, args, db);

            let cmdFound = require(`../Commands/${cmdSearch.name}.js`);
            return cmdFound.run(Discord, thisClient, message, args, db, prefix)

        } catch (err) {

            if(err.message === "Cannot read property 'manutenção' of undefined") return message.channel.send(new Discord.RichEmbed()
                .setDescription(`Ops. Este comando não existe! Use _ ${prefix}cmdlist_ para ver todos meus comandos.`)
                .setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
                .setColor('#f83989')
            ).then(cmdNotFound => {cmdNotFound.delete(15*1000); message.delete(15*1000)})

            if(err.message != "Cannot read property 'manutenção' of undefined") console.log(err)
        }
    }    
}
