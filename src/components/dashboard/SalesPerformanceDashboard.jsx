import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardBody } from '../ui/Card'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Activity,
  BarChart3,
  Calendar,
  Zap,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  FileText,
  Home,
  PieChart
} from 'lucide-react'
import '../../styles/dashboard-animations.css'
import { cn } from '../../utils/cn'

export const SalesPerformanceDashboard = () => {
  const [showNotification, setShowNotification] = useState(true)
  const [animationStarted, setAnimationStarted] = useState(false)
  const [timePeriod, setTimePeriod] = useState('7D')
  const [activeDay, setActiveDay] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Sales data
  const salesPerformance = {
    percentage: 80,
    salesNumber: 1660,
    salesGrowth: 11,
    totalRevenue: 92120,
    revenueGrowth: -2
  }

  const quarterlyReports = [
    { month: 'Jan', amount: 14.2, color: 'bg-blue-500' },
    { month: 'Feb', amount: 21.8, color: 'bg-emerald-500' },
    { month: 'Mar', amount: 17.5, color: 'bg-orange-500' },
    { month: 'Apr', amount: 27.2, color: 'bg-purple-500' }
  ]

  const priceData = [
    { month: 'Mar', value: 40 },
    { month: 'Apr', value: 65 },
    { month: 'May', value: 45 },
    { month: 'Jun', value: 75 },
    { month: 'Jul', value: 60 },
    { month: 'Aug', value: 85 }
  ]

  const maxAmount = Math.max(...quarterlyReports.map(item => item.amount))

  // Weekly chart data
  const weeklyStats = [
    { day: 'Sat', revenue: 3200, visitors: 1200 },
    { day: 'Sun', revenue: 4800, visitors: 1600 },
    { day: 'Mon', revenue: 3900, visitors: 1400 },
    { day: 'Tue', revenue: 5400, visitors: 1900 },
    { day: 'Wed', revenue: 6100, visitors: 2200 },
    { day: 'Thu', revenue: 5100, visitors: 1800 },
    { day: 'Fri', revenue: 7200, visitors: 2600 },
  ]

  // Helper to generate smooth SVG path
  const generateAreaPath = (width, height, padding) => {
    const points = weeklyStats.map((item, index) => {
      const x = padding + (index * (width - padding * 2)) / (weeklyStats.length - 1)
      const y = height - padding - (item.revenue / 8000) * (height - padding * 2)
      return { x, y }
    })

    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 1; i < points.length; i++) {
      const cpX1 = points[i - 1].x + (points[i].x - points[i - 1].x) / 2
      const cpY1 = points[i - 1].y
      const cpX2 = points[i - 1].x + (points[i].x - points[i - 1].x) / 2
      const cpY2 = points[i].y
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${points[i].x} ${points[i].y}`
    }

    const fillD = `${d} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    return { lineD: d, fillD, points }
  }

  const chartWidth = 600
  const chartHeight = 220
  const chartPadding = 25
  const { lineD, fillD, points: chartPoints } = generateAreaPath(chartWidth, chartHeight, chartPadding)

  return (
    <div className="space-y-6 p-6 animate-fade-in-up">
      {/* Single Dashboard Overview Card - Merged Hero + Stats */}
      <div className="bg-[#F8F8F6] dark:bg-slate-900 rounded-[16px] xs:rounded-[20px] p-4 xs:p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 xs:gap-6">
          {/* Left: User Info + Quick Actions */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3 xs:gap-4">
              <div className="relative">
                <div className="w-12 xs:w-14 h-12 xs:h-14 rounded-xl xs:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Sales Dashboard</p>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Performance Overview</h1>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg font-bold text-xs gap-2 px-4 py-2 rounded-xl flex items-center">
                <Plus className="w-4 h-4 text-white" />
                <span>Add Property</span>
              </button>
              <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 font-bold text-xs gap-2 px-4 py-2 rounded-xl flex items-center shadow-sm">
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Export Data</span>
              </button>
              <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 font-bold text-xs gap-2 px-4 py-2 rounded-xl flex items-center shadow-sm">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>View Reports</span>
              </button>
            </div>
          </div>

          {/* Right: Irregular Stat Cards */}
          <div className="flex-1 lg:flex-none">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Revenue - Big Card */}
              <div className="col-span-2 lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Revenue</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">${salesPerformance.totalRevenue.toLocaleString()}</p>
                  <div className={cn(
                    "flex items-center gap-1 mt-1 text-xs font-bold",
                    salesPerformance.revenueGrowth > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-orange-600 dark:text-orange-400"
                  )}>
                    {salesPerformance.revenueGrowth > 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    <span>{salesPerformance.revenueGrowth > 0 ? '+' : ''}{salesPerformance.revenueGrowth}%</span>
                  </div>
                </div>
              </div>

              {/* Sales - Centered Small Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <BarChart3 className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Sales</p>
                </div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{salesPerformance.salesNumber.toLocaleString()}</p>
              </div>

              {/* Performance - Vertical Progress Ring */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="relative w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 mb-1.5">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="24" cy="24" r="19" stroke="#e2e8f0" strokeWidth="4" fill="none" className="dark:stroke-slate-700" />
                    <circle
                      cx="24"
                      cy="24"
                      r="19"
                      stroke="url(#occupancyGradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="119.38"
                      strokeDashoffset="23.88"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs xs:text-sm font-extrabold text-slate-900 dark:text-white">{salesPerformance.percentage}%</span>
                  </div>
                </div>
                <p className="text-[10px] xs:text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Overview Chart with Time Switch */}
      <div className="bg-[#F8F8F6] dark:bg-slate-900 rounded-[16px] xs:rounded-[20px] p-4 xs:p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Portfolio Overview</h3>
            <p className="text-xs text-slate-500 mt-1">Revenue performance over time</p>
          </div>
          {/* Time Switch */}
          <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
            {['7D', '30D', '90D'].map((period) => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-md transition-all',
                  timePeriod === period
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative w-full aspect-[600/220] min-h-[200px] bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* Subtle Grid lines */}
            {[0, 1, 2, 3, 4].map((g) => {
              const y = chartPadding + (g * (chartHeight - chartPadding * 2)) / 4
              return (
                <line
                  key={g}
                  x1={chartPadding}
                  y1={y}
                  x2={chartWidth - chartPadding}
                  y2={y}
                  className="stroke-slate-200 dark:stroke-slate-700 stroke-1"
                  strokeDasharray="4 4"
                />
              )
            })}

            {/* Gradient Area Fill */}
            <path d={fillD} fill="url(#chartGradient)" />

            {/* Smooth Spline Curve Line */}
            <path
              d={lineD}
              fill="none"
              className="stroke-emerald-500 stroke-[2.5]"
            />

            {/* Plot Points and Interaction Markers */}
            {chartPoints.map((pt, idx) => {
              const isActive = activeDay === idx
              return (
                <g key={idx} className="cursor-pointer transition-all duration-300 ease-in-out">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={20}
                    fill="transparent"
                    onMouseEnter={() => setActiveDay(idx)}
                    onMouseLeave={() => setActiveDay(null)}
                    className="hidden sm:block"
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={25}
                    fill="transparent"
                    onMouseEnter={() => setActiveDay(idx)}
                    onMouseLeave={() => setActiveDay(null)}
                    className="sm:hidden"
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? 6 : 4.5}
                    className={cn(
                      'transition-all duration-300 ease-in-out',
                      isActive
                        ? 'fill-emerald-600 stroke-white stroke-2'
                        : 'fill-white stroke-emerald-500 stroke-2 hover:scale-125'
                    )}
                  />
                </g>
              )
            })}

            {/* X-Axis labels */}
            {chartPoints.map((pt, idx) => (
              <text
                key={idx}
                x={pt.x}
                y={chartHeight - 8}
                textAnchor="middle"
                className="fill-slate-500 dark:fill-slate-400 font-medium text-[10px] select-none"
              >
                {weeklyStats[idx].day}
              </text>
            ))}
          </svg>

          {/* Custom Tooltip */}
          <AnimatePresence>
            {activeDay !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="chart-tooltip"
                style={{
                  '--tooltip-left': `${(chartPoints[activeDay].x / chartWidth) * 100}%`,
                  '--tooltip-top': `${(chartPoints[activeDay].y / chartHeight) * 100 - 40}%`,
                  left: 'var(--tooltip-left)',
                  top: 'var(--tooltip-top)',
                }}
              >
                <div className="chart-tooltip__day">
                  {weeklyStats[activeDay].day}
                </div>
                <div className="chart-tooltip__revenue">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>${weeklyStats[activeDay].revenue.toLocaleString()}</span>
                </div>
                <div className="chart-tooltip__visitors">
                  <Users className="w-3 h-3" />
                  <span>{weeklyStats[activeDay].visitors.toLocaleString()} visitors</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM SECTION: Enhanced Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
        {/* Card 1: Recent Activity */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2 border-0">
            <h4 className="text-[10px] xs:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Recent Activity
            </h4>
          </CardHeader>
          <CardBody className="pt-0 space-y-2 xs:space-y-3">
            <div className="space-y-2 xs:space-y-3">
              {[
                { action: 'New property added', time: '2 hours ago', icon: Home, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' },
                { action: 'Payment received', time: '5 hours ago', icon: DollarSign, color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' },
                { action: 'Tenant inquiry', time: '1 day ago', icon: Users, color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
              ].map((item, idx) => {
                const IconComp = item.icon
                return (
                  <div key={idx} className="flex items-center gap-2 xs:gap-3 p-1.5 xs:p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className={`w-7 xs:w-8 h-7 xs:h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                      <IconComp className="w-3.5 xs:w-4 h-3.5 xs:h-4 stroke-[2.2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] xs:text-xs font-medium text-slate-900 dark:text-white truncate">{item.action}</p>
                      <p className="text-[9px] xs:text-[10px] text-slate-500">{item.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <button className="w-full text-[10px] xs:text-xs font-medium text-emerald-600 hover:text-emerald-700 py-1.5 xs:py-2 rounded-lg border border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800/50 dark:hover:bg-emerald-950/30 transition-colors">
              View All Activity
            </button>
          </CardBody>
        </Card>

        {/* Card 2: Upcoming Tasks */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2 border-0">
            <h4 className="text-[10px] xs:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Upcoming Tasks
            </h4>
          </CardHeader>
          <CardBody className="pt-0 space-y-2 xs:space-y-3">
            <div className="space-y-2 xs:space-y-3">
              {[
                { task: 'Property inspection', date: 'Tomorrow', priority: 'high', icon: Target, color: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400' },
                { task: 'Lease renewal meeting', date: 'In 3 days', priority: 'medium', icon: Activity, color: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' },
                { task: 'Maintenance request', date: 'Next week', priority: 'low', icon: Zap, color: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' },
              ].map((item, idx) => {
                const IconComp = item.icon
                return (
                  <div key={idx} className="flex items-center gap-2 xs:gap-3 p-1.5 xs:p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className={`w-7 xs:w-8 h-7 xs:h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                      <IconComp className="w-3.5 xs:w-4 h-3.5 xs:h-4 stroke-[2.2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] xs:text-xs font-medium text-slate-900 dark:text-white truncate">{item.task}</p>
                      <p className="text-[9px] xs:text-[10px] text-slate-500">{item.date}</p>
                    </div>
                    <div className={`w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full ${item.priority === 'high' ? 'bg-rose-500' :
                        item.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`} />
                  </div>
                )
              })}
            </div>
            <button className="w-full text-[10px] xs:text-xs font-medium text-emerald-600 hover:text-emerald-700 py-1.5 xs:py-2 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors">
              Add New Task
            </button>
          </CardBody>
        </Card>

        {/* Card 3: Quick Stats */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="pb-2 border-0">
            <h4 className="text-[10px] xs:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Quick Stats
            </h4>
          </CardHeader>
          <CardBody className="pt-0 space-y-3 xs:space-y-4">
            <div className="grid grid-cols-2 gap-2 xs:gap-3">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg xs:rounded-xl p-2 xs:p-3 text-center">
                <div className="text-xl xs:text-2xl font-bold text-emerald-600 dark:text-emerald-400">24</div>
                <div className="text-[9px] xs:text-[10px] text-emerald-700 dark:text-emerald-500 font-medium">Active Listings</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg xs:rounded-xl p-2 xs:p-3 text-center">
                <div className="text-xl xs:text-2xl font-bold text-blue-600 dark:text-blue-400">12</div>
                <div className="text-[9px] xs:text-[10px] text-blue-700 dark:text-blue-500 font-medium">Pending Deals</div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg xs:rounded-xl p-2 xs:p-3 text-center">
                <div className="text-xl xs:text-2xl font-bold text-amber-600 dark:text-amber-400">8</div>
                <div className="text-[9px] xs:text-[10px] text-amber-700 dark:text-amber-500 font-medium">Maintenance</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg xs:rounded-xl p-2 xs:p-3 text-center">
                <div className="text-xl xs:text-2xl font-bold text-purple-600 dark:text-purple-400">95%</div>
                <div className="text-[9px] xs:text-[10px] text-purple-700 dark:text-purple-500 font-medium">Satisfaction</div>
              </div>
            </div>
            <button className="w-full text-[10px] xs:text-xs font-medium text-slate-600 hover:text-slate-700 py-1.5 xs:py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              View Detailed Reports
            </button>
          </CardBody>
        </Card>
      </div>

      {/* Q1 Sale Reports */}
      <Card className="card-hover shadow-xl border-0 bg-gradient-to-br from-white via-emerald-50/30 to-emerald-50/50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-emerald-950/50">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            Q1 Sale Reports
          </h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {quarterlyReports.map((item, index) => (
              <div key={item.month} className="space-y-2 group">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.month}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">${item.amount}k</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: animationStarted ? `${(item.amount / maxAmount) * 100}%` : '0%' }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-4 flex items-start gap-3 max-w-sm">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <PieChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Sales Target Achieved!</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your team has exceeded Q1 goals by 15%</p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="flex-shrink-0 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
