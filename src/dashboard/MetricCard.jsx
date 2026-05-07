import { HiArrowTrendingDown, HiArrowTrendingUp } from 'react-icons/hi2'

function buildSparkline(points) {
  const width = 160
  const height = 58
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1

  return points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width
      const y = height - ((point - min) / range) * height
      return `${x},${y}`
    })
    .join(' ')
}

export default function MetricCard({ title, value, change, compare, direction, points }) {
  const TrendIcon = direction === 'down' ? HiArrowTrendingDown : HiArrowTrendingUp
  const trendColor = direction === 'down' ? 'text-rose-400' : 'text-emerald-400'
  const sparkline = buildSparkline(points)
  const lastPoint = sparkline.split(' ').at(-1)?.split(',') || ['0', '0']

  return (
    <article className="rounded-3xl border border-neutral-700 bg-neutral-900 p-5 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-neutral-400">{title}</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">{value}</h3>
        </div>

        <div className={`inline-flex items-center gap-1 rounded-full bg-neutral-950/80 px-3 py-1 text-sm font-semibold ${trendColor}`}>
          <TrendIcon size={16} />
          {change}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-3">
        <svg viewBox="0 0 160 58" className="h-16 w-full">
          <polyline
            fill="none"
            stroke="#a855f7"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={sparkline}
          />
          <circle cx={lastPoint[0]} cy={lastPoint[1]} r="4" fill="#a855f7" />
        </svg>
      </div>

      <p className="mt-4 text-sm text-neutral-400">
        <span className={trendColor}>{change}</span> {compare}
      </p>
    </article>
  )
}
