const save_options = () => {
  var key = document.getElementById('api-key').value
  var endpoint = document.getElementById('api-endpoint').value
  var share = document.getElementById('sharing-checkbox').checked === true
  chrome.storage.sync.set({
    'apikey': key,
    'endpoint': endpoint,
    'share': share
  }, () => {
    var sharing_status = document.getElementById('sharing-status')
    if (share === true) {
      sharing_status.innerText = 'Sharing is enabled.'
    } else {
      sharing_status.innerText = 'Sharing is paused.'
    }
    var status = document.getElementById('status')
    status.textContent = 'Options saved.'
    setTimeout(function() {
      status.textContent = ''
    }, 750)
  })
}

const restore_options = () => {
  chrome.storage.sync.get({
    apikey: '',
    endpoint: '',
    share: true
  }, (items) => {
    document.getElementById('api-key').value = items.apikey
    document.getElementById('api-endpoint').value = items.endpoint
    document.getElementById('sharing-checkbox').checked = items.share === true
    var sharing_status = document.getElementById('sharing-status')
    if (items.share === true) {
      sharing_status.innerText = 'Sharing is enabled.'
    } else {
      sharing_status.innerText = 'Sharing is paused.'
    }
  })
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
