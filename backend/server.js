require('dotenv').config({ path: __dirname + '/.env' })

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()
const PORT = process.env.PORT || 5001

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many requests, please try again later.',
  },
})

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(apiLimiter)

app.get('/', (req, res) => {
  res.json({ message: 'CampusConnect API is Running' })
})

app.use('/api/events', eventRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is missing. Add your MongoDB Atlas connection string to backend/.env')
      process.exit(1)
    }

    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

startServer()
