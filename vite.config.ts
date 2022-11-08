// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import Express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import IOClient from 'socket.io-client'
import { readFile } from 'node:fs/promises'

const SOCKET_URI = 'ws://localhost:3030'
// const SOCKET_URI = 'https://c2gh56-3030.sse.codesandbox.io'
// const SOCKET_URI = 'wss://nodemon-n6nrt7--3030.local-credentialless.webcontainer.io'

const app = Express()
const server = http.createServer(app)
const io = new Server(server, {
  transports: ['websocket'],
  cors: {
    origin: '*'
  }
})

const sleep = (s: number) =>
  new Promise((a) => {
    setTimeout(() => a(true), Math.floor(s * 1000))
  })

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chat message', (msg) => {
    console.log('chat message:', msg)
    io.emit('chat message', msg)
  })
})

app.use(Express.static('dist'))


declare global {
  var EXPRESS_SERVER: http.Server
}

// https://vitejs.dev/config/#async-config
export default defineConfig(async ({ command }) => {
  if (globalThis.EXPRESS_SERVER) {
    globalThis.EXPRESS_SERVER.close()
  }
  if (command !== 'build') {
    server.listen(3030, async () => {
      globalThis.EXPRESS_SERVER = server
      console.log('listening...')
      const timeout = 3000
      const socket = IOClient(SOCKET_URI, {
        transports: ['websocket'],
        autoConnect: false,
        reconnection: false,
        timeout
      })
      await sleep(2)
      console.log(
        `Attempting to connect node chatbot with a ${timeout}ms timeout...`
      )
      socket.connect()
      socket.on('connect_error', (err) => {
        console.log(
          err.message,
          '\nCHATBOT FAILS IN STACKBLITZ DUE TO BROKEN WS SUPPORT'
        )
      })

      socket.on('connect', () => {
        console.log('Connected!')
        socket.emit('chat message', 'Message from Node.js client!!!')
      })
    })

  }

  return {
    plugins: []
  }
})
