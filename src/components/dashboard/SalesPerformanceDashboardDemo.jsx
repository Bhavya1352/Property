import { SalesPerformanceDashboard } from './SalesPerformanceDashboard'

export const SalesPerformanceDashboardDemo = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto">
        <div className="pt-8 pb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Sales Performance Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive overview of sales metrics and performance indicators
          </p>
        </div>
        
        <SalesPerformanceDashboard />
      </div>
    </div>
  )
}