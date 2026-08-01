import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(({
  label,
  error,
  icon,
  className = '',
  id,
  type = 'text',
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full space-y-1 xs:space-y-1.5 font-sans">
      {label && (
        <label htmlFor={inputId} className="block text-[10px] xs:text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-2.5 xs:pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'input block w-full rounded-lg border bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs xs:text-sm transition-all duration-300 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 dark:focus:border-primary-400 focus:shadow-md focus:shadow-primary-500/10',
            icon ? 'pl-8 xs:pl-10 pr-2.5 xs:pr-3 py-2 xs:py-2.5' : 'px-2.5 xs:px-3.5 py-2 xs:py-2.5',
            error
              ? 'border-rose-500 dark:border-rose-500 focus:ring-rose-500/30 focus:border-rose-500 focus:shadow-md focus:shadow-rose-500/10'
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] xs:text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
