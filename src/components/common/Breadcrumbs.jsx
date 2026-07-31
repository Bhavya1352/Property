import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export const Breadcrumbs = ({ items }) => {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">
      <Link to="/dashboard" className="flex items-center gap-1 text-primary-600 hover:text-primary-700">
        <Home className="w-4 h-4" />
        Dashboard
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-slate-400" />
          {item.path ? (
            <Link to={item.path} className="text-primary-600 hover:text-primary-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-600">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  )
}
