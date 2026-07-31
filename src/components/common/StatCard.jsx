import { Card, CardBody } from '../ui/Card'
import { TrendingUp } from 'lucide-react'

export const StatCard = ({ title, value, icon: Icon, color = 'primary', trend = '+5.2%' }) => {
  const colorMap = {
    primary: {
      bg: 'bg-primary-50 dark:bg-primary-950/60',
      text: 'text-primary-600 dark:text-primary-400',
      border: 'border-primary-100 dark:border-primary-900',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-100 dark:border-emerald-900',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      text: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-100 dark:border-amber-900',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/60',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-100 dark:border-blue-900',
    },
  }

  const current = colorMap[color] || colorMap.primary

  return (
    <Card hover className="relative overflow-hidden">
      <CardBody className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </span>
          <div className={`p-2.5 rounded-xl ${current.bg} ${current.text}`}>
            {Icon && <Icon className="w-5 h-5" />}
          </div>
        </div>

        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {value}
          </h3>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
