import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Home, DollarSign, ArrowUpRight, Users, Building2, Download, FileText } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { PropertyCard } from '../components/property/PropertyCard'
import { PropertyTableView } from '../components/property/PropertyTableView'
import { PropertyFilters } from '../components/property/PropertyFilters'
import { Pagination } from '../components/common/Pagination'
import { ConfirmModal } from '../components/common/ConfirmModal'
import { CardSkeleton } from '../components/ui/LoadingSkeleton'
import { Button } from '../components/ui/Button'
import { Toast } from '../components/ui/Toast'
import { useProperty } from '../hooks/useProperty'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { formatCurrency } from '../utils/format'
import { cn } from '../utils/cn'

export const Dashboard = () => {
  const {
    paginatedProperties,
    properties,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    deleteProperty,
    getStats,
  } = useProperty()

  const { user } = useAuth()
  const { toast, showToast, hideToast } = useToast()
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [activeDay, setActiveDay] = useState(null)
  const [timePeriod, setTimePeriod] = useState('7D')

  const stats = getStats()

  // Dynamic statistical data map for 7D, 30D, and 90D time periods
  const statsMap = {
    '7D': [
      { day: 'Sat', revenue: 3200, visitors: 1200 },
      { day: 'Sun', revenue: 4800, visitors: 1600 },
      { day: 'Mon', revenue: 3900, visitors: 1400 },
      { day: 'Tue', revenue: 5400, visitors: 1900 },
      { day: 'Wed', revenue: 6100, visitors: 2200 },
      { day: 'Thu', revenue: 5100, visitors: 1800 },
      { day: 'Fri', revenue: 7200, visitors: 2600 },
    ],
    '30D': [
      { day: 'Week 1', revenue: 18500, visitors: 5600 },
      { day: 'Week 2', revenue: 22400, visitors: 7100 },
      { day: 'Week 3', revenue: 27900, visitors: 8900 },
      { day: 'Week 4', revenue: 31200, visitors: 9800 },
    ],
    '90D': [
      { day: 'May', revenue: 62000, visitors: 21000 },
      { day: 'Jun', revenue: 78000, visitors: 26500 },
      { day: 'Jul', revenue: 94500, visitors: 31000 },
    ],
  }

  const activeStats = statsMap[timePeriod] || statsMap['7D']
  const maxRevenue = Math.max(...activeStats.map((item) => item.revenue)) * 1.15

  const handleDeleteTrigger = (id) => {
    setDeleteConfirmId(id)
  }

  const confirmDelete = () => {
    if (deleteConfirmId) {
      deleteProperty(deleteConfirmId)
      showToast('Property deleted successfully', 'success')
      setDeleteConfirmId(null)
    }
  }

  // Helper to generate smooth SVG path for the area chart
  const generateAreaPath = (data, width, height, padding) => {
    const points = data.map((item, index) => {
      const x = padding + (index * (width - padding * 2)) / (data.length - 1)
      const y = height - padding - (item.revenue / maxRevenue) * (height - padding * 2)
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
  const { lineD, fillD, points: chartPoints } = generateAreaPath(activeStats, chartWidth, chartHeight, chartPadding)

  return (
    <DashboardLayout>
      <Toast toast={toast} onClose={hideToast} />

      <ConfirmModal
        isOpen={!!deleteConfirmId}
        title="Delete Property"
        message="Are you sure you want to permanently delete this property? This action will update all statistics immediately."
        confirmText="Delete Property"
        cancelText="Cancel"
        isDangerous
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />

      <div className="space-y-4 xs:space-y-5 sm:space-y-6 pb-8 xs:pb-10 sm:pb-12">
        {/* Single Dashboard Overview Card - Merged Hero + Stats */}
        <div className="bg-[#F8F8F6] dark:bg-slate-900 rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] p-3 xs:p-4 sm:p-5 lg:p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
            {/* Left: User Info + Quick Actions */}
            <div className="flex-1 space-y-3 xs:space-y-4">
              <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                <div className="relative">
                  <img
                    src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                    alt={user?.name}
                    className="w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 rounded-lg xs:rounded-xl sm:rounded-2xl object-cover border-2 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 xs:w-4 h-3 xs:h-4 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p className="text-[10px] xs:text-xs text-slate-500 font-medium">Welcome back,</p>
                  <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{user?.name || 'User'}</h1>
                  <p className="text-[10px] xs:text-xs text-slate-500 mt-0.5 xs:mt-1">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                {user?.role === 'admin' && (
                  <Link to="/property/add">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg font-bold text-xs gap-2 px-3 xs:px-4 py-1.5 xs:py-2">
                      <Plus className="w-4 h-4 text-white" />
                      <span>Add Property</span>
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 font-bold text-xs gap-2 px-3 xs:px-4 py-1.5 xs:py-2 shadow-sm"
                >
                  <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Export Data</span>
                </Button>
                <Button
                  variant="outline"
                  className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 font-bold text-xs gap-2 px-3 xs:px-4 py-1.5 xs:py-2 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>View Reports</span>
                </Button>
              </div>
            </div>

            {/* Right: Irregular Stat Cards */}
            <div className="flex-1 lg:flex-none w-full lg:w-auto">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3">
                {/* Revenue - Big Card */}
                <div className="col-span-2 lg:col-span-1 bg-white dark:bg-slate-800 rounded-lg xs:rounded-xl p-2.5 xs:p-3 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-1.5 xs:mb-2">
                    <div className="w-7 xs:w-8 h-7 xs:h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <DollarSign className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Revenue</p>
                  </div>
                  <div>
                    <p className="text-lg xs:text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{formatCurrency(stats.monthlyRevenue || 24000)}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>+12.4%</span>
                    </div>
                  </div>
                </div>

                {/* Properties - Centered Card */}
                <div className="bg-white dark:bg-slate-800 rounded-lg xs:rounded-xl p-2.5 xs:p-3 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1.5">
                    <div className="w-6 xs:w-7 h-6 xs:h-7 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Building2 className="w-3.5 xs:w-4 h-3.5 xs:h-4 stroke-[2.2]" />
                    </div>
                    <p className="text-[10px] xs:text-xs text-slate-500 dark:text-slate-400 font-semibold">Properties</p>
                  </div>
                  <p className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{properties?.length || 0}</p>
                </div>

                {/* Occupancy - Vertical Progress Ring */}
                <div className="bg-white dark:bg-slate-800 rounded-lg xs:rounded-xl p-2.5 xs:p-3 sm:p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="relative w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16">
                    <svg viewBox="0 0 48 48" className="w-full h-full transform -rotate-90 overflow-visible">
                      <defs>
                        <linearGradient id="occupancyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
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
                      <span className="text-xs xs:text-sm font-extrabold text-slate-900 dark:text-white">80%</span>
                    </div>
                  </div>
                  <p className="text-[10px] xs:text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Occupancy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Overview Chart with Time Switch */}
        <div className="bg-[#F8F8F6] dark:bg-slate-900 rounded-[12px] xs:rounded-[16px] sm:rounded-[20px] p-3 xs:p-4 sm:p-5 lg:p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4">
            <div>
              <h3 className="text-xs xs:text-sm font-bold text-slate-900 dark:text-white">Portfolio Overview</h3>
              <p className="text-[10px] xs:text-xs text-slate-500 mt-0.5 xs:mt-1">Revenue performance over time</p>
            </div>
            {/* Time Switch */}
            <div className="flex bg-white dark:bg-slate-800 rounded-lg xs:rounded-xl p-0.5 xs:p-1 border border-slate-200 dark:border-slate-700">
              {['7D', '30D', '90D'].map((period) => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={cn(
                    'px-2 xs:px-3 py-1 text-[10px] xs:text-xs font-medium rounded-md transition-all',
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
          <div className="relative w-full aspect-[600/220] min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] bg-white dark:bg-slate-800 rounded-lg xs:rounded-xl p-2 xs:p-3 sm:p-4 border border-slate-200 dark:border-slate-700">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
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
                  y={chartHeight - 6}
                  textAnchor="middle"
                  className="fill-slate-500 dark:fill-slate-400 font-medium text-[8px] xs:text-[9px] sm:text-[10px] select-none"
                >
                  {activeStats[idx]?.day}
                </text>
              ))}
            </svg>

            {/* Custom Tooltip */}
            <AnimatePresence>
              {activeDay !== null && activeStats[activeDay] && (
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
                    {activeStats[activeDay].day}
                  </div>
                  <div className="chart-tooltip__revenue">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>{formatCurrency(activeStats[activeDay].revenue)}</span>
                  </div>
                  <div className="chart-tooltip__visitors">
                    <Users className="w-3 h-3" />
                    <span>{activeStats[activeDay].visitors.toLocaleString()} visitors</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MIDDLE SECTION: Filters, Grid/Table Switch, Properties List */}
        <div className="space-y-6">
          <div className="sticky top-16 xs:top-20 sm:top-24 z-10">
            <PropertyFilters viewMode={viewMode} onViewChange={setViewMode} />
          </div>

          {/* Properties Area */}
          {loading ? (
            <CardSkeleton count={6} />
          ) : paginatedProperties.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl xs:rounded-2xl p-6 xs:p-8 sm:p-12 text-center space-y-3 xs:space-y-4 shadow-sm">
              <Home className="w-10 xs:w-12 h-10 xs:h-12 text-slate-300 dark:text-slate-700 mx-auto" />
              <h3 className="text-base xs:text-lg font-bold text-slate-900 dark:text-slate-100">
                No property matching criteria
              </h3>
              <p className="text-[10px] xs:text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                No listings matched your active filter or search keywords. Click below or reset search parameters.
              </p>
              {user?.role === 'admin' && (
                <Link to="/property/add">
                  <Button size="sm">Create First Property</Button>
                </Link>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
              {paginatedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onDelete={handleDeleteTrigger}
                />
              ))}
            </div>
          ) : (
            <PropertyTableView
              properties={paginatedProperties}
              onDelete={handleDeleteTrigger}
            />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
