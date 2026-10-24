import { clubs } from '../data/clubs.js'
import { events as fallbackEvents } from '../data/events.js'

const DELAY_MS = 700
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function mockRequest(data, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Network error (simulated)'))
      } else {
        resolve(data)
      }
    }, DELAY_MS)
  })
}

function getJsonError(response, fallbackMessage) {
  return response.text().then((text) => {
    try {
      const payload = JSON.parse(text)
      return payload.message || payload.error || fallbackMessage
    } catch {
      return text || fallbackMessage
    }
  })
}

function getAuthHeaders(token) {
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export async function getEvents(shouldFail = false) {
  const hasApiUrl = Boolean(import.meta.env.VITE_API_URL)

  if (!hasApiUrl) {
    return mockRequest(fallbackEvents, shouldFail)
  }

  const response = await fetch(`${API_BASE_URL}/api/events`)
  if (!response.ok) {
    const message = await getJsonError(response, 'Failed to load events')
    throw new Error(message)
  }

  return response.json()
}

export async function getClubs() {
  return mockRequest(clubs, false)
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password }),
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'Login failed')
  }

  return payload
}

export async function registerUser({ name, email, password, role }) {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, email, password, role }),
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'Registration failed')
  }

  return payload
}

export async function getProfile(token) {
  const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload.message || 'Unable to fetch profile')
  }

  return payload
}
