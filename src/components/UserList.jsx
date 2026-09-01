import { useState } from 'react'
import { useUsers } from '../context/UserContext.jsx'

const roles = ['All', 'Student', 'Organizer', 'Admin']

export default function UserList() {
  const { users } = useUsers() || { users: [] }
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? users : users.filter((u) => u.role === filter)

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold">CampusConnect Users</h3>
      <div className="mt-3 flex gap-2">
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setFilter(r)}
            className={r === filter ? 'btn-primary !py-1 !px-3 text-xs' : 'btn-secondary !py-1 !px-3 text-xs'}
          >
            {r}
          </button>
        ))}
      </div>

      <ul className="mt-4 space-y-3">
        {filtered.map((u) => (
          <li key={u.id} className="p-3 rounded-lg border border-slate-100">
            <p className="font-medium">{u.name}</p>
            <p className="text-sm text-slate-500">{u.role}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
