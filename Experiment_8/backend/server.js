const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const PORT = Number(process.env.PORT) || 5002
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  ...String(process.env.FRONTEND_ORIGIN || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
]

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST'],
  credentials: true,
}

app.use(cors(corsOptions))

const io = new Server(server, {
  cors: corsOptions,
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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`WebSocket server running on port ${PORT}`)
})
