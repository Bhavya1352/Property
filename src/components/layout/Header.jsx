import { Menu, Search, Bell, X } from 'lucide-react'
import { useProperty } from '../../hooks/useProperty'
import { UserDropdown } from '../ui/UserDropdown'
import { cn } from '../../utils/cn'

export const Header = ({ onMenuClick }) => {
  const { searchQuery, updateSearch } = useProperty()

  return (
    <header className={cn("header sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/50")}>
      <div className="header__container flex items-center justify-between px-3 xs:px-4 py-2 xs:py-3 sm:px-6 md:px-8">
        {/* Left Mobile Menu & Logo */}
        <div className="flex items-center gap-2 xs:gap-3 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1.5 xs:p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 xs:w-5 h-4 xs:h-5" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-1.5 xs:gap-2">
            <img 
              src="/logo.png" 
              alt="PropHub Logo" 
              className="h-5 xs:h-6 md:h-7 lg:h-8 w-auto"
            />
          </div>

          {/* Premium Search Bar */}
          <div className="header__search relative max-w-xs sm:max-w-md w-full hidden sm:block">
            <div className="relative">
              <Search className="header__search-icon w-3.5 xs:w-4 h-3.5 xs:h-4 absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties, tenants, locations..."
                value={searchQuery}
                onChange={(e) => updateSearch(e.target.value)}
                className="header__search-input w-full pl-9 xs:pl-11 pr-8 xs:pr-10 py-1.5 xs:py-2.5 text-xs xs:text-sm rounded-xl xs:rounded-2xl border border-slate-200/80 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 focus:bg-white transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:shadow-lg focus:shadow-emerald-500/10"
              />
              {searchQuery && (
                <button
                  onClick={() => updateSearch('')}
                  className="absolute right-2 xs:right-3 top-1/2 -translate-y-1/2 p-0.5 xs:p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-3 xs:w-3.5 h-3 xs:h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="header__actions flex items-center gap-1.5 xs:gap-2 sm:gap-3">
          {/* Premium Notifications */}
          <div className="relative">
            <button
              className="header__icon-btn relative p-1.5 xs:p-2 sm:p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              title="Notifications"
            >
              <Bell className="w-4 xs:w-5 h-4 xs:h-5" />
              {/* Unread Badge */}
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 xs:w-5 h-4 xs:h-5 text-[8px] xs:text-[9px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white shadow-sm">
                3
              </span>
            </button>
          </div>

          <div className="h-4 xs:h-5 w-[1px] bg-slate-200 mx-0.5 xs:mx-1" />

          {/* User Profile Dropdown */}
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}
