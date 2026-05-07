import { HiOutlineBell, HiOutlineMagnifyingGlass, HiOutlineQuestionMarkCircle } from 'react-icons/hi2'
import { FiMessageSquare } from 'react-icons/fi'

function IconButton({ children, showDot = false }) {
  return (
    <button
      type="button"
      className="relative rounded-2xl border border-neutral-700 bg-neutral-900 p-3 text-neutral-300 transition hover:border-neutral-600 hover:text-white"
    >
      {children}
      {showDot ? <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" /> : null}
    </button>
  )
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-700 bg-neutral-900/90 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="flex w-full items-center gap-3 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-400 xl:max-w-md">
          <HiOutlineMagnifyingGlass size={20} />
          <input
            type="text"
            placeholder="Search for analytics, reports, or teams"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />
        </label>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <IconButton>
              <HiOutlineBell size={20} />
            </IconButton>
            <IconButton showDot>
              <FiMessageSquare size={18} />
            </IconButton>
            <IconButton>
              <HiOutlineQuestionMarkCircle size={20} />
            </IconButton>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-neutral-700 bg-neutral-950 px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-sm font-bold text-white">
              AJ
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white">Alex Johnson</p>
              <p className="text-xs text-neutral-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
