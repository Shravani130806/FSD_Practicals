// Pure presentational component — same markup as Practical 1's inline
// renderClubCard() in main.js, now prop-driven and reusable.
export default function ClubCard({ club }) {
  return (
    <div className="card-hover p-6 text-center animate-fade-up">
      <img src={club.logo} alt={club.name} className="h-16 w-16 rounded-full object-cover mx-auto" />
      <h3 className="mt-4 font-semibold">{club.name}</h3>
      <span className="badge-brand mt-2">{club.category}</span>
      <p className="mt-3 text-sm text-slate-500">{club.description}</p>
      <p className="mt-3 text-xs text-slate-400">{club.members} members</p>
    </div>
  )
}
