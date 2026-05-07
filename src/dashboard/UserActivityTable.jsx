import { recentActivity } from './mockData'

const badgeStyles = {
  Active: 'bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/30',
  Created: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30',
  Updated: 'bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30',
}

export default function UserActivityTable() {
  return (
    <section className="rounded-3xl border border-neutral-700 bg-neutral-900 p-6 shadow-panel">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Recent Users Activity</h3>
          <p className="mt-1 text-sm text-neutral-400">Latest changes across your teams and projects.</p>
        </div>
        <button
          type="button"
          className="rounded-2xl border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:border-neutral-600 hover:text-white"
        >
          View all
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-xs uppercase tracking-[0.2em] text-neutral-500">
              <th className="pb-2 font-medium">User</th>
              <th className="pb-2 font-medium">Team</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((user) => (
              <tr key={user.id} className="rounded-2xl bg-neutral-950/70">
                <td className="rounded-l-2xl px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-sm font-bold text-white">
                      {user.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                    </div>
                    <span className="font-medium text-white">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-neutral-300">{user.team}</td>
                <td className="px-4 py-4 text-neutral-400">{user.date}</td>
                <td className="rounded-r-2xl px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[user.action]}`}>
                    {user.action}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
