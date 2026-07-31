import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Home, CheckCircle2, AlertCircle, DollarSign, Shield, Sparkles } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { PropertyCard } from '../components/property/PropertyCard'
import { PropertyTableView } from '../components/property/PropertyTableView'
import { PropertyFilters } from '../components/property/PropertyFilters'
import { StatCard } from '../components/common/StatCard'
import { RecentActivity } from '../components/common/RecentActivity'
import { Pagination } from '../components/common/Pagination'
import { ConfirmModal } from '../components/common/ConfirmModal'
import { CardSkeleton } from '../components/ui/LoadingSkeleton'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Toast } from '../components/ui/Toast'
import { useProperty } from '../hooks/useProperty'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { formatCurrency } from '../utils/format'

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

  const stats = getStats()

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

      <div className="space-y-8 pb-12">
        {/* Welcome Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="space-y-2 z-10">
            <div className="flex items-center gap-2">
              <Badge variant={user?.role === 'admin' ? 'admin' : 'employee'} className="bg-white/10 text-white border-white/20">
                <Shield className="w-3 h-3 mr-1 inline" />
                {user?.role?.toUpperCase()} MODE
              </Badge>
              <span className="text-xs text-primary-200 font-medium">Real-time SaaS Portfolio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'User'}! 👋
            </h1>
            <p className="text-sm text-primary-100 max-w-xl">
              {user?.role === 'admin'
                ? 'Manage properties, track revenues, add listings, and maintain tenant occupations.'
                : 'Browse available listings, search locations, filter inventory, and check details.'}
            </p>
          </div>

          {user?.role === 'admin' && (
            <div className="z-10 shrink-0">
              <Link to="/property/add">
                <Button size="lg" className="bg-white text-primary-900 hover:bg-primary-50 border-0 shadow-lg font-bold">
                  <Plus className="w-5 h-5 mr-1" />
                  Add Property
                </Button>
              </Link>
            </div>
          )}

          {/* Decorative Background Icon */}
          <Sparkles className="w-64 h-64 absolute -right-10 -bottom-10 text-white/5 pointer-events-none" />
        </div>

        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Total Properties"
            value={stats.total}
            icon={Home}
            color="primary"
            trend="+12% total"
          />
          <StatCard
            title="Available"
            value={stats.available}
            icon={CheckCircle2}
            color="emerald"
            trend="Ready for lease"
          />
          <StatCard
            title="Occupied"
            value={stats.occupied}
            icon={AlertCircle}
            color="amber"
            trend="Generating rent"
          />
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(stats.monthlyRevenue)}
            icon={DollarSign}
            color="blue"
            trend="Calculated total"
          />
        </div>

        {/* Main Content Grid: Filters + Listings & Sidebar Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Property Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters bar */}
            <PropertyFilters viewMode={viewMode} onViewChange={setViewMode} />

            {/* Properties Grid or Table View */}
            {loading ? (
              <CardSkeleton count={6} />
            ) : paginatedProperties.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4 shadow-sm">
                <Home className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  No properties found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs max-w-sm mx-auto">
                  {user?.role === 'admin'
                    ? 'Try resetting your search filters or click below to create a new property.'
                    : 'No properties currently match your selected filters.'}
                </p>
                {user?.role === 'admin' && (
                  <Link to="/property/add" className="inline-block pt-2">
                    <Button>Add Your First Property</Button>
                  </Link>
                )}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>

          {/* Right Sidebar Widget */}
          <div className="space-y-6">
            <RecentActivity />

            {/* Quick Demo Info Box */}
            <div className="p-5 bg-primary-50/50 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900/50 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-primary-900 dark:text-primary-200 uppercase tracking-wider">
                Current Access Scope
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Log in as <strong className="text-slate-900 dark:text-slate-200">Admin</strong> to unlock full CRUD (Create, Edit, Delete with modal confirmation). Log in as <strong className="text-slate-900 dark:text-slate-200">Employee</strong> for read-only view.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
