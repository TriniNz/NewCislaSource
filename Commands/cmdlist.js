const list = require('../Events/Commands.json');

exports.run = async (Discord, thisClient, message, args, db, prefix) => {

    var testArray = []

    for(var i = 0; i < list.Commands.length; i++) {
            let edit = "'" +  list.Commands[i].aliases + "'"
            let edit1 = edit.replace(/'+/g, '*')
            let edit2 = edit1.replace(/,+/g, ` - ${prefix}`)
        
             testArray.push(`*${i + 1}*. **${list.Commands[i].name}**\n⠀• _Descrição:_ ${list.Commands[i].descrição}\n⠀• _Utilização:_ ${prefix}${list.Commands[i].uso}\n⠀• _Metodos de uso:_ ${prefix}${edit2}\n\n`)
    }

    var comandos = subDividir(testArray, 5)

    let paginaAtual = 0

    function subDividir(array = [], quantidade = 5) { // Essa é uma função que divide um array em um array, basicamente você vai passar 2 paramêtros o array a ser divido e a quantiade máxima de elementos em cad array, e ele vai divdir esse array e vai retornar um array com esse array divido, se tu não entender só testa a função que tu vai entender
        let index = 0;
        let counter = 0;
        let newArray = [];
            newArray.push([]);
            while(newArray[index].length <= quantidade && array[counter]) {
                newArray[index].push(array[counter]);
                counter++;
                if(newArray[index].length + 1 > quantidade) {
                    index++;
                    newArray.push([])
                }
            }
            for(let i in newArray) {
                if(newArray[i].length === 0) {
                    newArray.splice(i, 1)
                }
            }
        return newArray
    }

    let embed = new Discord.RichEmbed()
            .setDescription(`Olá ${message.author}, atualmente tenho ${list.Commands.length} comandos, aqui vai a lista de deles:\n\n${comandos[paginaAtual].join('\n')}`)
            setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
            .setColor('#f83989')
            .setTimestamp(new Date())
    message.channel.send(embed).then(async m => { 
        m.delete(360*1000); message.delete(360*1000)

    await m.react("⬅")
    await m.react("➡")

        const nextp = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
        const collectnext = m.createReactionCollector(nextp, { time: 360*1000 });

        const antp = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
        const collectant = m.createReactionCollector(antp, { time: 360*1000 });

    collectant.on("collect", async r => {
            if(comandos[paginaAtual - 1]) {
                paginaAtual -= 1
                let proxant = new Discord.RichEmbed()
                    .setDescription(`Olá ${message.author}, atualmente tenho ${list.Commands.length} comandos, aqui vai a lista de deles:\n\n${comandos[paginaAtual].join("\n")}`)
                    setFooter('CislaSource ©', thisClient.user.displayAvatarURL)
                    .setColor('#f83989')
                    .setTimestamp(new Date())
                await m.edit(proxant)
                r.remove(message.author)

                
            }
        });

    collectnext.on("collect", async r => {
        if(comandos[paginaAtual + 1]) {
            paginaAtual += 1
            let proxpage = new Discord.RichEmbed()
                .setDescription(`Olá ${message.author}, atualmente tenho ${list.Commands.length} comandos, aqui vai a lista de deles:\n\n${comandos[paginaAtual].join("\n")}`)
                .setColor("#6699FF")
                .setFooter("Cisla ©")
                .setTimestamp(new Date())
            await m.edit(proxpage)
            r.remove(message.author)

            
        }
    })
    })  
}
    