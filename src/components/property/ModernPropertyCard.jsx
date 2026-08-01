import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Bed, Bath, Square, Eye, Edit3, Trash2, Heart, Share2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrency, formatPropertyType } from '../../utils/format';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

// Define stat item component for DRY principle
const StatItem = ({ label, value, icon: Icon }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center gap-1 mb-1">
      <Icon className="w-3.5 h-3.5 text-gray-500" />
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
    <span className="text-xs text-gray-500">{label}</span>
  </div>
);

const ModernPropertyCard = React.forwardRef(
  (
    {
      className,
      property,
      onDelete,
      onViewDetails,
      ...props
    },
    ref
  ) => {
    const { user } = useAuth();

    return (
      <motion.div
        ref={ref}
        className={`w-full max-w-sm overflow-hidden rounded-2xl bg-white text-gray-900 shadow-lg border border-gray-100 ${className || ''}`}
        whileHover={{ y: -8, scale: 1.02 }} // Subtle lift and scale animation on hover
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {/* Top section with background image and content */}
        <div className="relative h-64 w-full group">
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              property.status === 'available' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {property.status === 'available' ? 'Available' : 'Occupied'}
            </span>
          </div>

          {/* Property Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 backdrop-blur-sm text-slate-800 border border-white/20 shadow-sm">
              {formatPropertyType(property.type)}
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-4">
            <div className="text-white flex-1">
              <h3 className="text-xl font-bold mb-1">{property.title}</h3>
              <div className="flex items-center gap-1 text-white/90 mb-2">
                <MapPin className="w-4 h-4" />
                <p className="text-sm">{property.location}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-emerald-400">{formatCurrency(property.rent)}</span>
                <span className="text-sm text-white/80">/month</span>
              </div>
            </div>

            {/* Action buttons - animate in on hover of the parent card */}
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              whileHover={{ opacity: 1, x: 0 }}
              animate={{ opacity: 0, x: 20 }} // Hidden by default
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Link to={`/property/${property.id}`}>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onViewDetails}
                  className="bg-white/90 text-slate-800 hover:bg-white"
                  aria-label={`View details for ${property.title}`}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
              
              {user?.role === 'admin' && (
                <div className="flex gap-2">
                  <Link to={`/property/edit/${property.id}`}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 text-slate-800 hover:bg-white"
                      aria-label={`Edit ${property.title}`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onDelete?.(property.id)}
                    className="bg-red-500/90 text-white hover:bg-red-600"
                    aria-label={`Delete ${property.title}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Always visible action button for mobile */}
          <div className="absolute top-4 right-16 md:hidden">
            <Link to={`/property/${property.id}`}>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 text-slate-800"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom section with property details */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-bold text-gray-900 text-lg">{formatPropertyType(property.type)}</p>
              <p className="text-sm text-gray-500 line-clamp-1 truncate">
                {property.description}
              </p>
            </div>
            
            {/* Favorite and Share buttons */}
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200 mb-4" />

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
              value={`${property.area || 0} sqft`} 
              icon={Square} 
            />
          </div>
        </div>
      </motion.div>
    );
  }
);

ModernPropertyCard.displayName = "ModernPropertyCard";

export { ModernPropertyCard };