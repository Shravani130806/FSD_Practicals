// Reusable navbar. `active` marks the current page's nav link.
export function renderNavbar(active = 'home') {
  const links = [
    { key: 'home', label: 'Home', href: '/index.html' },
    { key: 'dashboard', label: 'Dashboard', href: '/dashboard.html' },
    { key: 'login', label: 'Login', href: '/login.html' },
  ]

  const linkHtml = links
    .map((link) => {
      const isActive = link.key === active
      const classes = isActive
        ? 'text-brand-700 font-semibold'
        : 'text-slate-600 hover:text-brand-600'
      return `<a href="${link.href}" class="${classes} transition duration-150 text-sm">${link.label}</a>`
    })
    .join('')

  return `
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav class="container-page flex items-center justify-between h-16">
        <a href="/index.html" class="flex items-center gap-2 font-bold text-lg text-slate-900">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white text-sm">CC</span>
          CampusConnect
        </a>
        <div class="hidden md:flex items-center gap-8">
          ${linkHtml}
        </div>
        <a href="/login.html" class="btn-primary hidden md:inline-flex !py-2 !px-4">Sign in</a>
        <button id="nav-toggle" class="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      <div id="nav-mobile" class="hidden md:hidden border-t border-slate-200 bg-white">
        <div class="container-page flex flex-col gap-4 py-4">
          ${linkHtml}
          <a href="/login.html" class="btn-primary !py-2 !px-4 w-fit">Sign in</a>
        </div>
      </div>
    </header>
  `
}

export function initNavbar() {
  const toggle = document.getElementById('nav-toggle')
  const mobile = document.getElementById('nav-mobile')
  toggle?.addEventListener('click', () => {
    mobile?.classList.toggle('hidden')
  })
}
