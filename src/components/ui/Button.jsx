import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

export const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'btn inline-flex items-center justify-center font-medium transition-all duration-200 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]'
  
  const variants = {
    primary: 'btn--primary bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-sm hover:shadow',
    secondary: 'btn--secondary bg-gray-100 hover:bg-gray-200 text-slate-900 focus:ring-gray-400',
    outline: 'btn--outline border border-gray-300 text-slate-700 hover:bg-gray-50 focus:ring-gray-400',
    ghost: 'btn--ghost text-slate-600 hover:bg-gray-100 focus:ring-gray-400',
    danger: 'btn--danger bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm',
  }

  const sizes = {
    sm: 'btn--sm px-2 xs:px-3 py-1 xs:py-1.5 text-[10px] xs:text-xs gap-1 xs:gap-1.5',
    md: 'btn--md px-3 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm gap-1.5 xs:gap-2',
    lg: 'btn--lg px-4 xs:px-5 py-2 xs:py-2.5 text-sm xs:text-base gap-1.5 xs:gap-2',
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'btn--full-width w-full',
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
})

Button.displayName = 'Button'
