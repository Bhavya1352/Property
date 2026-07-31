import { Card, CardHeader, CardBody } from '../ui/Card'
import { Activity, Plus, CheckCircle, RefreshCw } from 'lucide-react'

export const RecentActivity = () => {
  const activities = [
    {
      id: '1',
      title: 'Luxury Downtown Penthouse',
      action: 'Status changed to Occupied',
      time: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60',
    },
    {
      id: '2',
      title: 'Waterfront Luxury Condo',
      action: 'Property details updated',
      time: '5 hours ago',
      icon: RefreshCw,
      iconColor: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60',
    },
    {
      id: '3',
      title: 'Modern Suburban Family Home',
      action: 'Listed as Available',
      time: '1 day ago',
      icon: Plus,
      iconColor: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60',
    },
  ]

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Recent System Activity
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Live Feed</span>
      </CardHeader>
      <CardBody className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
        {activities.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.action}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{item.time}</span>
            </div>
          )
        })}
      </CardBody>
    </Card>
  )
}
