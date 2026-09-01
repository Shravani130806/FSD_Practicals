import { createContext, useContext, useState } from 'react'
import { users as initialUsers } from '../data/users.js'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  // Keep users in state so the provider can later be extended to modify users.
  const [users] = useState(initialUsers)

  // Registration state: holds registered event IDs (shared across app).
  const [registeredEvents, setRegisteredEvents] = useState([1, 3])

  function registerForEvent(eventId) {
    setRegisteredEvents((prev) => (prev.includes(eventId) ? prev : [...prev, eventId]))
  }

  function unregisterFromEvent(eventId) {
    setRegisteredEvents((prev) => prev.filter((id) => id !== eventId))
  }

  return (
    <UserContext.Provider value={{ users, registeredEvents, registerForEvent, unregisterFromEvent }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUsers() {
  return useContext(UserContext)
}
