import { Search, Filter, ArrowUpDown, LayoutGrid, List, RotateCcw } from 'lucide-react'
import { Select } from '../ui/Select'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useProperty } from '../../hooks/useProperty'

export const PropertyFilters = ({ viewMode = 'grid', onViewChange }) => {
  const { searchQuery, filters, sortBy, updateSearch, updateFilters, updateSort, properties } = useProperty()

  const typeOptions = [
    { value: 'all', label: 'All Property Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'studio', label: 'Studio' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'loft', label: 'Loft' },
  ]

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'available', label: 'Available' },
    { value: 'occupied', label: 'Occupied' },
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rent-asc', label: 'Rent: Low to High' },
    { value: 'rent-desc', label: 'Rent: High to Low' },
  ]

  const handleReset = () => {
    updateSearch('')
    updateFilters({ type: 'all', status: 'all' })
    updateSort('newest')
  }

  const isFiltered = searchQuery !== '' || filters.type !== 'all' || filters.status !== 'all' || sortBy !== 'newest'

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      {/* Top Search and Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <Input
          placeholder="Search by title or location..."
          value={searchQuery}
          onChange={(e) => updateSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />

        {/* Type Filter */}
        <Select
          value={filters.type}
          onChange={(e) => updateFilters({ ...filters, type: e.target.value })}
          options={typeOptions}
        />

        {/* Status Filter */}
        <Select
          value={filters.status}
          onChange={(e) => updateFilters({ ...filters, status: e.target.value })}
          options={statusOptions}
        />

        {/* Sort selector */}
        <Select
          value={sortBy}
          onChange={(e) => updateSort(e.target.value)}
          options={sortOptions}
        />
      </div>

      {/* Filter Stats & Actions Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-300">
            Showing {properties.length} Properties
          </span>
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-slate-500 hover:text-rose-600 dark:text-slate-400 py-0.5 px-2 h-auto text-xs"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset Filters
            </Button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg">
          <button
            onClick={() => onViewChange && onViewChange('grid')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewChange && onViewChange('table')}
            className={`p-1.5 rounded-md transition-all ${
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
