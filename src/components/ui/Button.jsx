import { cn } from '../../utils/cn'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-soft hover:shadow-md',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400 shadow-soft hover:shadow-md',
    ghost: 'text-primary-600 hover:bg-primary-50 active:bg-primary-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-soft hover:shadow-md',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-block animate-spin h-4 w-4 border-2 border-current border-r-transparent rounded-full"></span>
      )}
      {children}
    </button>
  )
}
