import { Link } from 'react-router-dom'
import { Building2, Home, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4 max-w-md">
        <div className="p-4 bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 rounded-2xl w-16 h-16 mx-auto flex items-center justify-center">
          <Building2 className="w-8 h-8" />
        </div>

        <h1 className="text-7xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Page Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="pt-4">
          <Link to="/dashboard">
            <Button size="lg" className="gap-2">
              <Home className="w-4 h-4" />
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
