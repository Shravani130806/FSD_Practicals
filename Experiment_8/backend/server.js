const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const PORT = 5002
const FRONTEND_ORIGIN = 'http://localhost:5174'

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  }),
)

const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('chatMessage', (message) => {
    if (!message || !message.username || !message.message) {
      return
    }

    const payload = {
      username: String(message.username).trim(),
      message: String(message.message).trim(),
    }

    console.log('Received message:', payload)
    io.emit('chatMessage', payload)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`)
})
