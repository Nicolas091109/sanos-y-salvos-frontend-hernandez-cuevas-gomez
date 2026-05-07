import { useMemo, useState } from 'react'
import { HiChevronDown, HiMiniPlus, HiOutlineCog6Tooth } from 'react-icons/hi2'
import { navigationItems, teams } from './mockData'

function LogoMark() {
  return (
    <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-700 shadow-lg shadow-purple-950/40">
      <span className="absolute left-2 top-2 h-2.5 w-2.5 rounded-full bg-white" />
      <span className="absolute right-2 top-3 h-2 rounded-full bg-white/80" />
      <span className="absolute bottom-2 left-3 h-2 w-2 rounded-full bg-white/90" />
      <span className="absolute bottom-3 right-2 h-2.5 w-2.5 rounded-full bg-white" />
      <span className="absolute left-[14px] top-[14px] h-[2px] w-5 rotate-12 bg-white/80" />
      <span className="absolute left-[14px] top-[22px] h-[2px] w-4 -rotate-12 bg-white/70" />
    </div>
  )
}

export default function Sidebar() {
  const defaultItem = useMemo(() => navigationItems.find((item) => item.active)?.id || navigationItems[0].id, [])
  const [activeItem, setActiveItem] = useState(defaultItem)

  return (
    <aside className="flex h-full min-h-screen w-full flex-col border-r border-neutral-700 bg-neutral-950 px-4 py-6">
      <div className="flex items-center gap-3 px-3">
        <LogoMark />
        <div>
          <p className="text-sm font-black uppercase tracking-[0.35em] text-white">Dashflow</p>
          <p className="text-sm text-neutral-400">Data Analysis</p>
        </div>
      </div>

      <nav className="mt-10 space-y-2">
        {navigationItems.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeItem === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveItem(id)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                isActive
                  ? 'bg-purple-500/15 text-white ring-1 ring-purple-500/40'
                  : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className={isActive ? 'text-purple-400' : 'text-neutral-500'} size={20} />
                <span className="font-medium">{label}</span>
              </span>
              {badge ? (
                <span className="rounded-full bg-purple-500 px-2 py-0.5 text-xs font-bold text-white">{badge}</span>
              ) : null}
            </button>
          )
        })}
      </nav>

      <div className="mt-10 px-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">My Teams</p>
        <div className="mt-4 space-y-3">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${team.tone} text-sm font-bold text-white`}>
                {team.initials}
              </div>
              <div>
                <p className="font-medium text-white">{team.name}</p>
                <p className="text-sm text-neutral-400">Team workspace</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-purple-500/60 px-4 py-3 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/10"
        >
          <HiMiniPlus size={18} />
          Create New Team
        </button>
      </div>

      <div className="mt-auto rounded-3xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-sm font-bold text-white">
            AJ
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-white">Alex Johnson</p>
            <p className="truncate text-sm text-neutral-400">alex.johnson@dashflow.io</p>
          </div>
          <button type="button" className="rounded-xl p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white">
            <HiChevronDown size={18} />
          </button>
        </div>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm font-medium text-neutral-300 transition hover:border-neutral-700 hover:text-white"
        >
          <HiOutlineCog6Tooth size={18} />
          Account Settings
        </button>
      </div>
    </aside>
  )
}
