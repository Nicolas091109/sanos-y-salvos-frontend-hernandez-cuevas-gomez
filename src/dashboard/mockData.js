import {
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineFolder,
  HiOutlineHome,
  HiOutlineUsers,
} from 'react-icons/hi2'

export const navigationItems = [
  { id: 'dashboards', label: 'Dashboards', icon: HiOutlineHome, active: true },
  { id: 'analytics', label: 'Analytics', icon: HiOutlineChartBar },
  { id: 'projects', label: 'Projects', icon: HiOutlineFolder },
  { id: 'users', label: 'Users', icon: HiOutlineUsers, badge: '4' },
  { id: 'settings', label: 'Settings', icon: HiOutlineCog6Tooth },
]

export const teams = [
  { id: 1, name: 'Marketing Team', initials: 'MT', tone: 'from-fuchsia-500 to-purple-500' },
  { id: 2, name: 'Dev Squad', initials: 'DS', tone: 'from-violet-500 to-indigo-500' },
  { id: 3, name: 'Design Crew', initials: 'DC', tone: 'from-purple-500 to-pink-500' },
]

export const metrics = [
  {
    title: 'Total Revenue',
    value: '$128,420',
    change: '+20.1%',
    compare: 'vs last month',
    direction: 'up',
    points: [34, 42, 28, 52, 48, 64, 72],
  },
  {
    title: 'Subscriptions',
    value: '5,402',
    change: '+14.2%',
    compare: 'vs last month',
    direction: 'up',
    points: [20, 24, 22, 36, 30, 44, 50],
  },
  {
    title: 'Active Users',
    value: '18,940',
    change: '+8.7%',
    compare: 'vs last month',
    direction: 'up',
    points: [30, 35, 32, 28, 42, 48, 60],
  },
  {
    title: 'Conversion Rate',
    value: '6.84%',
    change: '-1.4%',
    compare: 'vs last month',
    direction: 'down',
    points: [60, 54, 56, 50, 45, 42, 38],
  },
]

export const revenueSeries = [
  { label: 'Jan', value: 22 },
  { label: 'Feb', value: 35 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 48 },
  { label: 'May', value: 42 },
  { label: 'Jun', value: 61 },
  { label: 'Jul', value: 55 },
  { label: 'Aug', value: 72 },
  { label: 'Sep', value: 68 },
  { label: 'Oct', value: 84 },
]

export const trafficSources = [
  { name: 'Direct', value: 48, color: '#a855f7' },
  { name: 'Social', value: 32, color: '#7c3aed' },
  { name: 'Organic', value: 20, color: '#4c1d95' },
]

export const recentActivity = [
  { id: 1, name: 'Emma Wilson', team: 'Marketing Team', date: 'Sep 28, 2023', action: 'Active' },
  { id: 2, name: 'Lucas Parker', team: 'Dev Squad', date: 'Sep 26, 2023', action: 'Created' },
  { id: 3, name: 'Sophia Lee', team: 'Design Crew', date: 'Sep 24, 2023', action: 'Updated' },
  { id: 4, name: 'Noah Martin', team: 'Marketing Team', date: 'Sep 22, 2023', action: 'Active' },
]

export const liveFeed = [
  { id: 1, title: 'Revenue target', detail: '82% of September goal reached.', time: '2m ago' },
  { id: 2, title: 'Campaign traffic', detail: 'Organic visits grew 14% today.', time: '12m ago' },
  { id: 3, title: 'Team sync', detail: 'Design review starts in 25 minutes.', time: '28m ago' },
]

export const systemAlerts = [
  { id: 1, title: 'Database connection error', detail: 'Primary analytics node disconnected for 2 minutes.', level: 'critical' },
  { id: 2, title: 'API rate limit exceeded', detail: 'Public metrics endpoint reached 92% of the quota.', level: 'warning' },
  { id: 3, title: 'Delayed background job', detail: 'Nightly export is running 18 minutes behind schedule.', level: 'info' },
]
