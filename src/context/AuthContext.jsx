import { createContext, useContext, useState } from 'react'

const TOKEN_KEY = 'campusconnect_token'
const USER_KEY = 'campusconnect_user'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(USER_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  })

  function login(email, role, token = null, profile = null) {
    const nextUser = profile || { email, role }
    setUser(nextUser)
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))

    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }

  const token = localStorage.getItem(TOKEN_KEY)

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
