import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit, Trash2, Eye, MapPin, Bed, Bath, DollarSign } from 'lucide-react'
import { Card, CardBody } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { formatCurrency } from '../../utils/format'

export const PropertyCard = ({ property, onEdit, onDelete }) => {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card hover>
        <div className="relative h-48 overflow-hidden bg-slate-200">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={property.status}>
              {property.status === 'available' ? '✓ Available' : '◉ Occupied'}
            </Badge>
          </div>
        </div>

        <CardBody className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-slate-600 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-slate-600">
                <Bed className="w-4 h-4" />
                <span className="text-sm font-medium">{property.bedrooms}</span>
              </div>
            </div>
            <div className="text-center border-l border-r border-slate-100">
              <div className="flex items-center justify-center gap-1 text-slate-600">
                <Bath className="w-4 h-4" />
                <span className="text-sm font-medium">{property.bathrooms}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary-600 font-semibold">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">{(property.rent / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Link to={`/property/${property.id}`} className="flex-1">
              <Button variant="outline" size="sm" fullWidth>
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
            </Link>
            {user?.role === 'admin' && (
              <>
                <Link to={`/property/edit/${property.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" fullWidth>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  className="flex-1"
                  onClick={() => onDelete(property.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
