import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const roles = ['Student', 'Organizer', 'Admin']

export default function Login() {
  const navigate = useNavigate()

  // Controlled input state — each field's current value lives here, and
  // every <input>'s `value` prop reads from it while `onChange` writes back.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Student')
  const [showPassword, setShowPassword] = useState(false)

  // Validation messages, keyed by field name, populated only on submit.
  const [errors, setErrors] = useState({})

  // 'idle' | 'submitting' | 'success' — drives the button label/disabled
  // state and the success banner. No real backend call yet: submitting
  // just simulates a short delay, exactly like Practical 1's login.js did.
  const [submitStatus, setSubmitStatus] = useState('idle')

  function validate() {
    const nextErrors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }
    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSubmitStatus('submitting')
    // Simulated auth call — Practical 6 replaces this with a real JWT login request.
    setTimeout(() => {
      setSubmitStatus('success')
      setTimeout(() => navigate('/dashboard'), 700)
    }, 900)
  }

  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-brand-50 to-surface-muted py-16">
      <div className="container-page">
        <div className="max-w-md mx-auto card p-8 animate-fade-up">
          <div className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white text-lg font-bold mx-auto">
              CC
            </span>
            <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-500">Sign in to manage your events and clubs.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <label className="form-label" htmlFor="email">College email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@college.edu"
                autoComplete="email"
                className={`input-field ${errors.email ? '!border-rose-400 focus:!ring-rose-500/30' : ''}`}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
            </div>

            <div>
              <label className="form-label" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`input-field pr-16 ${errors.password ? '!border-rose-400 focus:!ring-rose-500/30' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((show) => !show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-brand-600 hover:text-brand-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
            </div>

            <div>
              <label className="form-label" htmlFor="role">I am signing in as</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-field"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                Remember me
              </label>
              <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">Forgot password?</a>
            </div>

            {submitStatus === 'success' && (
              <p className="badge-success !text-sm !px-4 !py-2 w-full justify-center">
                Signed in as {role}! Redirecting to your dashboard…
              </p>
            )}

            <button type="submit" disabled={submitStatus !== 'idle'} className="btn-primary w-full">
              {submitStatus === 'submitting' ? 'Signing in…' : submitStatus === 'success' ? 'Signed in ✓' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            New to CampusConnect?{' '}
            <a href="#" className="text-brand-600 font-medium hover:text-brand-700">Create an account</a>
          </p>
        </div>
      </div>
    </main>
  )
}
