import { format } from 'date-fns'

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  try {
    return format(new Date(date), formatStr)
  } catch {
    return date
  }
}

export const formatPropertyType = (type) => {
  const map = {
    apartment: 'Apartment',
    house: 'House',
    condo: 'Condo',
    studio: 'Studio',
    townhouse: 'Townhouse',
    loft: 'Loft',
  }
  return map[type] || type
}

export const formatStatus = (status) => {
  const map = {
    available: 'Available',
    occupied: 'Occupied',
  }
  return map[status] || status
}
