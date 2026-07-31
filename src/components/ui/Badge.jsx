import { cn } from '../../utils/cn'

export const Badge = ({ children, variant = 'default', size = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-slate-700 border-gray-200',
    primary: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    available: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    occupied: 'bg-orange-100 text-orange-800 border-orange-300',
    admin: 'bg-purple-50 text-purple-700 border-purple-200',
    employee: 'bg-blue-50 text-blue-700 border-blue-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
  }

  const sizes = {
    default: 'px-2.5 py-1 text-[10px]',
    sm: 'px-1.5 py-0.5 text-[9px]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-bold border transition-colors shadow-sm',
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className
      )}
    >
      {children}
    </span>
  )
}
