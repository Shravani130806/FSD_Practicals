export function renderFooter() {
  return `
    <footer class="border-t border-slate-200 bg-white mt-20">
      <div class="container-page py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-sm text-slate-500">© 2026 CampusConnect. Built for Practical 1 — Tailwind CSS v4.</p>
        <div class="flex gap-6 text-sm text-slate-500">
          <a href="/index.html" class="hover:text-brand-600">Home</a>
          <a href="/login.html" class="hover:text-brand-600">Login</a>
          <a href="/dashboard.html" class="hover:text-brand-600">Dashboard</a>
        </div>
      </div>
    </footer>
  `
}
