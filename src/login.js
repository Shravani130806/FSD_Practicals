import './styles/main.css'
import { renderNavbar, initNavbar } from './components/navbar.js'
import { renderFooter } from './components/footer.js'
import { $ } from './utils/dom.js'
import { showToast } from './utils/toast.js'

document.getElementById('navbar').innerHTML = renderNavbar('login')
document.getElementById('footer').innerHTML = renderFooter()
initNavbar()

const form = $('#login-form')
const emailInput = $('#email')
const passwordInput = $('#password')
const submitBtn = $('#login-submit')

function setError(field, show) {
  const errorEl = document.querySelector(`[data-error-for="${field}"]`)
  const inputEl = field === 'email' ? emailInput : passwordInput
  errorEl?.classList.toggle('hidden', !show)
  inputEl?.classList.toggle('border-rose-400', show)
  inputEl?.classList.toggle('focus:ring-rose-500/30', show)
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const emailValid = isValidEmail(emailInput.value.trim())
  const passwordValid = passwordInput.value.length >= 6

  setError('email', !emailValid)
  setError('password', !passwordValid)

  if (!emailValid || !passwordValid) {
    showToast('Please fix the highlighted fields.', 'error')
    return
  }

  submitBtn.disabled = true
  submitBtn.textContent = 'Signing in…'

  // Simulated auth call — Practical 4 wires this up to a real backend.
  setTimeout(() => {
    showToast('Signed in successfully! Redirecting…', 'success')
    setTimeout(() => {
      window.location.href = '/dashboard.html'
    }, 700)
  }, 900)
})

;[emailInput, passwordInput].forEach((input) => {
  input.addEventListener('input', () => {
    setError(input.id, false)
  })
})
