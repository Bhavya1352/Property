import { createContext, useState, useCallback, useEffect } from 'react'
import { propertyService } from '../services/propertyService'

export const PropertyContext = createContext()

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ type: 'all', status: 'all' })
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Load properties on mount
  useEffect(() => {
    loadProperties()
  }, [])

  // Apply filters whenever properties, search, or filters change
  useEffect(() => {
    applyFiltersAndSort()
  }, [properties, searchQuery, filters, sortBy])

  const loadProperties = () => {
    setLoading(true)
    try {
      const props = propertyService.getAll()
      setProperties(props)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSort = useCallback(() => {
    let result = properties

    // Search
    if (searchQuery.trim()) {
      result = propertyService.search(searchQuery, result)
    }

    // Filter
    result = propertyService.filter(result, filters)

    // Sort
    result = propertyService.sort(result, sortBy)

    setFilteredProperties(result)
    setCurrentPage(1)
  }, [properties, searchQuery, filters, sortBy])

  const addProperty = (propertyData) => {
    const newProperty = propertyService.create(propertyData)
    setProperties(prev => [...prev, newProperty])
  }

  const updateProperty = (id, updates) => {
    const updated = propertyService.update(id, updates)
    if (updated) {
      setProperties(prev => prev.map(p => p.id === id ? updated : p))
    }
  }

  const deleteProperty = (id) => {
    propertyService.delete(id)
    setProperties(prev => prev.filter(p => p.id !== id))
  }

  const updateSearch = (query) => {
    setSearchQuery(query)
  }

  const updateFilters = (newFilters) => {
    setFilters(newFilters)
  }

  const updateSort = (newSort) => {
    setSortBy(newSort)
  }

  const getPaginatedProperties = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProperties.slice(startIndex, endIndex)
  }

  const getTotalPages = () => {
    return Math.ceil(filteredProperties.length / itemsPerPage)
  }

  const getStats = () => {
    return propertyService.calculateStats(properties)
  }

  const value = {
    properties: filteredProperties,
    paginatedProperties: getPaginatedProperties(),
    totalPages: getTotalPages(),
    currentPage,
    setCurrentPage,
    loading,
    searchQuery,
    filters,
    sortBy,
    addProperty,
    updateProperty,
    deleteProperty,
    updateSearch,
    updateFilters,
    updateSort,
    getStats,
    refreshProperties: loadProperties,
  }

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  )
}
