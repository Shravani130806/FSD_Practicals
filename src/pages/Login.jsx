import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm.js'
import { useAuth } from '../context/AuthContext.jsx'

const roles = ['Student', 'Organizer', 'Admin']

// Validation rules live here, in the component, not inside useForm — the
// hook only knows how to RUN a validate function, not what "valid" means
// for this particular form. A registration form would pass its own.
function validateLogin(values) {
  const errors = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }
  return errors
}

export default function Login() {
  const navigate = useNavigate()

  // Reusable form logic — values, errors, handleChange, handleSubmit —
  // comes from useForm. This is the same values/errors/handleChange shape
  // a future registration/event-creation/club-creation form would reuse.
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: '', password: '', role: 'Student' },
    validateLogin,
  )

  // UI-specific state stays OUTSIDE useForm — neither of these is "form
  // data", they're presentation concerns specific to this one screen:
  //   showPassword   — a visibility toggle, not a field value
  //   submitStatus   — drives button label/animation for this simulated
  //                    login; a registration form might not even have this
  const [showPassword, setShowPassword] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')

  const { login } = useAuth()

  // This runs only after useForm's handleSubmit confirms validation
  // passed — it's the part that's genuinely specific to "logging in",
  // so it lives in the component instead of the generic hook.
  function onValidSubmit() {
    setSubmitStatus('submitting')
    // Simulated auth call — Practical 6 replaces this with a real JWT login request.
    setTimeout(() => {
      setSubmitStatus('success')
      // Update shared auth context with the demo user
      login(values.email, values.role)
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

          <form onSubmit={handleSubmit(onValidSubmit)} className="mt-8 space-y-5" noValidate>
            <div>
              <label className="form-label" htmlFor="email">College email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
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
                name="role"
                value={values.role}
                onChange={handleChange}
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
                Signed in as {values.role}! Redirecting to your dashboard…
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
