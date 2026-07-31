import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Card, CardBody, CardHeader } from '../components/ui/Card'
import { PropertyForm } from '../components/property/PropertyForm'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { useProperty } from '../hooks/useProperty'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/ui/Toast'
import { useState } from 'react'

export const AddProperty = () => {
  const navigate = useNavigate()
  const { addProperty } = useProperty()
  const { toast, showToast, hideToast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data) => {
    setLoading(true)
    try {
      addProperty(data)
      showToast('Property added successfully!', 'success')
      setTimeout(() => navigate('/dashboard'), 1000)
    } catch (error) {
      showToast('Failed to add property. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <Toast toast={toast} onClose={hideToast} />

      <div className="p-4 md:p-8 max-w-4xl space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Properties', path: '/dashboard' }, { label: 'Add Property' }]} />

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Add New Property</h1>
          <p className="text-slate-600">Fill in the details to create a new property listing</p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader className="border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Property Details</h2>
          </CardHeader>
          <CardBody>
            <PropertyForm onSubmit={handleSubmit} loading={loading} />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
