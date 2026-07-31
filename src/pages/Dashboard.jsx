import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Home, CheckCircle2, AlertCircle, DollarSign, Shield, ArrowUpRight, TrendingUp, TrendingDown, Users, Sparkles, Building2, HelpCircle } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { PropertyCard } from '../components/property/PropertyCard'
import { PropertyTableView } from '../components/property/PropertyTableView'
import { PropertyFilters } from '../components/property/PropertyFilters'
import { Pagination } from '../components/common/Pagination'
import { ConfirmModal } from '../components/common/ConfirmModal'
import { CardSkeleton } from '../components/ui/LoadingSkeleton'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Toast } from '../components/ui/Toast'
import { Card, CardBody, CardHeader } from '../components/ui/Card'
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

  const stats = getStats()

  // Daily statistical mock data for the main area chart
  const weeklyStats = [
    { day: 'Sat', revenue: 3200, visitors: 1200 },
    { day: 'Sun', revenue: 4800, visitors: 1600 },
    { day: 'Mon', revenue: 3900, visitors: 1400 },
    { day: 'Tue', revenue: 5400, visitors: 1900 },
    { day: 'Wed', revenue: 6100, visitors: 2200 },
    { day: 'Thu', revenue: 5100, visitors: 1800 },
    { day: 'Fri', revenue: 7200, visitors: 2600 },
  ]

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

      <div className="space-y-6 pb-12">
        {/* Premium Hero Section */}
        <div className="bg-gradient-to-r from-slate-50 to-emerald-50/30 rounded-[16px] xs:rounded-[20px] p-4 xs:p-5 sm:p-6 border border-slate-200/50 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 xs:gap-6">
            {/* Left: Avatar + Greeting */}
            <div className="flex items-center gap-3 xs:gap-4">
              <div className="relative">
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                  alt={user?.name}
                  className="w-10 xs:w-12 sm:w-14 h-10 xs:h-12 sm:h-14 rounded-xl xs:rounded-2xl object-cover border-2 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-3 xs:w-4 h-3 xs:h-4 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-[10px] xs:text-xs text-slate-500 font-medium">Welcome back,</p>
                <h1 className="text-lg xs:text-xl font-bold text-slate-900">{user?.name || 'User'}</h1>
                <div className="flex items-center gap-2 xs:gap-3 mt-1">
                  <span className="text-[10px] xs:text-xs text-slate-500">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="text-[10px] xs:text-xs text-slate-400">•</span>
                  <span className="text-[10px] xs:text-xs text-amber-600 font-medium">☀️ 28°C</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Stats */}
            <div className="flex flex-wrap gap-2 xs:gap-3 sm:gap-4">
              <div className="bg-white rounded-xl xs:rounded-2xl px-3 xs:px-4 py-2 xs:py-3 border border-slate-200 shadow-sm min-w-[100px] xs:min-w-[120px]">
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <div className="w-6 xs:w-8 h-6 xs:h-8 rounded-lg xs:rounded-xl bg-emerald-100 flex items-center justify-center">
                    <DollarSign className="w-3 xs:w-4 h-3 xs:h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[9px] xs:text-[10px] text-slate-500 font-medium">Revenue</p>
                    <p className="text-xs xs:text-sm font-bold text-slate-900">{formatCurrency(stats.monthlyRevenue || 24000)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl xs:rounded-2xl px-3 xs:px-4 py-2 xs:py-3 border border-slate-200 shadow-sm min-w-[100px] xs:min-w-[120px]">
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <div className="w-6 xs:w-8 h-6 xs:h-8 rounded-lg xs:rounded-xl bg-amber-100 flex items-center justify-center">
                    <Home className="w-3 xs:w-4 h-3 xs:h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[9px] xs:text-[10px] text-slate-500 font-medium">Properties</p>
                    <p className="text-xs xs:text-sm font-bold text-slate-900">{properties?.length || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl xs:rounded-2xl px-3 xs:px-4 py-2 xs:py-3 border border-slate-200 shadow-sm min-w-[100px] xs:min-w-[120px]">
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <div className="w-6 xs:w-8 h-6 xs:h-8 rounded-lg xs:rounded-xl bg-blue-100 flex items-center justify-center">
                    <Users className="w-3 xs:w-4 h-3 xs:h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[9px] xs:text-[10px] text-slate-500 font-medium">Tenants</p>
                    <p className="text-xs xs:text-sm font-bold text-slate-900">{stats.occupiedUnits || 12}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Property Button */}
            {user?.role === 'admin' && (
              <Link to="/property/add">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg font-bold text-[10px] xs:text-xs gap-1.5 xs:gap-2 px-3 xs:px-4 py-2 xs:py-2.5">
                  <Plus className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
                  <span className="hidden xs:inline">Add Property</span>
                  <span className="xs:hidden">Add</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* TOP ROW: Growth Statistics & Area Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xs:gap-5 sm:gap-6">
          {/* Growth Cards Side Panel (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-3 xs:gap-4">
            {/* Total Revenue Gradient Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-xl xs:rounded-2xl p-4 xs:p-5 shadow-lg relative overflow-hidden flex-1 flex flex-col justify-between min-h-[120px] xs:min-h-[140px]">
              <div>
                <p className="text-[9px] xs:text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                  Growth Statistic
                </p>
                <h4 className="text-[10px] xs:text-xs text-emerald-100 mt-1 xs:mt-2 font-medium">Total Revenue</h4>
              </div>
              <div className="flex items-baseline justify-between z-10">
                <h3 className="text-2xl xs:text-3xl font-extrabold tracking-tight">
                  {formatCurrency(stats.monthlyRevenue || 24000)}
                </h3>
                <div className="flex items-center gap-0.5 xs:gap-1 bg-white/10 px-1.5 xs:px-2 py-0.5 rounded-lg text-[10px] xs:text-xs font-bold text-emerald-300">
                  <ArrowUpRight className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                  <span>+12.4%</span>
                </div>
              </div>
              {/* Background accent shapes */}
              <div className="absolute -right-6 xs:-right-8 -top-6 xs:-top-8 w-16 xs:w-24 h-16 xs:h-24 bg-white/5 rounded-full pointer-events-none" />
              <div className="absolute left-6 xs:left-10 bottom-0 w-24 xs:w-32 h-8 xs:h-10 bg-gradient-to-t from-emerald-700/20 to-transparent blur-md pointer-events-none" />
            </div>

            {/* Visitors Light Mint Card */}
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 rounded-xl xs:rounded-2xl p-4 xs:p-5 shadow-sm flex-1 flex flex-col justify-between min-h-[120px] xs:min-h-[140px]">
              <div>
                <p className="text-[9px] xs:text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Visitors
                </p>
                <div className="flex items-baseline justify-between mt-1 xs:mt-2">
                  <h3 className="text-xl xs:text-2xl font-extrabold text-emerald-900 dark:text-emerald-200">
                    16.2K <span className="text-[10px] xs:text-xs font-medium text-emerald-600 dark:text-emerald-400">user</span>
                  </h3>
                  <div className="flex items-center gap-0.5 text-[10px] xs:text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <ArrowUpRight className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                    <span>+8.2%</span>
                  </div>
                </div>
              </div>

              {/* Handcrafted segment ticking meters */}
              <div className="space-y-1 xs:space-y-1.5">
                <div className="flex items-center gap-0.5 xs:gap-1">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'h-3 xs:h-4 w-1 xs:w-1.5 rounded-full transition-all duration-300',
                        i < 10
                          ? 'bg-emerald-500 shadow-glow'
                          : 'bg-slate-200 dark:bg-slate-800'
                      )}
                    />
                  ))}
                </div>
                <p className="text-[9px] xs:text-[10px] text-black font-bold font-medium">
                  Average daily traffic capacity
                </p>
              </div>
            </div>
          </div>

          {/* Curved Area Line Chart (8 cols) */}
          <div className="lg:col-span-8">
            <Card className="h-full flex flex-col justify-between bg-slate-50/50 border-slate-200/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-0">
                <div>
                  <h3 className="text-[10px] xs:text-xs font-bold uppercase tracking-wider text-slate-500">
                    Revenue in day Statistic
                  </h3>
                  <p className="text-[9px] xs:text-[10px] text-slate-400">Weekly progression report</p>
                </div>
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <Badge variant="available">Live Update</Badge>
                </div>
              </CardHeader>
              <CardBody className="p-3 xs:p-4 pt-0">
                {/* Responsive SVG Container */}
                <div className="relative w-full aspect-[600/220] min-h-[140px] xs:min-h-[160px] sm:min-h-[180px] bg-white/50 rounded-xl p-1.5 xs:p-2">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    {[0, 1, 2, 3].map((g) => {
                      const y = chartPadding + (g * (chartHeight - chartPadding * 2)) / 3
                      return (
                        <line
                          key={g}
                          x1={chartPadding}
                          y1={y}
                          x2={chartWidth - chartPadding}
                          y2={y}
                          className="stroke-slate-100 dark:stroke-slate-800/80 stroke-1"
                        />
                      )
                    })}

                    {/* Gradient Area Fill */}
                    <path d={fillD} fill="url(#chartGradient)" />

                    {/* Smooth Spline Curve Line */}
                    <path
                      d={lineD}
                      fill="none"
                      className="stroke-primary-500 dark:stroke-primary-400 stroke-[2.5]"
                    />

                    {/* Plot Points and Interaction Markers */}
                    {chartPoints.map((pt, idx) => {
                      const isActive = activeDay === idx
                      return (
                        <g key={idx} className="cursor-pointer">
                          {/* Large invisible interactive circle */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={15}
                            fill="transparent"
                            onMouseEnter={() => setActiveDay(idx)}
                            onMouseLeave={() => setActiveDay(null)}
                          />
                          {/* Inner glowing circle */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isActive ? 6 : 4.5}
                            className={cn(
                              'transition-all duration-150',
                              isActive
                                ? 'fill-primary-600 dark:fill-primary-400 stroke-white dark:stroke-slate-900 stroke-2'
                                : 'fill-white dark:fill-slate-900 stroke-primary-500 dark:stroke-primary-400 stroke-2'
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
                        y={chartHeight - 5}
                        textAnchor="middle"
                        className="fill-slate-400 dark:fill-slate-500 font-bold text-[9px] xs:text-[10px] select-none"
                      >
                        {weeklyStats[idx].day}
                      </text>
                    ))}
                  </svg>

                  {/* HTML Hover Tooltip overlay inside SVG */}
                  <AnimatePresence>
                    {activeDay !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bg-slate-900 text-white dark:bg-white dark:text-black900 p-2 xs:p-2.5 rounded-xl shadow-lg border border-slate-800 dark:border-slate-200 pointer-events-none text-[10px] xs:text-xs flex flex-col gap-0.5 z-10"
                        style={{
                          left: `${(chartPoints[activeDay].x / chartWidth) * 100}%`,
                          top: `${(chartPoints[activeDay].y / chartHeight) * 100 - 32}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <span className="font-bold text-[10px] text-black font-bold dark:text-black500 uppercase tracking-wide">
                          {weeklyStats[activeDay].day} Revenue
                        </span>
                        <span className="font-extrabold text-sm">
                          {formatCurrency(weeklyStats[activeDay].revenue)}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* MIDDLE SECTION: Filters, Grid/Table Switch, Properties List */}
        <div className="space-y-6">
          <PropertyFilters viewMode={viewMode} onViewChange={setViewMode} />

          {/* Properties Area */}
          {loading ? (
            <CardSkeleton count={6} />
          ) : paginatedProperties.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-sm">
              <Home className="w-12 h-12 text-black300 dark:text-black700 mx-auto" />
              <h3 className="text-lg font-bold text-black font-bold">
                No property matching criteria
              </h3>
              <p className="text-xs text-black font-bold max-w-xs mx-auto">
                No listings matched your active filter or search keywords. Click below or reset search parameters.
              </p>
              {user?.role === 'admin' && (
                <Link to="/property/add">
                  <Button size="sm">Create First Property</Button>
                </Link>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
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

        {/* BOTTOM SECTION: Handcrafted SaaS Analytics Mockups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
          {/* Card 1: Sales Performance Circular Gauge */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-2 border-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black font-bold">
                Sales Performance
              </h4>
            </CardHeader>
            <CardBody className="pt-0 space-y-6">
              {/* Semi-circular gauge */}
              <div className="relative flex justify-center items-center py-4">
                <svg width="180" height="100" className="overflow-visible">
                  {/* Background Track Arc */}
                  <path
                    d="M 20 90 A 70 70 0 0 1 160 90"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="dark:stroke-slate-800"
                  />
                  {/* Foreground Filled Arc */}
                  <path
                    d="M 20 90 A 70 70 0 0 1 160 90"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="220"
                    strokeDashoffset="44" // 80% completion
                    className="shadow-glow"
                  />
                </svg>
                <div className="absolute top-10 flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-black font-bold">80%</span>
                  <span className="text-[10px] font-bold text-black font-bold uppercase tracking-wide">Capacity</span>
                </div>
              </div>

              {/* Mini Indicators */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-center">
                <div>
                  <p className="text-[10px] text-black font-bold dark:text-black500 uppercase tracking-wide">Sales Number</p>
                  <p className="text-base font-extrabold text-black font-bold mt-0.5">1,660</p>
                  <p className="text-[9px] text-emerald-500 font-bold flex items-center justify-center mt-0.5">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> +11%
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-black font-bold dark:text-black500 uppercase tracking-wide">Total Revenue</p>
                  <p className="text-base font-extrabold text-black font-bold mt-0.5">$92,120</p>
                  <p className="text-[9px] text-rose-500 font-bold flex items-center justify-center mt-0.5">
                    <TrendingDown className="w-3 h-3 mr-0.5" /> -2%
                  </p>
                </div>
              </div>

              {/* Dismissible Alert bar */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-medium text-black600 dark:text-black font-bold">
                <span>⚡ Customers increased daily.</span>
                <span className="cursor-pointer font-bold hover:text-black900">×</span>
              </div>
            </CardBody>
          </Card>

          {/* Card 2: Q1 Sale Reports rounded bar chart */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-2 border-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black font-bold">
                Q1 Sale Reports
              </h4>
            </CardHeader>
            <CardBody className="pt-0 flex-1 flex flex-col justify-end space-y-4">
              {/* Handcrafted bar chart */}
              <div className="flex items-end justify-around h-44 px-2 pt-4">
                {[
                  { month: 'Jan', val: 80, valText: '$14.2k' },
                  { month: 'Feb', val: 120, valText: '$21.8k' },
                  { month: 'Mar', val: 95, valText: '$17.5k' },
                  { month: 'Apr', val: 140, valText: '$27.2k' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer w-full">
                    {/* Tooltip on hover */}
                    <span className="opacity-0 group-hover:opacity-100 bg-slate-900 text-white dark:bg-slate-200 dark:text-black900 text-[9px] font-bold py-1 px-1.5 rounded transition-opacity shadow absolute -translate-y-16">
                      {item.valText}
                    </span>

                    {/* Striped progress bar */}
                    <div className="w-8 bg-slate-100 dark:bg-slate-800 rounded-lg h-36 flex items-end overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(item.val / 150) * 100}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="w-full bg-gradient-to-t from-primary-700 to-primary-500 relative group-hover:brightness-110"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.15) 5px, rgba(255,255,255,0.15) 10px)',
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-black font-bold">{item.month}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Card 3: Price Change Line Chart with Peak Tag */}
          <Card className="flex flex-col justify-between">
            <CardHeader className="pb-2 border-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-black font-bold">
                Price Change Trend
              </h4>
            </CardHeader>
            <CardBody className="pt-0 space-y-4">
              <div className="relative h-44 pt-6">
                {/* Peak tag label floating */}
                <div
                  className="absolute bg-primary-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow z-10 animate-bounce"
                  style={{ left: '55%', top: '2%' }}
                >
                  $957,354 peak
                </div>

                {/* SVG line */}
                <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Chart fill path */}
                  <path
                    d="M 10 90 Q 60 70, 110 80 T 210 30 T 290 50 L 290 120 L 10 120 Z"
                    fill="url(#barGradient)"
                  />
                  {/* Chart line path */}
                  <path
                    d="M 10 90 Q 60 70, 110 80 T 210 30 T 290 50"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Pulse active dot */}
                  <circle cx="210" cy="30" r="4.5" fill="#047857" className="animate-ping" />
                  <circle cx="210" cy="30" r="3.5" fill="#10b981" />
                </svg>

                {/* Months labels */}
                <div className="flex justify-between text-[8px] font-bold text-black font-bold dark:text-black500 uppercase px-1 mt-1">
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Agency Partners Logos banner */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-around gap-6 opacity-70 hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center gap-1 text-slate-500 font-bold font-extrabold text-xs">
            <Building2 className="w-4 h-4 text-primary-500" />
            <span>John Propp Realty</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 font-bold font-extrabold text-xs">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span>SOWV AGENTS</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 font-bold font-extrabold text-xs">
            <Shield className="w-4 h-4 text-primary-500" />
            <span>VOWS PARTNERS</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
