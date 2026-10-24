// Mock async data service with production-ready env support.
//
// This project currently uses local demo data so the UI still works without a
// running backend. When VITE_API_URL is configured, the same functions can call
// the real backend instead of the mock arrays.

import { events } from '../data/events.js'
import { clubs } from '../data/clubs.js'

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

export async function getEvents(shouldFail = false) {
  const hasApiUrl = Boolean(import.meta.env.VITE_API_URL)

  if (!hasApiUrl) {
    return mockRequest(events, shouldFail)
  }

  const response = await fetch(`${API_BASE_URL}/api/events`)
  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`)
  }

  return response.json()
}

export async function getClubs(shouldFail = false) {
  const hasApiUrl = Boolean(import.meta.env.VITE_API_URL)

  if (!hasApiUrl) {
    return mockRequest(clubs, shouldFail)
  }

  const response = await fetch(`${API_BASE_URL}/api/clubs`)
  if (!response.ok) {
    throw new Error(`Failed to fetch clubs: ${response.status}`)
  }

  return response.json()
}
