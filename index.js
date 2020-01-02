const Discord = require('discord.js');
const thisClient = new Discord.Client()

const cooldown = new Set();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('Database.json')
const db = low(adapter)

const cmdadapter = new FileSync('./Events/Commands.json')
const dbcmd = low(cmdadapter)

require('dotenv').config()

thisClient.on('ready', async () => {
    let readyLocal = require('./Events/ready.js')
    return readyLocal.run(Discord, thisClient)
});

thisClient.on('message', async message => {
    let messageLocal = require('./Events/message.js')
    return messageLocal.run(Discord, thisClient, message, db, dbcmd, cooldown)
});

thisClient.on('guildMemberAdd', async member => {
    let memberAddLocal = require('./Events/guildMemberAdd.js')
    return memberAddLocal.run(Discord, thisClient, member, db)
});

thisClient.on('guildMemberRemove', async member => {
    let memberRemoveLocal = require('./Events/guildMemberRemove.js')
    return memberRemoveLocal.run(Discord, thisClient, member, db)
});


thisClient.login(process.env.SECRET);
