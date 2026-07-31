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
  const { updateProperty } = useProperty()
  const { toast, showToast, hideToast } = useToast()
  const [loading, setLoading] = useState(false)

  const property = propertyService.getById(id)

  if (!property) {
    return (
      <DashboardLayout>
        <div className="p-12 text-center">
          <h1 className="text-xl font-bold">Property Not Found</h1>
        </div>
      </DashboardLayout>
    )
  }

  const handleSubmit = (data) => {
    setLoading(true)
    try {
      updateProperty(id, data)
      showToast('Property updated successfully!', 'success')
      setTimeout(() => navigate('/dashboard'), 400)
    } catch (error) {
      showToast('Failed to update property.', 'error')
    } finally {
      setLoading(false)
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
              loading={loading}
              onCancel={() => navigate('/dashboard')}
            />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
