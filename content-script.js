const observeUrlChange = () => {
  let oldHref = ''
  let oldPlaying = ''
  let oldPlayer = undefined
  let oldTime = -1

  const handleProgressEvent = (event) => {
    if (event.target.currentTime - oldTime > 1 || event.target.currentTime < oldTime) {
      let title = 'unknown'

      try {
        title = document.querySelector("#title>h1>yt-formatted-string").innerHTML
      } catch (error) {}
  
      chrome.runtime.sendMessage({
        type: 'youtube',
        data: oldPlaying,
        current_time: event.target.currentTime,
        duration: event.target.duration,
        title: title
      }, (resp) => {})

      oldTime = event.target.currentTime
    }
  }

  const body = document.querySelector("body")
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href
        const url = new URL(document.location.href)
        if (url !== undefined) {
          if (url.hostname === 'www.youtube.com' && url.pathname === '/watch') {
            let playing = url.searchParams.get('v');
            if (playing !== undefined && playing.length > 0) {
              let video = document.querySelector('video')

              if (video !== undefined) {
                if (oldPlayer !== undefined) {
                  oldPlayer.removeEventListener('timeupdate', handleProgressEvent)
                }
                oldPlaying = playing
                video.addEventListener('timeupdate', handleProgressEvent)
              }

              oldPlayer = video
            }
          }
        }
      }
    })
  })
  observer.observe(body, { childList: true, subtree: true })
}

window.onload = observeUrlChange
