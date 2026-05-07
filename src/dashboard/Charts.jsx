import { revenueSeries, trafficSources } from './mockData'

function buildAreaPath(points, width, height) {
  const max = Math.max(...points.map((point) => point.value))
  const min = Math.min(...points.map((point) => point.value))
  const range = max - min || 1

  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width
    const y = height - ((point.value - min) / range) * (height - 18) - 9
    return { x, y }
  })

  const line = coords.map((coord) => `${coord.x},${coord.y}`).join(' ')
  const area = `M ${coords[0].x} ${height} L ${coords.map((coord) => `${coord.x} ${coord.y}`).join(' L ')} L ${coords.at(-1).x} ${height} Z`

  return { line, area, coords }
}

function TrafficRing() {
  const radius = 62
  const circumference = 2 * Math.PI * radius
  const offsetPercentages = trafficSources.reduce((acc, source, index) => {
    if (index === 0) return [...acc, 0]
    return [...acc, acc[index - 1] + trafficSources[index - 1].value]
  }, [])

  return (
    <div className="flex items-center justify-center">
      <svg viewBox="0 0 180 180" className="h-52 w-52 -rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#171717" strokeWidth="18" />
        {trafficSources.map((source, index) => (
          <circle
            key={source.name}
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={source.color}
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={`${(source.value / 100) * circumference} ${circumference}`}
            strokeDashoffset={-((offsetPercentages[index] / 100) * circumference)}
          />
        ))}
      </svg>
      <div className="absolute flex h-24 w-24 flex-col items-center justify-center rounded-full bg-neutral-950">
        <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">Traffic</span>
        <span className="mt-1 text-2xl font-semibold text-white">100%</span>
      </div>
    </div>
  )
}

export function RevenueGrowthChart() {
  const width = 640
  const height = 260
  const { line, area, coords } = buildAreaPath(revenueSeries, width, height)

  return (
    <section className="rounded-3xl border border-neutral-700 bg-neutral-900 p-6 shadow-panel">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Revenue Growth</h3>
          <p className="mt-1 text-sm text-neutral-400">Monthly recurring revenue and growth trend.</p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          {['Monthly', 'Yearly', '2023'].map((label, index) => (
            <button
              key={label}
              type="button"
              className={`rounded-full border px-4 py-2 transition ${
                index === 0
                  ? 'border-purple-500 bg-purple-500/15 text-purple-300'
                  : 'border-neutral-700 bg-neutral-950 text-neutral-400 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full">
          {[0, 1, 2, 3].map((lineIndex) => (
            <line
              key={lineIndex}
              x1="0"
              x2={width}
              y1={20 + lineIndex * 60}
              y2={20 + lineIndex * 60}
              stroke="#404040"
              strokeDasharray="6 6"
            />
          ))}
          <path d={area} fill="rgba(88, 28, 135, 0.45)" />
          <polyline
            fill="none"
            stroke="#c084fc"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={line}
          />
          {coords.map((coord, index) => (
            <circle key={revenueSeries[index].label} cx={coord.x} cy={coord.y} r="4.5" fill="#a855f7" />
          ))}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
        {revenueSeries.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </section>
  )
}

export function TrafficSourceChart() {
  return (
    <section className="rounded-3xl border border-neutral-700 bg-neutral-900 p-6 shadow-panel">
      <h3 className="text-xl font-semibold text-white">Traffic Source</h3>
      <p className="mt-1 text-sm text-neutral-400">Share of visits by acquisition channel.</p>

      <div className="relative mt-8 flex justify-center">
        <TrafficRing />
      </div>

      <div className="mt-8 space-y-4">
        {trafficSources.map((source) => (
          <div key={source.name} className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-950/70 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: source.color }} />
              <span className="text-sm font-medium text-neutral-200">{source.name}</span>
            </div>
            <span className="text-sm font-semibold text-white">{source.value}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}
