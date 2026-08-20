// Mock async data service.
//
// This is NOT a real backend. It exists so Home.jsx can call something
// that *behaves* like a network request — a Promise that resolves after a
// short delay — instead of reading the data arrays directly and synchronously.
//
// In Practical 4, only the INSIDE of these two functions changes:
//
//   export async function getEvents() {
//     const res = await fetch('/api/events')
//     return res.json()
//   }
//
// Home.jsx will not need to change at all, because it only ever calls
// getEvents()/getClubs() and awaits a Promise — it never knew whether the
// data came from an in-memory array or a real Express/MongoDB API.

import { events } from '../data/events.js'
import { clubs } from '../data/clubs.js'

const DELAY_MS = 700

/**
 * Resolves with `data` after DELAY_MS, or rejects with an Error if
 * `shouldFail` is true. `shouldFail` exists only so the UI's error state
 * can be demonstrated on demand — a real API call would fail on its own
 * (network error, server error) without needing this flag.
 */
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
  return mockRequest(events, shouldFail)
}

export async function getClubs(shouldFail = false) {
  return mockRequest(clubs, shouldFail)
}
