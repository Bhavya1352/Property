import { Link } from 'react-router-dom'
import { AlertCircle, Home } from 'lucide-react'
import { Button } from '../components/ui/Button'

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-primary-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
        <p className="text-xl text-slate-600 mb-4">Page not found</p>
        <p className="text-slate-500 mb-8">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/dashboard">
          <Button size="lg">
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
