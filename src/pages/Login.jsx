import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, Mail, Lock } from 'lucide-react'
import { loginSchema } from '../utils/validation'
import { authService } from '../services/authService'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import { Toast } from '../components/ui/Toast'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { toast, showToast, hideToast } = useToast()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = authService.login(data.email, data.password)
      if (result.success) {
        login(result.user)
        showToast(`Welcome back, ${result.user.name}!`, 'success')
        setTimeout(() => navigate('/dashboard'), 500)
      } else {
        showToast(result.error, 'error')
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center p-4">
      <Toast toast={toast} onClose={hideToast} />
      
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="p-3 bg-primary-600 rounded-xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-3xl font-bold text-slate-900">PropHub</h1>
            <p className="text-sm text-slate-500">Property Management</p>
          </div>
        </div>

        <Card>
          <CardBody className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-600 text-sm">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@property.com"
                icon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={<Lock className="w-4 h-4" />}
                error={errors.password?.message}
                {...register('password')}
              />

              <Button type="submit" loading={loading} fullWidth size="lg">
                Sign In
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Demo Credentials</span>
              </div>
            </div>

            <div className="bg-primary-50 rounded-lg p-4 space-y-2 text-sm">
              <p className="font-semibold text-slate-900">Admin Account:</p>
              <p className="text-slate-600">Email: <code className="font-mono bg-white px-2 py-1 rounded">admin@property.com</code></p>
              <p className="text-slate-600">Password: <code className="font-mono bg-white px-2 py-1 rounded">admin123</code></p>

              <p className="font-semibold text-slate-900 pt-2">Employee Account:</p>
              <p className="text-slate-600">Email: <code className="font-mono bg-white px-2 py-1 rounded">employee@property.com</code></p>
              <p className="text-slate-600">Password: <code className="font-mono bg-white px-2 py-1 rounded">employee123</code></p>
            </div>

            <p className="text-center text-slate-600 text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
                Sign up
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
