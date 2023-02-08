const save_options = () => {
  var key = document.getElementById('api-key').value
  var endpoint = document.getElementById('api-endpoint').value
  chrome.storage.sync.set({
    'apikey': key,
    'endpoint': endpoint
  }, () => {
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
    endpoint: ''
  }, (items) => {
    document.getElementById('api-key').value = items.apikey
    document.getElementById('api-endpoint').value = items.endpoint
  })
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)
