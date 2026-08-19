import { Link } from 'react-router-dom'

// Direct JSX conversion of Practical 1's footer.js template — same classes,
// same content, hrefs now use React Router's <Link> instead of full page reloads.
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="container-page py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">© 2026 CampusConnect. Built for Practical 1 — Tailwind CSS v4.</p>
        <div className="flex gap-6 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <Link to="/login" className="hover:text-brand-600">Login</Link>
          <Link to="/dashboard" className="hover:text-brand-600">Dashboard</Link>
        </div>
      </div>
    </footer>
  )
}
