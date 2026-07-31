import { cn } from '../../utils/cn'

export const Select = ({
  label,
  options,
  error,
  fullWidth = true,
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
      <select
        className={cn(
          'w-full px-4 py-2 border border-slate-300 rounded-lg',
          'text-slate-900 bg-white',
          'transition-all duration-200',
          'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-50',
          'disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-50',
          className,
        )}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
