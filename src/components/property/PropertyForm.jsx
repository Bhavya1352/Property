import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, MapPin, DollarSign, Image as ImageIcon, FileText, Bed, Bath } from 'lucide-react'
import { propertySchema } from '../../utils/validation'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'

export const PropertyForm = ({ initialValues, onSubmit, loading = false, onCancel }) => {
  const [imagePreview, setImagePreview] = useState(initialValues?.image || '')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: initialValues || {
      title: '',
      type: 'apartment',
      location: '',
      rent: 2000,
      status: 'available',
      bedrooms: 2,
      bathrooms: 2,
      description: '',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    },
  })

  const watchImage = watch('image')

  const typeOptions = [
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 xs:space-y-5 sm:space-y-6">
      {/* Title & Location */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-3 xs:gap-4">
        <Input
          label="Property Title"
          placeholder="e.g. Modern Downtown Loft"
          icon={<Building2 className="w-3 xs:w-4 h-3 xs:h-4" />}
          error={errors.title?.message}
          {...register('title')}
        />

        <Input
          label="Location Address"
          placeholder="e.g. 123 Main St, New York, NY"
          icon={<MapPin className="w-3 xs:w-4 h-3 xs:h-4" />}
          error={errors.location?.message}
          {...register('location')}
        />
      </div>

      {/* Type, Status, Rent */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4">
        <Select
          label="Property Type"
          options={typeOptions}
          error={errors.type?.message}
          {...register('type')}
        />

        <Select
          label="Status"
          options={statusOptions}
          error={errors.status?.message}
          {...register('status')}
        />

        <Input
          label="Monthly Rent ($ USD)"
          type="number"
          placeholder="2500"
          icon={<DollarSign className="w-3 xs:w-4 h-3 xs:h-4" />}
          error={errors.rent?.message}
          {...register('rent', { valueAsNumber: true })}
        />
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
        <Input
          label="Bedrooms"
          type="number"
          placeholder="2"
          icon={<Bed className="w-3 xs:w-4 h-3 xs:h-4" />}
          error={errors.bedrooms?.message}
          {...register('bedrooms', { valueAsNumber: true })}
        />

        <Input
          label="Bathrooms"
          type="number"
          placeholder="2"
          icon={<Bath className="w-3 xs:w-4 h-3 xs:h-4" />}
          error={errors.bathrooms?.message}
          {...register('bathrooms', { valueAsNumber: true })}
        />
      </div>

      {/* Image URL & Live Preview */}
      <div className="space-y-1.5 xs:space-y-2">
        <Input
          label="Image URL"
          placeholder="https://images.unsplash.com/..."
          icon={<ImageIcon className="w-3 xs:w-4 h-3 xs:h-4" />}
          error={errors.image?.message}
          {...register('image')}
        />

        {watchImage && (
          <div className="mt-1.5 xs:mt-2 relative h-32 xs:h-40 rounded-lg xs:rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
            <img
              src={watchImage}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
              }}
            />
            <span className="absolute top-1.5 xs:top-2 right-1.5 xs:right-2 px-1.5 xs:px-2 py-0.5 xs:py-1 text-[9px] xs:text-[10px] font-bold bg-slate-900/80 text-white rounded backdrop-blur-md">
              Live Preview
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Provide a detailed description of the property, features, amenities, surrounding area..."
        error={errors.description?.message}
        {...register('description')}
      />

      {/* Form Action Buttons */}
      <div className="flex flex-col xs:flex-row items-center justify-end gap-2 xs:gap-3 pt-3 xs:pt-4 border-t border-slate-100 dark:border-slate-800">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} type="button" className="w-full xs:w-auto">
            Cancel
          </Button>
        )}
        <Button type="submit" loading={loading} className="w-full xs:w-auto">
          {initialValues ? 'Update Property' : 'Create Property'}
        </Button>
      </div>
    </form>
  )
}
