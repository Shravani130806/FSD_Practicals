import './styles/main.css'
import { renderNavbar, initNavbar } from './components/navbar.js'
import { renderFooter } from './components/footer.js'
import { events } from './data/events.js'
import { clubs } from './data/clubs.js'
import { $, mountList, formatDate } from './utils/dom.js'

document.getElementById('navbar').innerHTML = renderNavbar('dashboard')
document.getElementById('footer').innerHTML = renderFooter()
initNavbar()

// Pretend the current user registered for the first four events.
const myEvents = events.slice(0, 4)

function renderRegisteredEvent(event) {
  return `
    <div class="card p-4 flex items-center gap-4 animate-fade-up">
      <img src="${event.poster}" alt="${event.title}" class="h-16 w-16 rounded-xl object-cover shrink-0" />
      <div class="min-w-0 flex-1">
        <p class="font-medium text-slate-900 truncate">${event.title}</p>
        <p class="text-sm text-slate-500">${event.club} · ${formatDate(event.date)}</p>
      </div>
      <span class="badge-success shrink-0">Confirmed</span>
    </div>
  `
}

mountList($('#registered-events'), myEvents, renderRegisteredEvent)

function renderClubRow(club) {
  return `
    <div class="flex items-center gap-3">
      <img src="${club.logo}" alt="${club.name}" class="h-9 w-9 rounded-full object-cover" />
      <div class="min-w-0 flex-1">
        <p class="text-sm font-medium text-slate-900 truncate">${club.name}</p>
        <p class="text-xs text-slate-500">${club.members} members</p>
      </div>
    </div>
  `
}

mountList($('#dashboard-clubs'), clubs.slice(0, 3), renderClubRow)
