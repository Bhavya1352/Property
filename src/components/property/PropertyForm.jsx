import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { propertySchema } from '../../utils/validation'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'

export const PropertyForm = ({ onSubmit, initialData = null, loading = false }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData || {
      type: 'apartment',
      status: 'available',
    },
  })

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'studio', label: 'Studio' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'loft', label: 'Loft' },
  ]

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'occupied', label: 'Occupied' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Property Title"
          placeholder="Enter property title"
          error={errors.title?.message}
          {...register('title')}
        />
        <Select
          label="Property Type"
          options={propertyTypes}
          error={errors.type?.message}
          {...register('type')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Location"
          placeholder="Enter property location"
          error={errors.location?.message}
          {...register('location')}
        />
        <Input
          label="Monthly Rent ($)"
          type="number"
          placeholder="Enter monthly rent"
          error={errors.rent?.message}
          {...register('rent', { valueAsNumber: true })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register('status')}
        />
        <Input
          label="Bedrooms"
          type="number"
          placeholder="Number of bedrooms"
          error={errors.bedrooms?.message}
          {...register('bedrooms', { valueAsNumber: true })}
        />
        <Input
          label="Bathrooms"
          type="number"
          placeholder="Number of bathrooms"
          error={errors.bathrooms?.message}
          {...register('bathrooms', { valueAsNumber: true })}
        />
      </div>

      <Textarea
        label="Description"
        placeholder="Enter property description"
        rows={4}
        error={errors.description?.message}
        {...register('description')}
      />

      <Input
        label="Image URL"
        type="url"
        placeholder="https://example.com/image.jpg"
        error={errors.image?.message}
        {...register('image')}
      />

      <div className="flex gap-4 pt-4">
        <Button type="submit" loading={loading} fullWidth>
          {initialData ? 'Update Property' : 'Add Property'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => reset()} fullWidth>
          Reset
        </Button>
      </div>
    </form>
  )
}
