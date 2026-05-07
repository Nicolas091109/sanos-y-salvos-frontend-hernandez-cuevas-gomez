import { HiArrowDownTray } from 'react-icons/hi2'
import AlertsPanel from './AlertsPanel'
import { RevenueGrowthChart, TrafficSourceChart } from './Charts'
import MetricCard from './MetricCard'
import { metrics } from './mockData'
import UserActivityTable from './UserActivityTable'

export default function ContentArea() {
  return (
    <main className="flex-1 bg-neutral-950 px-4 py-6 md:px-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="flex flex-col gap-4 rounded-3xl border border-neutral-700 bg-neutral-900 p-6 shadow-panel md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">Overview</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">Business Performance</h1>
              <p className="mt-2 text-sm text-neutral-400">Sep 1 - Sep 30, 2023</p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-700 bg-neutral-950 px-5 py-3 text-sm font-semibold text-neutral-200 transition hover:border-purple-500 hover:text-white"
            >
              <HiArrowDownTray size={18} />
              Export
            </button>
          </section>

          <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </section>

          <section className="grid gap-6 2xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <RevenueGrowthChart />
            <TrafficSourceChart />
          </section>

          <UserActivityTable />
        </div>

        <AlertsPanel />
      </div>
    </main>
  )
}
