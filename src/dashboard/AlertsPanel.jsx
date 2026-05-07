import { HiOutlineExclamationTriangle, HiOutlineSignal, HiOutlineWifi } from 'react-icons/hi2'
import { liveFeed, systemAlerts } from './mockData'

const levelStyles = {
  critical: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  info: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
}

export default function AlertsPanel() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-neutral-700 bg-neutral-900 p-6 shadow-panel">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Live Feed</h3>
            <p className="mt-1 text-sm text-neutral-400">Realtime updates from your workspace.</p>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
            <HiOutlineSignal size={16} />
            Live
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {liveFeed.map((item) => (
            <article key={item.id} className="rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-xl bg-purple-500/15 p-2 text-purple-300">
                  <HiOutlineWifi size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-white">{item.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-neutral-400">{item.detail}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-neutral-500">{item.time}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-neutral-700 bg-neutral-900 p-6 shadow-panel">
        <h3 className="text-xl font-semibold text-white">System Alerts</h3>
        <p className="mt-1 text-sm text-neutral-400">Infrastructure and platform notifications.</p>

        <div className="mt-6 space-y-4">
          {systemAlerts.map((alert) => (
            <article key={alert.id} className={`rounded-2xl border p-4 ${levelStyles[alert.level]}`}>
              <div className="flex items-start gap-3">
                <HiOutlineExclamationTriangle size={20} className="mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold">{alert.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-neutral-300">{alert.detail}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
