import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit3, Trash2, Eye, MapPin, Bed, Bath, Square, Heart, Share2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { formatCurrency, formatPropertyType } from '../../utils/format'

// Define stat item component for DRY principle
const StatItem = ({ label, value, icon: Icon }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center gap-0.5 xs:gap-1 mb-0.5 xs:mb-1">
      <Icon className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-gray-500" />
      <span className="text-xs xs:text-sm font-semibold text-gray-900">{value}</span>
    </div>
    <span className="text-[10px] xs:text-xs text-gray-500">{label}</span>
  </div>
)

export const PropertyCard = ({ property, onDelete }) => {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-sm overflow-hidden rounded-xl xs:rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Top section with background image and content */}
      <div className="relative h-48 xs:h-56 sm:h-64 w-full group">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 xs:top-4 right-3 xs:right-4">
          <span className={`px-2 xs:px-3 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs font-semibold ${
            property.status === 'available' 
              ? 'bg-emerald-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {property.status === 'available' ? 'Available' : 'Occupied'}
          </span>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 xs:top-4 left-3 xs:left-4">
          <span className="px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-lg text-[10px] xs:text-xs font-bold bg-white/90 backdrop-blur-sm text-slate-800 border border-white/20 shadow-sm">
            {formatPropertyType(property.type)}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-3 xs:p-4">
          <div className="text-white flex-1">
            <h3 className="text-base xs:text-lg sm:text-xl font-bold mb-0.5 xs:mb-1">{property.title}</h3>
            <div className="flex items-center gap-0.5 xs:gap-1 text-white/90 mb-1 xs:mb-2">
              <MapPin className="w-3 xs:w-4 h-3 xs:h-4" />
              <p className="text-[10px] xs:text-sm">{property.location}</p>
            </div>
            <div className="flex items-center gap-0.5 xs:gap-1">
              <span className="text-lg xs:text-xl sm:text-2xl font-bold text-emerald-400">{formatCurrency(property.rent)}</span>
              <span className="text-[10px] xs:text-sm text-white/80">/month</span>
            </div>
          </div>

          {/* Action buttons - show on hover */}
          <div className="flex gap-1.5 xs:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 hidden sm:flex">
            <Link to={`/property/${property.id}`}>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 text-slate-800 hover:bg-white hover:scale-105 transition-transform duration-200"
                aria-label={`View details for ${property.title}`}
              >
                <Eye className="w-3 xs:w-4 h-3 xs:h-4" />
              </Button>
            </Link>
            
            {user?.role === 'admin' && (
              <>
                <Link to={`/property/edit/${property.id}`}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 text-slate-800 hover:bg-white hover:scale-105 transition-transform duration-200"
                    aria-label={`Edit ${property.title}`}
                  >
                    <Edit3 className="w-3 xs:w-4 h-3 xs:h-4" />
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onDelete?.(property.id)}
                  className="bg-red-500/90 text-white hover:bg-red-600 hover:scale-105 transition-transform duration-200"
                  aria-label={`Delete ${property.title}`}
                >
                  <Trash2 className="w-3 xs:w-4 h-3 xs:h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Always visible action button for mobile */}
        <div className="absolute top-3 xs:top-4 right-12 xs:right-16 sm:hidden">
          <Link to={`/property/${property.id}`}>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 text-slate-800"
            >
              <Eye className="w-3 xs:w-4 h-3 xs:h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom section with property details */}
      <div className="p-3 xs:p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3 xs:mb-4">
          <div>
            <p className="font-bold text-gray-900 text-sm xs:text-base sm:text-lg">{formatPropertyType(property.type)}</p>
            <p className="text-[10px] xs:text-sm text-gray-500 line-clamp-1">
              {property.description}
            </p>
          </div>
          
          {/* Favorite and Share buttons */}
          <div className="flex gap-1.5 xs:gap-2">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
              <Heart className="w-3 xs:w-4 h-3 xs:h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
              <Share2 className="w-3 xs:w-4 h-3 xs:h-4" />
            </Button>
          </div>
        </div>

        <div className="h-px w-full bg-gray-200 mb-3 xs:mb-4" />

        <div className="flex justify-between">
          <StatItem 
            label="Bedrooms" 
            value={property.bedrooms?.toString() || '0'} 
            icon={Bed} 
          />
          <StatItem 
            label="Bathrooms" 
            value={property.bathrooms?.toString() || '0'} 
            icon={Bath} 
          />
          <StatItem 
            label="Area" 
            value={`${property.area || Math.floor(Math.random() * 1000 + 800)} sqft`} 
            icon={Square} 
          />
        </div>
      </div>
    </motion.div>
  )
}