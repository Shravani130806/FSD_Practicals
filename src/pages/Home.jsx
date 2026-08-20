import { useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard.jsx'
import ClubCard from '../components/ClubCard.jsx'
import EventModal from '../components/EventModal.jsx'
import { events } from '../data/events.js'
import { clubs } from '../data/clubs.js'

const categories = ['All', ...new Set(events.map((e) => e.category))]

export default function Home() {
  // Search text typed into the events search box. Filtering happens
  // straight off this state on every render — no useEffect needed, since
  // it's a pure computation over data we already have in memory.
  const [searchText, setSearchText] = useState('')

  // Which category pill is active. Defaults to "All".
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Which event (if any) is open in the details modal. `null` = closed.
  // Using the event object itself (instead of a separate isModalOpen
  // boolean + an id) means the modal always has the data it needs and
  // can't get out of sync with "which event is selected".
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Short-lived feedback banner shown after clicking "Register" — this is
  // a frontend-only simulation; Practical 6 will replace it with a real
  // registration API call.
  const [registeredMessage, setRegisteredMessage] = useState('')

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchText.toLowerCase())
    return matchesCategory && matchesSearch
  })

  function handleRegister(event) {
    setSelectedEvent(null)
    setRegisteredMessage(`Registered for "${event.title}" 🎉`)
    setTimeout(() => setRegisteredMessage(''), 3000)
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-surface-muted">
        <div className="container-page py-20 md:py-28 text-center">
          <span className="badge-brand mx-auto animate-fade-in">🎓 Your campus, connected</span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 animate-fade-up">
            Never miss what's <span className="text-brand-600">happening on campus</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 animate-fade-up">
            Discover events, join clubs and RSVP in seconds. CampusConnect brings every
            hackathon, cultural night and workshop into one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-up">
            <a href="#events" className="btn-primary">Browse events</a>
            <a href="#clubs" className="btn-secondary">Explore clubs</a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-brand-600">120+</p>
              <p className="text-sm text-slate-500">Events / year</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-600">40+</p>
              <p className="text-sm text-slate-500">Active clubs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-600">8,000+</p>
              <p className="text-sm text-slate-500">Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-600">4.8★</p>
              <p className="text-sm text-slate-500">Average rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-page py-20">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold">Everything you need, one dashboard</h2>
          <p className="mt-3 text-slate-600">
            Built with a small, reusable design system — buttons, cards, badges and forms — so
            every page feels the same.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-hover p-6">
            <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">🔎</div>
            <h3 className="mt-4 font-semibold">Discover</h3>
            <p className="mt-2 text-sm text-slate-500">Filter events by category, club or date and find exactly what fits your schedule.</p>
          </div>
          <div className="card-hover p-6">
            <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">🎟️</div>
            <h3 className="mt-4 font-semibold">Register instantly</h3>
            <p className="mt-2 text-sm text-slate-500">One click RSVP with live seat counts, so you know when an event is filling fast.</p>
          </div>
          <div className="card-hover p-6">
            <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl">📊</div>
            <h3 className="mt-4 font-semibold">Track everything</h3>
            <p className="mt-2 text-sm text-slate-500">Your dashboard keeps every registration, club and upcoming date in view.</p>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="bg-white border-y border-slate-200">
        <div className="container-page py-20">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold">Upcoming events</h2>
              <p className="mt-2 text-slate-600">Handpicked from clubs across campus.</p>
            </div>
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search events…"
              className="input-field max-w-xs"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={
                  cat === selectedCategory
                    ? 'btn-primary !py-1.5 !px-4 text-xs'
                    : 'btn-secondary !py-1.5 !px-4 text-xs'
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {registeredMessage && (
            <div className="mt-6 badge-success !text-sm !px-4 !py-2">{registeredMessage}</div>
          )}

          {filteredEvents.length === 0 ? (
            <p className="mt-10 text-center text-slate-500">No events found.</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                  onViewDetails={setSelectedEvent}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CLUBS */}
      <section id="clubs" className="container-page py-20">
        <h2 className="text-3xl font-bold text-center">Popular clubs</h2>
        <p className="mt-3 text-slate-600 text-center max-w-xl mx-auto">
          Join a community and get first access to their events.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="card bg-brand-600 border-none text-white px-8 py-14 text-center rounded-3xl">
          <h2 className="text-3xl font-bold">Ready to join in?</h2>
          <p className="mt-3 text-brand-100 max-w-lg mx-auto">
            Create your account and start registering for events in under a minute.
          </p>
          <Link to="/login" className="btn-secondary mt-8 inline-flex !text-brand-700">
            Sign in to CampusConnect
          </Link>
        </div>
      </section>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onRegister={handleRegister} />
    </div>
  )
}
