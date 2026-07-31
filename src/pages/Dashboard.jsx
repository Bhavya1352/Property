import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Home, CheckCircle, AlertCircle, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { PropertyCard } from '../components/property/PropertyCard'
import { PropertyFilters } from '../components/property/PropertyFilters'
import { StatCard } from '../components/common/StatCard'
import { Pagination } from '../components/common/Pagination'
import { ConfirmModal } from '../components/common/ConfirmModal'
import { CardSkeleton } from '../components/ui/LoadingSkeleton'
import { Button } from '../components/ui/Button'
import { useProperty } from '../hooks/useProperty'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/ui/Toast'
import { formatCurrency } from '../utils/format'

export const Dashboard = () => {
  const { paginatedProperties, totalPages, currentPage, setCurrentPage, loading, deleteProperty, getStats } = useProperty()
  const { user } = useAuth()
  const { toast, showToast, hideToast } = useToast()
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const stats = getStats()

  const handleDelete = (propertyId) => {
    setDeleteConfirm(propertyId)
  }

  const confirmDelete = () => {
    deleteProperty(deleteConfirm)
    showToast('Property deleted successfully', 'success')
    setDeleteConfirm(null)
  }

  return (
    <DashboardLayout>
      <Toast toast={toast} onClose={hideToast} />
      <ConfirmModal
        isOpen={!!deleteConfirm}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(null)}
      />

      <div className="p-4 md:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-slate-600">Manage your properties efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Properties"
            value={stats.total}
            icon={Home}
            color="primary"
          />
          <StatCard
            title="Available"
            value={stats.available}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            title="Occupied"
            value={stats.occupied}
            icon={AlertCircle}
            color="orange"
          />
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(stats.monthlyRevenue)}
            icon={DollarSign}
            color="blue"
          />
        </div>

        {/* Filters */}
        <PropertyFilters />

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Properties</h2>
          {user?.role === 'admin' && (
            <Link to="/property/add">
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add Property
              </Button>
            </Link>
          )}
        </div>

        {/* Properties Grid */}
        {loading ? (
          <CardSkeleton count={6} />
        ) : paginatedProperties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-soft p-12 text-center">
            <Home className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No properties found</h3>
            <p className="text-slate-600 mb-6">
              {user?.role === 'admin'
                ? 'Create your first property to get started'
                : 'No properties match your filters'}
            </p>
            {user?.role === 'admin' && (
              <Link to="/property/add">
                <Button>Add Your First Property</Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
