import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, LayoutDashboard, Plus, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { cn } from '../../utils/cn'

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    ...(user?.role === 'admin' ? [
      { icon: Plus, label: 'Add Property', path: '/property/add' },
    ] : []),
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 md:hidden z-30"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        className="fixed left-0 top-0 h-full w-80 bg-white border-r border-slate-200 z-40 md:z-10 md:translate-x-0 md:static overflow-y-auto"
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Building2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">PropHub</h1>
              <p className="text-xs text-slate-500">Management System</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors',
                location.pathname === item.path
                  ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600'
                  : 'text-slate-600 hover:bg-slate-50'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout()
              onClose()
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.div>
    </>
  )
}
