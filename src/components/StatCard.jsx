// Small reusable stat tile for the Dashboard — avoids repeating the same
// card markup four times with only the numbers/labels changing.
export default function StatCard({ label, value, badge, badgeClass = 'badge-success' }) {
  return (
    <div className="card p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {badge && <span className={`${badgeClass} mt-3`}>{badge}</span>}
    </div>
  )
}
