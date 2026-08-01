import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Bed, Bath, MapPin, DollarSign, Edit3, Trash2, Calendar, ShieldCheck, CheckCircle2, Home } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Card, CardBody, CardHeader } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ConfirmModal } from '../components/common/ConfirmModal'
import { Toast } from '../components/ui/Toast'
import { useProperty } from '../hooks/useProperty'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { propertyService } from '../services/propertyService'
import { formatCurrency, formatDate, formatPropertyType, formatStatus } from '../utils/format'

export const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { deleteProperty, loading } = useProperty()
  const { toast, showToast, hideToast } = useToast()
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const property = propertyService.getById(id)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 xs:p-8 sm:p-12 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 text-sm">Loading property details...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!property) {
    return (
      <DashboardLayout>
        <div className="p-6 xs:p-8 sm:p-12 text-center space-y-4">
          <Home className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h1 className="text-xl xs:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Property Not Found
          </h1>
          <p className="text-slate-500 text-[10px] xs:text-sm">The property listing you requested does not exist or was removed.</p>
          <Link to="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const handleDelete = () => {
    deleteProperty(id)
    showToast('Property deleted successfully', 'success')
    setTimeout(() => navigate('/dashboard'), 400)
  }

  return (
    <DashboardLayout>
      <Toast toast={toast} onClose={hideToast} />

      <ConfirmModal
        isOpen={deleteConfirm}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirm(false)}
      />

      <div className="space-y-4 xs:space-y-5 sm:space-y-6 pb-8 xs:pb-10 sm:pb-12">
        <Breadcrumbs items={[{ label: 'Properties', path: '/dashboard' }, { label: property.title }]} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 xs:gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-3 xs:w-4 h-3 xs:h-4 mr-0.5 xs:mr-1" />
              <span className="text-[10px] xs:text-xs">Back to Properties</span>
            </Button>
          </Link>

          {user?.role === 'admin' && (
            <div className="flex items-center gap-1.5 xs:gap-2">
              <Link to={`/property/edit/${property.id}`}>
                <Button variant="secondary" size="sm">
                  <Edit3 className="w-3 xs:w-4 h-3 xs:h-4 mr-0.5 xs:mr-1" />
                  <span className="text-[10px] xs:text-xs">Edit Property</span>
                </Button>
              </Link>
              <Button variant="danger" size="sm" onClick={() => setDeleteConfirm(true)}>
                <Trash2 className="w-3 xs:w-4 h-3 xs:h-4 mr-0.5 xs:mr-1" />
                <span className="text-[10px] xs:text-xs">Delete</span>
              </Button>
            </div>
          )}
        </div>

        {/* Featured Image */}
        <div className="relative h-56 xs:h-64 sm:h-80 lg:h-96 rounded-xl xs:rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
            }}
          />
          <div className="absolute top-3 xs:top-4 right-3 xs:right-4 flex gap-1.5 xs:gap-2">
            <Badge variant={property.status} className="text-[10px] xs:text-xs sm:text-sm px-2 xs:px-3 py-0.5 xs:py-1 shadow-lg backdrop-blur-md">
              {formatStatus(property.status)}
            </Badge>
          </div>
          <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4">
            <span className="px-2 xs:px-3 py-0.5 xs:py-1 rounded-lg text-[10px] xs:text-xs font-bold bg-slate-900/80 text-white backdrop-blur-md">
              {formatPropertyType(property.type)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-4 xs:space-y-5 sm:space-y-6">
            <Card>
              <CardBody className="space-y-3 xs:space-y-4">
                <div>
                  <h1 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1.5 xs:gap-2 text-slate-500 dark:text-slate-400 text-[10px] xs:text-sm mt-1.5 xs:mt-2">
                    <MapPin className="w-3 xs:w-4 h-3 xs:h-4 text-primary-600 dark:text-primary-400" />
                    <span>{property.location}</span>
                  </div>
                </div>

                <div className="pt-1.5 xs:pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-[10px] xs:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 xs:mb-2">
                    About Property
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-[10px] xs:text-sm leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Spec grid */}
            <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
              <Card>
                <CardBody className="text-center py-2 xs:py-3 sm:py-4">
                  <Bed className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-primary-600 dark:text-primary-400 mx-auto mb-0.5 xs:mb-1" />
                  <p className="text-base xs:text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">{property.bedrooms}</p>
                  <p className="text-[9px] xs:text-xs text-slate-500 dark:text-slate-400">Bedrooms</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center py-2 xs:py-3 sm:py-4">
                  <Bath className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-primary-600 dark:text-primary-400 mx-auto mb-0.5 xs:mb-1" />
                  <p className="text-base xs:text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">{property.bathrooms}</p>
                  <p className="text-[9px] xs:text-xs text-slate-500 dark:text-slate-400">Bathrooms</p>
                </CardBody>
              </Card>
              <Card>
                <CardBody className="text-center py-2 xs:py-3 sm:py-4">
                  <DollarSign className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-primary-600 dark:text-primary-400 mx-auto mb-0.5 xs:mb-1" />
                  <p className="text-base xs:text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(property.rent)}</p>
                  <p className="text-[9px] xs:text-xs text-slate-500 dark:text-slate-400">Monthly Rent</p>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="space-y-4 xs:space-y-5 sm:space-y-6">
            <Card>
              <CardHeader className="bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-[10px] xs:text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  Financial Overview
                </h3>
              </CardHeader>
              <CardBody className="space-y-2 xs:space-y-3 text-[10px] xs:text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Monthly Rent</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-[10px] xs:text-xs sm:text-sm">{formatCurrency(property.rent)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Annual Revenue</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(property.rent * 12)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Est. Security Deposit</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(property.rent * 1.5)}</span>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader className="bg-slate-50 dark:bg-slate-800/50">
                <h3 className="text-[10px] xs:text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  Metadata & Status
                </h3>
              </CardHeader>
              <CardBody className="space-y-2 xs:space-y-3 text-[10px] xs:text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Property ID</span>
                  <span className="font-mono text-slate-900 dark:text-slate-100 font-bold">#{property.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Listed Date</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{formatDate(property.createdAt)}</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
