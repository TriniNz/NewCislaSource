exports.run = async (Discord, thisClient) => {

    const BoleanAutoAtualizeMembersStatus = true
    const BoleanAutoEditStats = true;
    const BoleanAutoConsoleMSG = false;
    const BoleanAutoTabbleEdit = true

    setTimeout(() => console.log("CislaSource - OK!" + Math.floor(thisClient.ping)))

    function AutoEditStats() {

        let totalSeconds = (thisClient.uptime / 1000);
        let uptime_d = Math.floor(totalSeconds / 86400);
        let uptime_h = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let uptime_m = Math.floor(totalSeconds / 60);
        let uptime_s = Math.floor(totalSeconds % 60);

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
}