import { cn } from '../../utils/cn'

export const Input = ({
  label,
  error,
  fullWidth = true,
  icon,
  className,
  ...props
}) => {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            'w-full px-4 py-2 border border-slate-300 rounded-lg',
            'text-slate-900 placeholder-slate-400',
            'transition-all duration-200',
            'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-50',
            'disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed',
            icon && 'pl-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-50',
            className,
          )}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
