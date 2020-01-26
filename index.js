//Controle

//true = ligado | false = desligado.
const CislaSource = true
const CislaMusic = true
const CislaProtect = true

//Site
const express = require("express");
const app = express();

app.use(express.static("/app/Package/CislaSite/public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/Package/CislaSite/views/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Site iniciado na porta: " + listener.address().port + "\n\n");
});

//BOTS
const Discord = require('discord.js')


const cooldown = new Set();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('Database.json')
const db = low(adapter)

const cmdadapter = new FileSync('./Package/CislaSource/Events/Commands.json')
const dbcmd = low(cmdadapter)

require('dotenv').config()


const Client_CislaSource = new Discord.Client();

Client_CislaSource.on('ready', async () => {
    let thisClient = Client_CislaSource;
  
    let readyLocal = require('./Package/CislaSource/Events/ready.js')
    return readyLocal.run(Discord, thisClient)
});

Client_CislaSource.on('message', async message => {
    let thisClient = Client_CislaSource;
  
    let messageLocal = require('./Package/CislaSource/Events/message.js')
    return messageLocal.run(Discord, thisClient, message, db, dbcmd, cooldown)
});

Client_CislaSource.on('guildMemberAdd', async member => {
    let thisClient = Client_CislaSource;
  
    let memberAddLocal = require('./Package/CislaSource/Events/guildMemberAdd.js')
    return memberAddLocal.run(Discord, thisClient, member, db)
});

Client_CislaSource.on('guildMemberRemove', async member => {
    let thisClient = Client_CislaSource;
  
    let memberRemoveLocal = require('./Package/CislaSource/Events/guildMemberRemove.js')
    return memberRemoveLocal.run(Discord, thisClient, member, db)
});

if(CislaSource) Client_CislaSource.login(process.env.Token_CislaSource);

//-------------//

const Client_CislaMusic = new Discord.Client();

let music = new Map()

Client_CislaMusic.on('ready', async () => {
    let client = Client_CislaMusic;
  
    let readyLocal = require('./Package/CislaMusic/Events/ready.js')
        return readyLocal.run(Discord, client, music)
    });

    Client_CislaMusic.on('message', async message => {
        let client = Client_CislaMusic;
  
        let messageLocal = require('./Package/CislaMusic/Events/message.js')
        return messageLocal.run(Discord, client, message, music)
    });    

if(CislaMusic) Client_CislaMusic.login(process.env.Token_CislaMusic)

//-------------//

const Client_CislaProtect = new Discord.Client();


Client_CislaProtect.on('ready', async () => {
    let client = Client_CislaProtect
    
    let readyLocal = require('./Package/CislaProtect/Events/ready.js')
    return readyLocal.run(Discord, client)
});

Client_CislaProtect.on('guildMemberAdd', async member => {
    let client = Client_CislaProtect
    
    let memberAddLocal = require('./Package/CislaProtect/Events/guildMemberAdd.js')
    return memberAddLocal.run(Discord, client, member)
});

Client_CislaProtect.on('raw', async raw => {
    let client = Client_CislaProtect
    
    let memberAddLocal = require('./Package/CislaProtect/Events/raw.js')
    return memberAddLocal.run(Discord, client, raw)
});

Client_CislaProtect.on('message', message => {
    let client = Client_CislaProtect

    let infoCislaSource = Client_CislaSource.ping;
    let infoCislaMusic = Client_CislaMusic.ping;
    let infoCislaProtect = Client_CislaProtect.ping;

    if(infoCislaSource == "NaN") infoCislaSource = "OFF, :("; else infoCislaSource = `ON! ${infoCislaSource}ms.`;
    if(infoCislaMusic == "NaN") infoCislaMusic = "OFF, :("; else infoCislaMusic = `ON! ${infoCislaMusic}ms.`;
    if(infoCislaProtect == "NaN") infoCislaProtect = "OFF, :("; else infoCislaProtect = `ON! ${infoCislaProtect}ms.`;

    const OS = require('os')
    const cpuStat = require('cpu-stat');

    if(message.content.toLowerCase() == "+system") {

        cpuStat.usagePercent(function(err, percent, seconds) {
            if (err) message.channel.send("Ops... Houve um erro inesperado.")

            message.channel.send(new Discord.RichEmbed()
                .setDescription(`**Status do sistema:**\n • CislaSource: ${infoCislaSource}\n• CislaMusic: ${infoCislaMusic}\n• CislaProtect: ${infoCislaProtect}\n\n **Infomações do sistema:**\n• CPU: ${Math.floor(percent)}% Utilizado. \n• RAM: ${Math.floor(OS.freemem()/OS.totalmem()*100)}% Utilizado.`)
                .setColor('#f83989')
                .setTimestamp(new Date())
            ) 
        });
    }
})

if(CislaProtect) Client_CislaProtect.login(process.env.Token_CislaProtect)

//-------------//