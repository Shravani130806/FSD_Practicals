import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

const BACKEND_URL = 'http://localhost:5002'

function App() {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)

  useEffect(() => {
    const socket = io(BACKEND_URL, {
      transports: ['websocket'],
    })

    socketRef.current = socket

    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)
    const handleChatMessage = (payload) => {
      setMessages((prev) => [...prev, payload])
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('chatMessage', handleChatMessage)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('chatMessage', handleChatMessage)
      socket.disconnect()
    }
  }, [])

  const handleSend = (event) => {
    event.preventDefault()

    const trimmedUsername = username.trim()
    const trimmedMessage = message.trim()

    if (!trimmedUsername || !trimmedMessage || !socketRef.current) {
      return
    }

    const payload = {
      username: trimmedUsername,
      message: trimmedMessage,
    }

    socketRef.current.emit('chatMessage', payload)
    setMessage('')
  }

  return (
    <div className="app-shell">
      <div className="chat-box">
        <h1>Real-Time Chat Application</h1>

        <div className="status-row">
          <span className={`status-dot ${isConnected ? 'online' : 'offline'}`} />
          <span className="status-text">{isConnected ? 'Connected' : 'Connecting...'}</span>
        </div>

        <form onSubmit={handleSend} className="chat-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="input-box"
          />

          <div className="message-row">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="input-box"
            />
            <button type="submit" className="send-btn">Send</button>
          </div>
        </form>

        <div className="message-list">
          {messages.length === 0 ? (
            <p className="empty-state">No messages yet. Start the conversation.</p>
          ) : (
            messages.map((item, index) => (
              <div key={`${item.username}-${index}`} className="message-item">
                <strong>{item.username}:</strong> {item.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
