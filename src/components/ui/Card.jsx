import { cn } from '../../utils/cn'

export const Card = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-soft border border-slate-100',
        'transition-all duration-200',
        hover && 'hover:shadow-md hover:border-slate-200',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className }) => (
  <div className={cn('p-6 border-b border-slate-100', className)}>
    {children}
  </div>
)

export const CardBody = ({ children, className }) => (
  <div className={cn('p-6', className)}>
    {children}
  </div>
)

export const CardFooter = ({ children, className }) => (
  <div className={cn('p-6 border-t border-slate-100 bg-slate-50 rounded-b-lg', className)}>
    {children}
  </div>
)
