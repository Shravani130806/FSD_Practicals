import './styles/main.css'
import { renderNavbar, initNavbar } from './components/navbar.js'
import { renderFooter } from './components/footer.js'
import { renderEventCard } from './components/eventCard.js'
import { events } from './data/events.js'
import { clubs } from './data/clubs.js'
import { $, mountList } from './utils/dom.js'
import { showToast } from './utils/toast.js'

document.getElementById('navbar').innerHTML = renderNavbar('home')
document.getElementById('footer').innerHTML = renderFooter()
initNavbar()

// ---- Event category filters ----
const categories = ['All', ...new Set(events.map((e) => e.category))]
let activeCategory = 'All'

function renderFilters() {
  const el = $('#category-filters')
  el.innerHTML = categories
    .map((cat) => {
      const isActive = cat === activeCategory
      const classes = isActive ? 'btn-primary !py-1.5 !px-4 text-xs' : 'btn-secondary !py-1.5 !px-4 text-xs'
      return `<button class="${classes} filter-btn" data-category="${cat}">${cat}</button>`
    })
    .join('')
}

function renderEvents() {
  const filtered =
    activeCategory === 'All' ? events : events.filter((e) => e.category === activeCategory)
  mountList($('#events-grid'), filtered, renderEventCard)
}

renderFilters()
renderEvents()

$('#category-filters').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn')
  if (!btn) return
  activeCategory = btn.dataset.category
  renderFilters()
  renderEvents()
})

$('#events-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('.register-btn')
  if (!btn) return
  const event = events.find((ev) => ev.id === Number(btn.dataset.eventId))
  showToast(`Registered for "${event.title}" 🎉`, 'success')
})

// ---- Clubs ----
function renderClubCard(club) {
  return `
    <div class="card-hover p-6 text-center animate-fade-up">
      <img src="${club.logo}" alt="${club.name}" class="h-16 w-16 rounded-full object-cover mx-auto" />
      <h3 class="mt-4 font-semibold">${club.name}</h3>
      <span class="badge-brand mt-2">${club.category}</span>
      <p class="mt-3 text-sm text-slate-500">${club.description}</p>
      <p class="mt-3 text-xs text-slate-400">${club.members} members</p>
    </div>
  `
}

mountList($('#clubs-grid'), clubs, renderClubCard)
