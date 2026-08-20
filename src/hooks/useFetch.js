import { useState, useEffect } from 'react'

// Generic reusable data-fetching hook.
//
// This is exactly the loading/data/error/try-catch-finally pattern that
// lived directly inside Home.jsx in Step 4 — pulled out so any component
// can reuse it instead of copy-pasting the same useState/useEffect block.
//
//   const { data, loading, error, retry } = useFetch(() => getEvents())
//
// `fetcher` must be a function that returns a Promise (our mock api.js
// functions, or later a real `fetch('/api/...')` call in Practical 4 —
// this hook doesn't care which).
//
// `deps` works like a normal useEffect dependency array: pass in any
// values the fetch depends on (e.g. a URL param) so the hook re-fetches
// when they change. Calling `retry()` re-runs the fetch on demand, without
// needing a new `deps` value — this is how the Retry button works.
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetcher()
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, retryCount])

  function retry() {
    setRetryCount((count) => count + 1)
  }

  return { data, loading, error, retry }
}
