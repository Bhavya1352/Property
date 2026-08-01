import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Select = forwardRef(({
  label,
  error,
  options = [],
  className = '',
  id,
  children,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full space-y-1 xs:space-y-1.5 font-sans">
      {label && (
        <label htmlFor={selectId} className="block text-[10px] xs:text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'input block w-full rounded-lg border bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 px-2.5 xs:px-3.5 py-2 xs:py-2.5 text-xs xs:text-sm transition-all duration-300 ease-in-out cursor-pointer appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 dark:focus:border-primary-400 focus:shadow-md focus:shadow-primary-500/10',
            error
              ? 'border-rose-500 dark:border-rose-500 focus:ring-rose-500/30 focus:border-rose-500 focus:shadow-md focus:shadow-rose-500/10'
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600',
            className
          )}
          {...props}
        >
          {children || options.map(option => (
            <option key={option.value} value={option.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 xs:px-3 text-slate-400 dark:text-slate-500">
          <svg className="h-3.5 xs:h-4 w-3.5 xs:w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-[10px] xs:text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>
      )}
    </div>
  )
})

Select.displayName = 'Select'
