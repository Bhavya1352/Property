import { useParams, useNavigate, Link } from 'react-router-dom'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Card, CardBody, CardHeader } from '../components/ui/Card'
import { PropertyForm } from '../components/property/PropertyForm'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Button } from '../components/ui/Button'
import { useProperty } from '../hooks/useProperty'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/ui/Toast'
import { propertyService } from '../services/propertyService'
import { useState } from 'react'

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
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Property not found</h1>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      updateProperty(id, data)
      showToast('Property updated successfully!', 'success')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (error) {
      showToast('Failed to update property. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <Toast toast={toast} onClose={hideToast} />

      <div className="p-4 md:p-8 max-w-4xl space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Properties', path: '/dashboard' }, { label: property.title, path: `/property/${id}` }, { label: 'Edit' }]} />

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Property</h1>
          <p className="text-slate-600">Update the property details</p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader className="border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Property Details</h2>
          </CardHeader>
          <CardBody>
            <PropertyForm onSubmit={handleSubmit} initialData={property} loading={loading} />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
