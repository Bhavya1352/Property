import { cn } from '../../utils/cn'

export const Badge = ({ children, variant = 'default', className }) => {
  const variantClasses = {
    default: 'bg-slate-100 text-slate-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    occupied: 'bg-orange-100 text-orange-800',
    available: 'bg-green-100 text-green-800',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
