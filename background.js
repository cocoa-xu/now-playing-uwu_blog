chrome.runtime.onMessage.addListener((message, _sender, _resp) => {
  chrome.storage.sync.get({
    apikey: '',
    endpoint: ''
  }, (items) => {
    if (((typeof items.apikey === 'string' || items.apikey instanceof String) && items.apikey.length > 0) &&
        ((typeof items.endpoint === 'string' || items.endpoint instanceof String) && items.endpoint.length > 0)) {
      const resp = fetch(items.endpoint, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          apikey: items.apikey,
          type: message.type,
          data: message.data,
          current_time: message.current_time,
          duration: message.duration,
          title: message.title
        })
      })
    }
  })
})
