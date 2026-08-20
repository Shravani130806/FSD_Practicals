import { useState } from 'react'
import StatCard from '../components/StatCard.jsx'
import EventCard from '../components/EventCard.jsx'
import EventModal from '../components/EventModal.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { getEvents } from '../services/api.js'
import { clubs } from '../data/clubs.js'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const notifications = [
  { id: 1, text: 'HackCampus 2026 starts in 3 days.', time: '2h ago' },
  { id: 2, text: 'Your Rhythm registration was confirmed.', time: '1d ago' },
  { id: 3, text: 'AI/ML Workshop has 2 seats left.', time: '2d ago' },
]

export default function Dashboard() {
  // Mobile sidebar open/closed. Sidebar is always visible on desktop
  // (md:block) — this state only matters below the md breakpoint.
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Notification dropdown open/closed.
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Selected event for the shared EventModal (null = closed), reused
  // identically to how Home.jsx drives the same component.
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Same useFetch hook Home.jsx uses — this is the payoff of Step 5:
  // no new useState/useEffect/try-catch had to be written here at all.
  const { data: events, loading: eventsLoading, error: eventsError, retry: retryEvents } = useFetch(
    () => getEvents(),
    [],
  )
  const eventsList = events ?? []

  // Pretend the current user registered for the first four events — still
  // mock data, same as Practical 1. Practical 4 replaces this with "events
  // the logged-in user actually registered for" from the API.
  const myEvents = eventsList.slice(0, 4)
  const upcomingEvents = eventsList.slice(2, 5)

  return (
    <div className="container-page py-8 flex gap-8">
      {/* SIDEBAR (desktop: static column, mobile: slide-in panel) */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-64 bg-white border-r border-slate-200 p-6 transition-transform duration-300 overflow-y-auto
          md:static md:top-auto md:translate-x-0 md:w-56 md:shrink-0 md:border-0 md:p-0 md:bg-transparent
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between md:hidden mb-6">
          <span className="font-bold text-lg">Menu</span>
          <button type="button" onClick={() => setSidebarOpen(false)} className="text-slate-500 hover:text-slate-800" aria-label="Close menu">
            ✕
          </button>
        </div>

        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Your clubs</h2>
        <div className="mt-4 space-y-3">
          {clubs.slice(0, 3).map((club) => (
            <div key={club.id} className="flex items-center gap-3">
              <img src={club.logo} alt={club.name} className="h-9 w-9 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 truncate">{club.name}</p>
                <p className="text-xs text-slate-500">{club.members} members</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-slate-900/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="btn-secondary !py-2 !px-3 md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">Welcome back, Student! 👋</h1>
            <p className="mt-1 text-slate-500">Here's what's happening with your registrations.</p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen((open) => !open)}
              className="btn-secondary !py-2 !px-3 relative"
              aria-label="Notifications"
            >
              🔔
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 card p-2 z-30 animate-fade-up">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl hover:bg-slate-50">
                    <p className="text-sm text-slate-700">{n.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Registered events" value={eventsLoading ? '—' : myEvents.length} badge="+2 this month" />
          <StatCard label="Clubs joined" value={3} badge="Active" badgeClass="badge-brand" />
          <StatCard label="Upcoming this week" value={2} badge="Don't miss out" badgeClass="badge-warning" />
          <StatCard label="Certificates earned" value={6} badge="All time" />
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* REGISTERED EVENTS */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold">Your registered events</h2>

            {eventsLoading && (
              <div className="mt-5 space-y-4">
                {[1, 2].map((n) => (
                  <div key={n} className="card p-4 flex items-center gap-4">
                    <div className="skeleton h-16 w-16 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="skeleton h-4 w-1/2" />
                      <div className="skeleton h-3 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!eventsLoading && eventsError && (
              <div className="mt-5">
                <p className="text-rose-600 text-sm font-medium">Unable to load your events.</p>
                <button type="button" onClick={retryEvents} className="btn-secondary mt-3 !py-1.5 !px-4 text-xs">
                  Retry
                </button>
              </div>
            )}

            {!eventsLoading && !eventsError && (
              <>
                <div className="mt-5 space-y-4">
                  {myEvents.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="card p-4 flex items-center gap-4 w-full text-left hover:border-brand-200 transition"
                    >
                      <img src={event.poster} alt={event.title} className="h-16 w-16 rounded-xl object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-900 truncate">{event.title}</p>
                        <p className="text-sm text-slate-500">{event.club} · {formatDate(event.date)}</p>
                      </div>
                      <span className="badge-success shrink-0">Confirmed</span>
                    </button>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mt-10">Upcoming events</h2>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onRegister={setSelectedEvent}
                      onViewDetails={setSelectedEvent}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* PROFILE SIDEBAR */}
          <div className="space-y-8">
            <div className="card p-6">
              <h2 className="text-lg font-semibold">Profile</h2>
              <div className="mt-4 flex items-center gap-4">
                <img src="https://picsum.photos/seed/profile/100/100" alt="Profile" className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-slate-900">CampusConnect Student</p>
                  <p className="text-sm text-slate-500">student@college.edu</p>
                </div>
              </div>
              <button type="button" className="btn-secondary w-full mt-5 !py-2">Edit profile</button>
            </div>
          </div>
        </div>
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onRegister={() => setSelectedEvent(null)} />
    </div>
  )
}
