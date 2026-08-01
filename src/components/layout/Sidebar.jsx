import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Home, LogOut, X, Users, Settings, HelpCircle, BadgePercent, Building2 } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { Badge } from '../ui/Badge'
import { cn } from '../../utils/cn'

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Home, label: 'Buy Properties', path: '#' },
    { icon: BadgePercent, label: 'Sold Deals', path: '#' },
    { icon: Building2, label: 'Buildings', path: '#' },
    { icon: Users, label: 'Tenants', path: '#' },
  ]

  const featureItems = [
    { icon: Settings, label: 'Services', path: '#', count: '15' },
    { icon: HelpCircle, label: 'Help Desk', path: '#' },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm lg:hidden z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <aside
        className={cn(
          'sidebar fixed left-0 top-0 h-full w-64 xs:w-56 sm:w-60 bg-[#F8F8F6] dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 z-40 lg:z-10 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col justify-between shadow-xl lg:shadow-none shrink-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="overflow-y-auto flex-1">
          {/* Header Branding */}
          <div className="sidebar__brand p-4 xs:p-5 sm:p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <img 
                src="/logo.png" 
                alt="PropHub Logo" 
                className="h-7 xs:h-8 w-auto"
              />
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 xs:p-4 space-y-4 xs:space-y-6">
            <div>
              <p className="px-2 xs:px-3 text-[9px] xs:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Main Menu
              </p>
              <nav className="sidebar__nav space-y-1">
                {navItems.map(item => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={onClose}
                      className={cn(
                        'sidebar__nav-item flex items-center justify-between px-2 xs:px-3 py-2 xs:py-2.5 rounded-xl text-[10px] xs:text-xs font-semibold transition-all duration-300 ease-in-out group',
                        isActive
                          ? 'sidebar__nav-item--active bg-primary-600 text-white shadow-glow scale-[1.02]'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 hover:scale-[1.02] hover:shadow-sm'
                      )}
                    >
                      <div className="flex items-center gap-2 xs:gap-2.5">
                        <item.icon className={cn('w-4 xs:w-5 h-4 xs:h-5 transition-colors duration-300', isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300')} />
                        <span className="text-[9px] xs:text-[10px] sm:text-xs">{item.label}</span>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div>
              <p className="px-2 xs:px-3 text-[9px] xs:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                Features
              </p>
              <nav className="sidebar__nav space-y-1">
                {featureItems.map(item => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={onClose}
                    className="sidebar__nav-item flex items-center justify-between px-2 xs:px-3 py-2 xs:py-2.5 rounded-xl text-[10px] xs:text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 group transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-sm"
                  >
                    <div className="flex items-center gap-2 xs:gap-2.5">
                      <item.icon className="w-4 xs:w-5 h-4 xs:h-5 text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300" />
                      <span className="text-[9px] xs:text-[10px] sm:text-xs">{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="bg-primary-100 text-primary-800 dark:bg-primary-950 dark:text-primary-300 px-1.5 xs:px-2 py-0.5 rounded-full text-[9px] xs:text-[10px] font-bold">
                        {item.count}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Footer Banner Callout & Settings */}
        <div className="sidebar__footer p-3 xs:p-4 border-t border-slate-200 space-y-2 xs:space-y-3 bg-[#F6F5F2]">
          {/* Mobile App Callout */}
          <div className="p-3 xs:p-4 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white rounded-2xl relative overflow-hidden text-center shadow-md">
            <h4 className="text-[10px] xs:text-xs font-bold mb-1">PropHub mobile app</h4>
            <p className="text-[9px] xs:text-[10px] text-emerald-200 mb-2 leading-snug">Download app for quick actions on go</p>
            <button className="bg-white text-emerald-900 hover:bg-emerald-50 text-[9px] xs:text-[10px] font-bold py-1 xs:py-1.5 px-2 xs:px-3 rounded-lg transition-colors shadow">
              Install App
            </button>
          </div>

          {/* Theme & User Profile Card */}
          <div className="flex items-center justify-between gap-2 p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 xs:gap-2.5 min-w-0">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-7 xs:w-8 h-7 xs:h-8 rounded-full border border-slate-200 shrink-0 object-cover"
              />
              <div className="min-w-0">
                <p className="text-[10px] xs:text-[11px] font-bold text-slate-900 truncate">{user?.name}</p>
                <p className="text-[8px] xs:text-[9px] text-slate-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout()
                onClose()
              }}
              className="p-1 xs:p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
