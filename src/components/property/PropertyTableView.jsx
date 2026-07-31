import { Link } from 'react-router-dom'
import { Eye, Edit3, Trash2, MapPin } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { formatCurrency, formatPropertyType } from '../../utils/format'

export const PropertyTableView = ({ properties = [], onDelete }) => {
  const { user } = useAuth()

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="p-4">Property</th>
            <th className="p-4">Type</th>
            <th className="p-4">Location</th>
            <th className="p-4">Status</th>
            <th className="p-4">Rent</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
          {properties.map((property) => (
            <tr
              key={property.id}
              className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
                    }}
                  />
                  <div>
                    <Link
                      to={`/property/${property.id}`}
                      className="font-bold text-slate-900 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1"
                    >
                      {property.title}
                    </Link>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {property.bedrooms} Beds • {property.bathrooms} Baths
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4 capitalize text-slate-600 dark:text-slate-300">
                {formatPropertyType(property.type)}
              </td>
              <td className="p-4 text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1 max-w-[180px] truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>
              </td>
              <td className="p-4">
                <Badge variant={property.status}>
                  {property.status === 'available' ? 'Available' : 'Occupied'}
                </Badge>
              </td>
              <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                {formatCurrency(property.rent)}
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Link to={`/property/${property.id}`}>
                    <Button variant="ghost" size="sm" title="View Property">
                      <Eye className="w-4 h-4 text-slate-500" />
                    </Button>
                  </Link>

                  {user?.role === 'admin' && (
                    <>
                      <Link to={`/property/edit/${property.id}`}>
                        <Button variant="ghost" size="sm" title="Edit Property">
                          <Edit3 className="w-4 h-4 text-slate-500 hover:text-primary-600" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(property.id)}
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4 text-rose-500" />
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
