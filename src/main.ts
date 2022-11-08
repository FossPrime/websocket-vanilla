import io from 'socket.io-client'

// const SOCKET_URI = 'https://c2gh56-3030.sse.codesandbox.io'
const SOCKET_URI = location.origin
  .replace('3000', '3030')
  .replace('.sse.', '-3030.sse.')

var socket = io(SOCKET_URI, {
  transports: ['websocket'],
  port: 3030
})

var messages =
  (document.getElementById('messages') as HTMLUListElement) || document
var form = (document.getElementById('form') as HTMLFormElement) || document
var input = (document.getElementById('input') as HTMLInputElement) || Document

form.addEventListener('submit', function (e) {
  e.preventDefault()
  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})

socket.on('chat message', function (msg) {
  var item = document.createElement('li')
  item.textContent = msg
  messages.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})
