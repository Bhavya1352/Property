import { Search } from 'lucide-react'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { useProperty } from '../../hooks/useProperty'

export const PropertyFilters = () => {
  const { searchQuery, updateSearch, filters, updateFilters, sortBy, updateSort } = useProperty()

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'studio', label: 'Studio' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'loft', label: 'Loft' },
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'occupied', label: 'Occupied' },
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rent-asc', label: 'Rent: Low to High' },
    { value: 'rent-desc', label: 'Rent: High to Low' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            placeholder="Search by title or location..."
            value={searchQuery}
            onChange={(e) => updateSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <Select
          options={propertyTypes}
          value={filters.type}
          onChange={(e) => updateFilters({ ...filters, type: e.target.value })}
        />
        <Select
          options={statusOptions}
          value={filters.status}
          onChange={(e) => updateFilters({ ...filters, status: e.target.value })}
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(e) => updateSort(e.target.value)}
        />
      </div>
    </div>
  )
}
