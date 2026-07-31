import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { PropertyForm } from '../components/property/PropertyForm'
import { Card, CardBody } from '../components/ui/Card'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Toast } from '../components/ui/Toast'
import { useProperty } from '../hooks/useProperty'
import { useToast } from '../hooks/useToast'

export const AddProperty = () => {
  const navigate = useNavigate()
  const { addProperty } = useProperty()
  const { toast, showToast, hideToast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (data) => {
    setLoading(true)
    try {
      addProperty(data)
      showToast('Property created successfully!', 'success')
      setTimeout(() => navigate('/dashboard'), 400)
    } catch (error) {
      showToast('Failed to create property.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <Toast toast={toast} onClose={hideToast} />

      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <Breadcrumbs items={[{ label: 'Properties', path: '/dashboard' }, { label: 'Add Property' }]} />

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Create New Property Listing
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Fill out the details below to add a property to your management portfolio.
          </p>
        </div>

        <Card>
          <CardBody>
            <PropertyForm
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
