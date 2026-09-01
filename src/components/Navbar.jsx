import { useState } from 'react'
import { useUsers } from '../context/UserContext.jsx'
import { NavLink, Link } from 'react-router-dom'

// Same markup/classes as Practical 1's navbar.js template, converted to JSX.
// NavLink replaces the old manual `active` string comparison — it applies
// its className function automatically based on the current route.
const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
]

function linkClasses({ isActive }) {
  return isActive
    ? 'text-brand-700 font-semibold transition duration-150 text-sm'
    : 'text-slate-600 hover:text-brand-600 transition duration-150 text-sm'
}

export default function Navbar() {
  // Local UI state only (show/hide the mobile menu) — this is the same
  // toggle behaviour the old vanilla nav-toggle button had, just expressed
  // as React state instead of manually adding/removing a "hidden" class.
  const [mobileOpen, setMobileOpen] = useState(false)
  const { registeredEvents } = useUsers() || { registeredEvents: [] }

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm">
            CC
          </span>
          CampusConnect
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              <div className="flex items-center gap-2">
                {link.label}
                {link.to === '/dashboard' && registeredEvents.length > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-rose-500 text-white text-[11px]">{registeredEvents.length}</span>
                )}
              </div>
            </NavLink>
          ))}
        </div>

        <Link to="/login" className="btn-primary hidden md:inline-flex !py-2 !px-4">
          Sign in
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container-page flex flex-col gap-4 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClasses}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/login" className="btn-primary !py-2 !px-4 w-fit" onClick={() => setMobileOpen(false)}>
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
