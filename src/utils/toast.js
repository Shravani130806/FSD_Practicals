// Minimal toast notification system.
// In Practical 3 this behaviour moves into a NotificationContext.

export function showToast(message, type = 'success') {
  let host = document.getElementById('toast-host')

  if (!host) {
    host = document.createElement('div')
    host.id = 'toast-host'
    host.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3'
    document.body.appendChild(host)
  }

  const colors = {
    success: 'bg-emerald-600',
    error: 'bg-rose-600',
    info: 'bg-brand-600',
  }

  const toast = document.createElement('div')
  toast.className = `${colors[type]} text-white text-sm font-medium
    px-5 py-3 rounded-xl shadow-lg animate-fade-up`
  toast.textContent = message
  host.appendChild(toast)

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition', 'duration-300')
    setTimeout(() => toast.remove(), 300)
  }, 2800)
}
