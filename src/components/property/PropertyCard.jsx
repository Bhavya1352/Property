import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit3, Trash2, Eye, MapPin, Bed, Bath, Calendar, Heart, Share2 } from 'lucide-react'
import { Card, CardBody } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { useAuth } from '../../hooks/useAuth'
import { formatCurrency, formatPropertyType } from '../../utils/format'

export const PropertyCard = ({ property, onDelete }) => {
  const { user } = useAuth()
  
  // Vary badge positions
  const badgePositions = ['top-3 right-3', 'top-4 right-4', 'top-3 right-4']
  const badgePosition = badgePositions[property.id % 3]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
    >
      <Card variant="property" hover className="flex flex-col justify-between group overflow-hidden">
        <div className="relative">
          {/* Image with Gradient Overlay */}
          <div className="relative h-36 xs:h-40 sm:h-44 md:h-48 overflow-hidden bg-gray-100">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
            
            {/* Floating Price Chip */}
            <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 z-10">
              <div className="flex items-center gap-1 xs:gap-1.5 px-2 xs:px-3 py-1 xs:py-1.5 bg-white/95 backdrop-blur-sm rounded-lg xs:rounded-xl shadow-lg border border-white/20">
                <span className="text-sm xs:text-lg font-bold text-emerald-700">{formatCurrency(property.rent)}</span>
                <span className="text-[9px] xs:text-xs text-slate-500 font-medium">/month</span>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className={`absolute ${badgePosition} flex items-center gap-1.5 xs:gap-2 z-10`}>
              <Badge variant={property.status}>
                {property.status === 'available' ? '✓ Available' : '◉ Occupied'}
              </Badge>
            </div>
            
            {/* Property Type Badge */}
            <div className="absolute top-2.5 xs:top-3 left-2.5 xs:left-3 z-10">
              <span className="px-2 xs:px-2.5 py-0.5 xs:py-1 rounded-lg text-[9px] xs:text-[10px] font-bold bg-white/90 backdrop-blur-sm text-slate-800 border border-white/20 shadow-sm">
                {formatPropertyType(property.type)}
              </span>
            </div>
            
            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-1.5 xs:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
              <Link to={`/property/${property.id}`}>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 xs:p-3 bg-white rounded-lg xs:rounded-xl shadow-lg text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 xs:w-5 h-4 xs:h-5" />
                </motion.button>
              </Link>
              
              {user?.role === 'admin' && (
                <>
                  <Link to={`/property/edit/${property.id}`}>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 xs:p-3 bg-white rounded-lg xs:rounded-xl shadow-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit Property"
                    >
                      <Edit3 className="w-4 xs:w-5 h-4 xs:h-5" />
                    </motion.button>
                  </Link>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete(property.id)}
                    className="p-2 xs:p-3 bg-white rounded-lg xs:rounded-xl shadow-lg text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Property"
                  >
                    <Trash2 className="w-4 xs:w-5 h-4 xs:h-5" />
                  </motion.button>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <CardBody className="p-2.5 xs:p-3 space-y-1.5 xs:space-y-2 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[11px] xs:text-sm text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center gap-0.5 xs:gap-1 text-slate-500 text-[9px] xs:text-[10px] mt-0.5 xs:mt-1">
                <MapPin className="w-2.5 xs:w-3 h-2.5 xs:h-3 text-slate-400 shrink-0" />
                <span className="line-clamp-1 font-medium">{property.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 xs:gap-3 py-1 xs:py-1.5 border-y border-slate-100 text-[9px] xs:text-[10px]">
              <div className="flex items-center gap-0.5 xs:gap-1 text-slate-600">
                <Bed className="w-2.5 xs:w-3 h-2.5 xs:h-3 text-slate-400" />
                <span className="font-semibold">{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-0.5 xs:gap-1 text-slate-600">
                <Bath className="w-2.5 xs:w-3 h-2.5 xs:h-3 text-slate-400" />
                <span className="font-semibold">{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-0.5 xs:gap-1 text-amber-600 ml-auto">
                <Calendar className="w-2.5 xs:w-3 h-2.5 xs:h-3" />
                <span className="font-semibold">{property.rent.toLocaleString()}/mo</span>
              </div>
            </div>

            <p className="text-[9px] xs:text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          </CardBody>
        </div>
      </Card>
    </motion.div>
  )
}
