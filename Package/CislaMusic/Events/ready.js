exports.run = async (Discord, client, music) => {

    setInterval(() => {
      if(music.playlist) client.user.setPresence({ status: "idle", game: {name: `Estou tocando: ${music.playlist[0].title}`, type: "streaming", url: `https://www.twitch.tv/ztrininz_`}})
      else client.user.setPresence({ status: "idle", game: {name: `Vamos escutar um batidão?`, type: "streaming", url: `https://www.twitch.tv/ztrininz_`}})
      
    }, 10*1000)
}