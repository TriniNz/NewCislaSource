exports.run = async (Discord, client, music) => {

  setTimeout(() => console.log("\x1b[36m", "CislaMusic - OK! Ping: " + Math.floor(client.ping) + "MS", "\x1b[37m"), 3*1000)

    setInterval(() => {
      if(music.playlist) client.user.setPresence({ status: "idle", game: {name: `Estou tocando: ${music.playlist[0].title}`, type: "streaming", url: `https://www.twitch.tv/ztrininz_`}})
      else client.user.setPresence({ status: "idle", game: {name: `Vamos escutar um batidão?`, type: "streaming", url: `https://www.twitch.tv/ztrininz_`}})
      
    }, 10*1000)
}