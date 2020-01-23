//Controle

//true = ligado | false = desligado.
const CislaSource = true
const CislaMusic = false
const CislaProtect = false

//Site
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/package/views/index.html");
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Site iniciado na porta: " + listener.address().port);
});

//BOTS
const Discord = require('discord.js')


const cooldown = new Set();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//const adapter = new FileSync('Database.json')
//const db = low(adapter)

//const cmdadapter = new FileSync('')
//const dbcmd = low(cmdadapter)

require('dotenv').config()


const Client_CislaSource = new Discord.Client();

let thisClient = Client_CislaSource;

thisClient.on('ready', async () => {
    let readyLocal = require('./Package/CislaSource/Events/ready.js')
    return readyLocal.run(Discord, thisClient)
});

thisClient.on('message', async message => {
    let messageLocal = require('./Package/CislaSource/Events/message.js')
    return messageLocal.run(Discord, thisClient, message, db, dbcmd, cooldown)
});

thisClient.on('guildMemberAdd', async member => {
    let memberAddLocal = require('./Package/CislaSource/Events/guildMemberAdd.js')
    return memberAddLocal.run(Discord, thisClient, member, db)
});

thisClient.on('guildMemberRemove', async member => {
    let memberRemoveLocal = require('./Package/CislaSource/Events/guildMemberRemove.js')
    return memberRemoveLocal.run(Discord, thisClient, member, db)
});

if(CislaSource) Client_CislaSource.login(process.env.Token_CislaSource);

//-------------//

const Client_CislaMusic = new Discord.Client();

let music = new Map()

let client = Client_CislaMusic;

client.on('ready', async () => {
    let readyLocal = require('./Package/CislaMusic/Events/ready.js')
    return readyLocal.run(Discord, client, music)
});

client.on('message', async message => {
    let messageLocal = require('./Package/CislaMusic/Events/message.js')
    return messageLocal.run(Discord, client, message, music)
});    

if(CislaMusic) Client_CislaMusic.login(process.env.Token_CislaMusic)

//-------------//

const Client_CislaProtect = new Discord.Client();

let client = Client_CislaProtect

thisClient.on('ready', async () => {
    let readyLocal = require('./Package/CislaProtect/Events/ready.js')
    return readyLocal.run(Discord, thisClient)
});

thisClient.on('guildMemberAdd', async member => {
    let memberAddLocal = require('./Package/CislaProtect/Events/guildMemberAdd.js')
    return memberAddLocal.run(Discord, client, member)
});

thisClient.on('raw', async raw => {
    let memberAddLocal = require('./Package/CislaProtect/Events/raw.js')
    return memberAddLocal.run(Discord, client, raw)
});

if(CislaProtect) Client_CislaProtect.login(process.env.Token_CislaProtect)

//-------------//