import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit3, Trash2, Eye, MapPin, Bed, Bath, DollarSign, Calendar } from 'lucide-react'
import { Card, CardBody } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { formatCurrency, formatPropertyType } from '../../utils/format'

export const PropertyCard = ({ property, onDelete }) => {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
    >
      <Card hover className="h-full flex flex-col justify-between group">
        <div>
          {/* Image & Status Badge Header */}
          <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
              }}
            />
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <Badge variant={property.status}>
                {property.status === 'available' ? '✓ Available' : '◉ Occupied'}
              </Badge>
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md">
                {formatPropertyType(property.type)}
              </span>
            </div>
          </div>

          {/* Content Specs */}
          <CardBody className="p-5 space-y-3">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="line-clamp-1">{property.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 dark:border-slate-800/80 text-xs">
              <div className="flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300">
                <Bed className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-slate-600 dark:text-slate-300 border-x border-slate-100 dark:border-slate-800/80">
                <Bath className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-primary-600 dark:text-primary-400 font-bold">
                <DollarSign className="w-3.5 h-3.5" />
                <span>{property.rent.toLocaleString()}/mo</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          </CardBody>
        </div>

        {/* Action Footer */}
        <div className="p-4 pt-0 flex gap-2">
          <Link to={`/property/${property.id}`} className="flex-1">
            <Button variant="outline" size="sm" fullWidth>
              <Eye className="w-3.5 h-3.5" />
              View
            </Button>
          </Link>

          {/* Admin Restricted Actions */}
          {user?.role === 'admin' && (
            <>
              <Link to={`/property/edit/${property.id}`} className="flex-1">
                <Button variant="secondary" size="sm" fullWidth>
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(property.id)}
                aria-label="Delete Property"
                title="Delete Property"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
