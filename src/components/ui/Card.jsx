import { cn } from '../../utils/cn'

export const Card = ({ children, className = '', hover = false, glass = false, variant = 'default', ...props }) => {
  const variants = {
    default: 'rounded-xl',
    stats: 'rounded-[20px]',
    property: 'rounded-2xl',
  }

  return (
    <div
      className={cn(
        'card border border-gray-200 bg-white transition-all duration-200 overflow-hidden',
        variants[variant] || variants.default,
        hover && 'card--hover hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-300',
        glass && 'card--glass glass-panel',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn('card__header px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={cn('card__body p-6', className)} {...props}>
      {children}
    </div>
  )
}

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn('card__footer px-6 py-4 bg-gray-50 border-t border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  )
}
