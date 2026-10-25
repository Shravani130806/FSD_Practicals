import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm.js'
import { registerUser } from '../services/api.js'

const roles = [
  { value: 'student', label: 'Student' },
  { value: 'organizer', label: 'Organizer' },
  { value: 'admin', label: 'Admin' },
]

function validateRegister(values) {
  const errors = {}

  if (!values.name || !values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid college email address.'
  }

  if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  if (!values.role) {
    errors.role = 'Please select a role.'
  }

  return errors
}

export default function Register() {
  const navigate = useNavigate()
  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: '', email: '', password: '', role: 'student' },
    validateRegister,
  )

  const [showPassword, setShowPassword] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  async function onValidSubmit(formValues) {
    setSubmitStatus('submitting')
    setSubmitError('')

    try {
      await registerUser({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
        role: String(formValues.role).toLowerCase(),
      })

      setSubmitStatus('success')
      setTimeout(() => navigate('/login'), 1000)
    } catch (error) {
      setSubmitStatus('error')
      setSubmitError(error.message)
    }
  }

  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-b from-brand-50 to-surface-muted py-16">
      <div className="container-page">
        <div className="max-w-md mx-auto card p-8 animate-fade-up">
          <div className="text-center">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white text-lg font-bold mx-auto">
              CC
            </span>
            <h1 className="mt-4 text-2xl font-bold">Create your account</h1>
            <p className="mt-1 text-sm text-slate-500">Join CampusConnect and start exploring events and clubs.</p>
          </div>

          <form onSubmit={handleSubmit(onValidSubmit)} className="mt-8 space-y-5" noValidate>
            <div>
              <label className="form-label" htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                placeholder="Your full name"
                autoComplete="name"
                className={`input-field ${errors.name ? '!border-rose-400 focus:!ring-rose-500/30' : ''}`}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
            </div>

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
                  autoComplete="new-password"
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
              <label className="form-label" htmlFor="role">I am joining as</label>
              <select
                id="role"
                name="role"
                value={values.role}
                onChange={handleChange}
                className={`input-field ${errors.role ? '!border-rose-400 focus:!ring-rose-500/30' : ''}`}
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
              {errors.role && <p className="mt-1 text-xs text-rose-600">{errors.role}</p>}
            </div>

            {submitStatus === 'success' && (
              <p className="badge-success !text-sm !px-4 !py-2 w-full justify-center">
                Account created successfully! Redirecting to sign in…
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="badge-warning !text-sm !px-4 !py-2 w-full justify-center">
                {submitError || 'Unable to create your account.'}
              </p>
            )}

            <button type="submit" disabled={submitStatus === 'submitting'} className="btn-primary w-full">
              {submitStatus === 'submitting' ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-medium hover:text-brand-700">Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
