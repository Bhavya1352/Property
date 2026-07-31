const STORAGE_KEY = 'properties'

const initializeProperties = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const defaultProperties = [
      {
        id: '1',
        title: 'Luxury Downtown Penthouse',
        type: 'apartment',
        location: 'Downtown Manhattan, New York',
        rent: 5500,
        status: 'occupied',
        description: 'Beautiful penthouse with stunning city views, modern amenities, and premium finishes. Located in the heart of downtown with easy access to transportation.',
        bedrooms: 3,
        bathrooms: 2,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        title: 'Modern Suburban Family Home',
        type: 'house',
        location: 'Brooklyn Heights, New York',
        rent: 3200,
        status: 'available',
        description: 'Spacious family home with a large backyard, perfect for families. Recently renovated with new kitchen and bathrooms.',
        bedrooms: 4,
        bathrooms: 3,
        image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800&q=80',
        createdAt: '2024-01-10',
      },
      {
        id: '3',
        title: 'Cozy Studio in Arts District',
        type: 'studio',
        location: 'Williamsburg, New York',
        rent: 1800,
        status: 'occupied',
        description: 'Perfect for young professionals or artists. Open concept layout with high ceilings and exposed brick.',
        bedrooms: 1,
        bathrooms: 1,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        createdAt: '2024-01-08',
      },
      {
        id: '4',
        title: 'Waterfront Luxury Condo',
        type: 'condo',
        location: 'Long Island City, New York',
        rent: 4200,
        status: 'available',
        description: 'Stunning waterfront views with premium amenities including gym, pool, and concierge service.',
        bedrooms: 2,
        bathrooms: 2,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        createdAt: '2024-01-05',
      },
      {
        id: '5',
        title: 'Historic Brownstone Townhouse',
        type: 'townhouse',
        location: 'Park Slope, New York',
        rent: 3800,
        status: 'available',
        description: 'Beautifully restored historic brownstone with original details, private garden, and off-street parking.',
        bedrooms: 3,
        bathrooms: 2.5,
        image: 'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800&q=80',
        createdAt: '2024-01-02',
      },
      {
        id: '6',
        title: 'Downtown Loft with Industrial Charm',
        type: 'loft',
        location: 'SoHo, New York',
        rent: 4500,
        status: 'occupied',
        description: 'Trendy loft with exposed beams, large windows, and open plan living. In the heart of SoHo\'s best restaurants and galleries.',
        bedrooms: 2,
        bathrooms: 2,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        createdAt: '2023-12-28',
      },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties))
  }
}

export const propertyService = {
  getAll: () => {
    initializeProperties()
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },

  getById: (id) => {
    const properties = propertyService.getAll()
    return properties.find(p => p.id === id)
  },

  create: (property) => {
    const properties = propertyService.getAll()
    const newProperty = {
      ...property,
      id: String(Math.max(...properties.map(p => parseInt(p.id)), 0) + 1),
      createdAt: new Date().toISOString().split('T')[0],
    }
    properties.push(newProperty)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
    return newProperty
  },

  update: (id, updates) => {
    const properties = propertyService.getAll()
    const index = properties.findIndex(p => p.id === id)
    if (index !== -1) {
      properties[index] = { ...properties[index], ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
      return properties[index]
    }
    return null
  },

  delete: (id) => {
    const properties = propertyService.getAll()
    const filtered = properties.filter(p => p.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  },

  search: (query, properties) => {
    if (!query.trim()) return properties
    const lower = query.toLowerCase()
    return properties.filter(p => 
      p.title.toLowerCase().includes(lower) ||
      p.location.toLowerCase().includes(lower)
    )
  },

  filter: (properties, filters) => {
    let result = properties
    
    if (filters.type && filters.type !== 'all') {
      result = result.filter(p => p.type === filters.type)
    }
    
    if (filters.status && filters.status !== 'all') {
      result = result.filter(p => p.status === filters.status)
    }
    
    return result
  },

  sort: (properties, sortBy) => {
    const copy = [...properties]
    switch (sortBy) {
      case 'rent-asc':
        return copy.sort((a, b) => a.rent - b.rent)
      case 'rent-desc':
        return copy.sort((a, b) => b.rent - a.rent)
      case 'newest':
        return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'oldest':
        return copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      default:
        return copy
    }
  },

  calculateStats: (properties) => {
    return {
      total: properties.length,
      available: properties.filter(p => p.status === 'available').length,
      occupied: properties.filter(p => p.status === 'occupied').length,
      monthlyRevenue: properties
        .filter(p => p.status === 'occupied')
        .reduce((sum, p) => sum + p.rent, 0),
    }
  },
}
