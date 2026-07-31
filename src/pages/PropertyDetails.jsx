import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Bed, Bath, MapPin, DollarSign, Edit, Trash2 } from 'lucide-react'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Card, CardBody, CardHeader } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { ConfirmModal } from '../components/common/ConfirmModal'
import { useState } from 'react'
import { useProperty } from '../hooks/useProperty'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/ui/Toast'
import { propertyService } from '../services/propertyService'
import { formatCurrency, formatDate, formatPropertyType, formatStatus } from '../utils/format'

export const PropertyDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { deleteProperty } = useProperty()
  const { toast, showToast, hideToast } = useToast()
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const property = propertyService.getById(id)

  if (!property) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Property not found</h1>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const handleDelete = () => {
    deleteProperty(id)
    showToast('Property deleted successfully', 'success')
    setTimeout(() => navigate('/dashboard'), 1000)
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

      <div className="p-4 md:p-8 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Properties', path: '/dashboard' }, { label: property.title }]} />

        {/* Back Button */}
        <Link to="/dashboard">
          <button className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </Link>

        {/* Property Image */}
        <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge variant={property.status}>
              {formatStatus(property.status)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Location */}
            <Card>
              <CardBody className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                  <Badge variant="primary">{formatPropertyType(property.type)}</Badge>
                </div>

                <p className="text-slate-700 leading-relaxed">{property.description}</p>
              </CardBody>
            </Card>

            {/* Property Details Grid */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardBody className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Bed className="w-5 h-5 text-primary-600" />
                    <span className="text-2xl font-bold text-slate-900">{property.bedrooms}</span>
                  </div>
                  <p className="text-sm text-slate-600">Bedrooms</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Bath className="w-5 h-5 text-primary-600" />
                    <span className="text-2xl font-bold text-slate-900">{property.bathrooms}</span>
                  </div>
                  <p className="text-sm text-slate-600">Bathrooms</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                    <span className="text-2xl font-bold text-slate-900">{(property.rent / 1000).toFixed(1)}k</span>
                  </div>
                  <p className="text-sm text-slate-600">Monthly Rent</p>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rent Summary */}
            <Card>
              <CardHeader className="bg-primary-50">
                <h3 className="font-semibold text-slate-900">Rental Information</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Monthly Rent</span>
                  <span className="text-2xl font-bold text-primary-600">{formatCurrency(property.rent)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-slate-600">Annual Revenue</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(property.rent * 12)}</span>
                </div>
              </CardBody>
            </Card>

            {/* Property Info */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-slate-900">Property Info</h3>
              </CardHeader>
              <CardBody className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">Status</p>
                  <p className="font-semibold text-slate-900 capitalize">{formatStatus(property.status)}</p>
                </div>
                <div>
                  <p className="text-slate-600">Type</p>
                  <p className="font-semibold text-slate-900">{formatPropertyType(property.type)}</p>
                </div>
                <div>
                  <p className="text-slate-600">Listed Date</p>
                  <p className="font-semibold text-slate-900">{formatDate(property.createdAt)}</p>
                </div>
              </CardBody>
            </Card>

            {/* Actions */}
            {user?.role === 'admin' && (
              <div className="space-y-3">
                <Link to={`/property/edit/${property.id}`} className="block">
                  <Button variant="primary" fullWidth>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Property
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => setDeleteConfirm(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Property
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
