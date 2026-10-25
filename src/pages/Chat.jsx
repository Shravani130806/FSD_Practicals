import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

export default function Chat() {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState(SOCKET_URL ? 'connecting' : 'error')
  const [error, setError] = useState(
    SOCKET_URL
      ? ''
      : 'Chat is not configured yet. Add VITE_SOCKET_URL in your local .env.local, such as http://localhost:5002, before testing locally.',
  )
  const socketRef = useRef(null)

  useEffect(() => {
    if (!SOCKET_URL) {
      setStatus('error')
      setError(
        'Chat is not configured yet. Add VITE_SOCKET_URL in your local .env.local, such as http://localhost:5002, before testing locally.',
      )
      return undefined
    }

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
    })

    socketRef.current = socket

    const handleConnect = () => {
      setStatus('connected')
      setError('')
    }

    const handleDisconnect = () => {
      setStatus('connecting')
    }

    const handleConnectError = () => {
      setStatus('error')
      setError(`Unable to connect to the chat server. Check VITE_SOCKET_URL: ${SOCKET_URL}`)
    }

    const handleChatMessage = (payload) => {
      if (!payload || !payload.username || !payload.message) {
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          username: String(payload.username).trim(),
          message: String(payload.message).trim(),
        },
      ])
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('connect_error', handleConnectError)
    socket.on('chatMessage', handleChatMessage)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('connect_error', handleConnectError)
      socket.off('chatMessage', handleChatMessage)
      socket.disconnect()
      socketRef.current = null
    }
  }, [SOCKET_URL])

  const handleSend = (event) => {
    event.preventDefault()

    const trimmedUsername = username.trim()
    const trimmedMessage = message.trim()

    if (!trimmedUsername || !trimmedMessage || !socketRef.current || status !== 'connected') {
      return
    }

    socketRef.current.emit('chatMessage', {
      username: trimmedUsername,
      message: trimmedMessage,
    })

    setMessage('')
  }

  const statusConfig = {
    connecting: {
      label: 'Connecting…',
      classes: 'bg-amber-50 text-amber-700',
    },
    connected: {
      label: 'Connected',
      classes: 'bg-emerald-50 text-emerald-700',
    },
    error: {
      label: 'Connection error',
      classes: 'bg-rose-50 text-rose-700',
    },
  }

  const statusMeta = statusConfig[status] || statusConfig.connecting

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-brand-50 to-surface-muted py-12">
      <div className="container-page">
        <div className="mx-auto max-w-5xl card p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">CampusConnect</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Live Chat</h1>
              <p className="mt-2 text-sm text-slate-500">
                Real-time messages are broadcast through the configured Socket.IO server.
              </p>
            </div>

            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusMeta.classes}`}>
              {statusMeta.label}
            </span>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div className="card bg-slate-50 p-4">
              <label htmlFor="username" className="form-label">Your name</label>
              <input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="Enter your name"
                className="input-field"
              />

              <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
                <p className="font-medium text-slate-800">Connection</p>
                <p className="mt-1">{statusMeta.label}</p>
              </div>
            </div>

            <div className="card p-4 md:p-5">
              <div className="flex h-[420px] flex-col">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h2 className="text-xl font-semibold text-slate-900">Messages</h2>
                  <span className="text-sm text-slate-500">{messages.length} total</span>
                </div>

                <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1" aria-live="polite">
                  {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
                      No messages yet. Start the conversation.
                    </div>
                  ) : (
                    messages.map((item, index) => (
                      <div key={`${item.username}-${index}`} className="rounded-2xl bg-slate-50 px-3 py-2">
                        <p className="text-sm font-semibold text-slate-800">{item.username}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleSend} className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Type a message"
                    className="input-field flex-1"
                    disabled={status !== 'connected'}
                  />
                  <button
                    type="submit"
                    className="btn-primary shrink-0"
                    disabled={status !== 'connected'}
                  >
                    {status === 'connected' ? 'Send' : 'Connecting'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
