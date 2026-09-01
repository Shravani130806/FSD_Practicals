import { useUsers } from "../context/UserContext"
const categoryBadge = {
  Technical: 'badge-brand',
  Cultural: 'badge-warning',
  Workshop: 'badge-success',
  Sports: 'badge-brand',
}

// Format an ISO date string as "12 Sept 2026" — same helper Practical 1 had
// in utils/dom.js, kept here since only this component needs it now.
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Pure presentational component: all data comes in through props, all
// interaction (Register / opening details) is reported back up via callbacks
// instead of this component touching any state itself.
export default function EventCard({ event, onRegister, onViewDetails }) {
  const seatsLeft = event.seats - event.registered
  const fillingFast = seatsLeft <= Math.round(event.seats * 0.15)
  const badgeClass = categoryBadge[event.category] ?? 'badge-brand'
    const { registeredEvents, registerForEvent, unregisterFromEvent } = useUsers() || {
      registeredEvents: [],
      registerForEvent: () => {},
      unregisterFromEvent: () => {},
    }
    const isRegistered = registeredEvents.includes(event.id)

  return (
    <article className="card-hover overflow-hidden animate-fade-up">
      <button
        type="button"
        onClick={() => onViewDetails(event)}
        className="relative h-44 w-full overflow-hidden block text-left"
      >
        <img
          src={event.poster}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
        <span className={`${badgeClass} absolute top-3 left-3 shadow-sm`}>{event.category}</span>
      </button>
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-slate-900 leading-snug">{event.title}</h3>
          <p className="text-sm text-slate-500">{event.club}</p>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2">{event.description}</p>
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
          <span className="inline-flex items-center gap-1">📅 {formatDate(event.date)}</span>
          <span className="inline-flex items-center gap-1">📍 {event.venue}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className={fillingFast ? 'badge-warning' : 'badge-success'}>
            {fillingFast ? 'Filling fast' : 'Open'} · {seatsLeft} seats left
          </span>
            <button
              type="button"
              onClick={() => {
                if (isRegistered) {
                  unregisterFromEvent(event.id)
                } else {
                  registerForEvent(event.id)
                }
                if (onRegister) onRegister(event)
              }}
              className={isRegistered ? 'btn-primary !py-1.5 !px-3 text-xs' : 'btn-secondary !py-1.5 !px-3 text-xs'}
            >
              {isRegistered ? 'Registered ✓' : 'Register'}
            </button>
        </div>
      </div>
    </article>
  )
}
