import { Menu } from 'lucide-react'
import { Button } from '../ui/Button'

export const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between p-4 md:p-6">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </button>
        <div className="flex-1" />
        <div className="text-right text-sm text-slate-600">
          <p className="font-medium">Property Management</p>
        </div>
      </div>
    </header>
  )
}
