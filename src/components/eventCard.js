import { formatDate } from '../utils/dom.js'

const categoryBadge = {
  Technical: 'badge-brand',
  Cultural: 'badge-warning',
  Workshop: 'badge-success',
  Sports: 'badge-brand',
}

/** Render a single event as an HTML string for a card grid. */
export function renderEventCard(event) {
  const seatsLeft = event.seats - event.registered
  const fillingFast = seatsLeft <= Math.round(event.seats * 0.15)
  const badgeClass = categoryBadge[event.category] ?? 'badge-brand'

  return `
    <article class="card-hover overflow-hidden animate-fade-up" data-event-id="${event.id}">
      <div class="relative h-44 w-full overflow-hidden">
        <img src="${event.poster}" alt="${event.title}" loading="lazy"
             class="h-full w-full object-cover transition duration-300 hover:scale-105" />
        <span class="${badgeClass} absolute top-3 left-3 shadow-sm">${event.category}</span>
      </div>
      <div class="p-5 space-y-3">
        <div>
          <h3 class="font-semibold text-slate-900 leading-snug">${event.title}</h3>
          <p class="text-sm text-slate-500">${event.club}</p>
        </div>
        <p class="text-sm text-slate-600 line-clamp-2">${event.description}</p>
        <div class="flex items-center gap-4 text-xs text-slate-500 pt-1">
          <span class="inline-flex items-center gap-1">📅 ${formatDate(event.date)}</span>
          <span class="inline-flex items-center gap-1">📍 ${event.venue}</span>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-100">
          <span class="${fillingFast ? 'badge-warning' : 'badge-success'}">
            ${fillingFast ? 'Filling fast' : 'Open'} · ${seatsLeft} seats left
          </span>
          <button class="btn-secondary !py-1.5 !px-3 text-xs register-btn" data-event-id="${event.id}">
            Register
          </button>
        </div>
      </div>
    </article>
  `
}
