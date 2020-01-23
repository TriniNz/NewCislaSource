exports.run = async (Discord, thisClient) => {

    const BoleanAutoAtualizeMembersStatus = true
    const BoleanAutoEditStats = true;
    const BoleanAutoConsoleMSG = false;
    const BoleanAutoTabbleEdit = true

    await console.log("\nIniciando.")
    await console.log("Testando a conexão -\n")
    await setTimeout(async () => {console.log("• API response: " + thisClient.ping + "ms."); await startingMSG()}, 2*1000)

    let totalSeconds = (thisClient.uptime / 1000);
    let uptime_d = Math.floor(totalSeconds / 86400);
    let uptime_h = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let uptime_m = Math.floor(totalSeconds / 60);
    let uptime_s = Math.floor(totalSeconds % 60);

    function startingMSG() {

        let time = Date().split(/ +/g);

        console.log("\n\n\n\n\n\n\n\n\n\n")
        console.log("┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────")
        console.log(`│ ${thisClient.user.username} - Iniciado ${time[2]} de ${time[1]}, ${time[3]}, ás ${time[4]}`)
        console.log(`│`)
        console.log(`│ • Status: Online`)
        console.log(`│ • Uptime: ${uptime_d}:${uptime_h}:${uptime_m}:${uptime_s}`)
        console.log(`│`)
        console.log(`│ • Guilds: ${thisClient.guilds.size}               • Usuarios: ${thisClient.users.size}`)
        console.log(`│ • API Response: ${Math.floor(thisClient.ping)}ms`)
        console.log("└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────")
    }

    function AutoEditStats() {
        let status = [
            `Support: ${thisClient.guilds.get("602679739777417256").members.get("429825875467304960").user.tag}`,
            `Cisla Store: www.Cisla.com.br`,
            `IP: Jogar.cisla.com.br`,
            `Eu estou em fase beta! Pode haver muitos bugs.`,
            `Essa é a V2 do CislaSource!`,
            `Estou acordado já faz ${uptime_h}:${uptime_m}:${uptime_s}.`
        ]

        let randomSelect = Math.floor(Math.random() * status.length)

    thisClient.user.setPresence({ status: "idle", game: {name: `${status[randomSelect]}`, type: "streaming", url: `https://www.twitch.tv/ztrininz_`}});

    }

    if(BoleanAutoAtualizeMembersStatus == true) {
        setInterval(() => {
            require('./userEvents/staffAtualize.js').run(Discord, thisClient)
        }, 15 * 1000)
    } else {
        require('./userEvents/staffAtualize.js').run(Discord, thisClient)
    }

    if(BoleanAutoTabbleEdit == true) {
        setInterval(() => {
            require('./userEvents/tabbleEdit.js').run(Discord, thisClient)
        },15 * 1000)
    } else {
        require('./userEvents/tabbleEdit.js').run(Discord, thisClient)
    }

    if(BoleanAutoEditStats == true) {
        setInterval(() => {
            AutoEditStats();
        },15 * 1000)
    } else {
        AutoEditStats()
    }

    if(BoleanAutoConsoleMSG == true) {
        setInterval(() => {
            startingMSG()
        },15 * 1000)
    }

}