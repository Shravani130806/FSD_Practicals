function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Controlled entirely by the parent: it decides which event (if any) is
// selected and passes it in as `event`. When `event` is null/undefined we
// render nothing — no internal open/closed state duplicated in here.
export default function EventModal({ event, onClose, onRegister }) {
  if (!event) return null

  const seatsLeft = event.seats - event.registered

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="card max-w-lg w-full overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 w-full">
          <img src={event.poster} alt={event.title} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 text-slate-700 hover:bg-white flex items-center justify-center shadow-sm"
          >
            ✕
          </button>
          <span className="badge-brand absolute top-3 left-3 shadow-sm">{event.category}</span>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{event.title}</h2>
            <p className="text-sm text-slate-500">{event.club}</p>
          </div>

          <p className="text-sm text-slate-600">{event.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
            <p>📅 {formatDate(event.date)}</p>
            <p>🕒 {event.time}</p>
            <p>📍 {event.venue}</p>
            <p>🎟️ {seatsLeft} seats left</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => onRegister(event)} className="btn-primary flex-1">
              Register
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
