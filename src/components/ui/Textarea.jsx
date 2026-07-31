import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Textarea = forwardRef(({
  label,
  error,
  className = '',
  id,
  rows = 4,
  ...props
}, ref) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'block w-full rounded-lg border bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-colors duration-200 px-3.5 py-2.5 resize-y',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 dark:focus:border-primary-400',
            error
              ? 'border-rose-500 dark:border-rose-500 focus:ring-rose-500/30 focus:border-rose-500'
              : 'border-slate-300 dark:border-slate-700',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'
