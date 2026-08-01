import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { PropertyForm } from '../components/property/PropertyForm'
import { Card, CardBody } from '../components/ui/Card'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Toast } from '../components/ui/Toast'
import { useProperty } from '../hooks/useProperty'
import { useToast } from '../hooks/useToast'
import { propertyService } from '../services/propertyService'

export const EditProperty = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateProperty, loading } = useProperty()
  const { toast, showToast, hideToast } = useToast()
  const [formLoading, setFormLoading] = useState(false)

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
          <h1 className="text-xl xs:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Property Not Found
          </h1>
          <p className="text-slate-500 text-[10px] xs:text-sm">The property listing you requested does not exist or was removed.</p>
        </div>
      </DashboardLayout>
    )
  }

  const handleSubmit = (data) => {
    setFormLoading(true)
    try {
      updateProperty(id, data)
      showToast('Property updated successfully!', 'success')
      setTimeout(() => navigate('/dashboard'), 400)
    } catch (error) {
      showToast('Failed to update property.', 'error')
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <Toast toast={toast} onClose={hideToast} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <Breadcrumbs items={[{ label: 'Properties', path: '/dashboard' }, { label: property.title, path: `/property/${property.id}` }, { label: 'Edit' }]} />

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Edit Property Listing
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Update listing parameters, status, or pricing for property #{property.id}.
          </p>
        </div>

        <Card>
          <CardBody>
            <PropertyForm
              initialValues={property}
              onSubmit={handleSubmit}
              loading={formLoading}
              onCancel={() => navigate('/dashboard')}
            />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
