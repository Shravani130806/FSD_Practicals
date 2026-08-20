import { useState } from 'react'

// Generic reusable controlled-form hook.
//
// This is the same pattern Login.jsx had built directly into itself in
// Step 3 (one useState per field + a hand-written validate/handleSubmit) —
// pulled out so any form (registration, event creation, club creation,
// contact...) can reuse the same values/errors/handleChange/handleSubmit
// shape instead of rewriting it every time.
//
//   const { values, errors, handleChange, handleSubmit, resetForm } =
//     useForm({ email: '', password: '' }, validateFn)
//
// `initialValues` — an object with one key per form field, e.g.
//   { email: '', password: '', role: 'Student' }
//
// `validate` — a function that takes the current `values` and returns an
// errors object, e.g. { email: 'Enter a valid email address.' }. An empty
// object means the form is valid. This keeps the validation RULES with the
// component that owns them (Login.jsx decides what "valid" means), while
// the hook only handles running that function and storing the result.
export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  // One handler for every input, as long as each input has a `name` that
  // matches a key in `values`. This is what lets a single function control
  // email, password, role, or any future field without writing a new
  // setter for each one.
  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  // Returns a submit handler for the form's onSubmit. It runs validation
  // first; only if there are no errors does it call `onValidSubmit` with
  // the current values — the actual "what happens on successful login"
  // logic (simulated delay, redirect, etc.) stays in the component, since
  // that part is NOT generic form behaviour.
  function handleSubmit(onValidSubmit) {
    return function (event) {
      event.preventDefault()
      const nextErrors = validate(values)
      setErrors(nextErrors)

      if (Object.keys(nextErrors).length === 0) {
        onValidSubmit(values)
      }
    }
  }

  function resetForm() {
    setValues(initialValues)
    setErrors({})
  }

  return { values, errors, handleChange, handleSubmit, resetForm }
}
