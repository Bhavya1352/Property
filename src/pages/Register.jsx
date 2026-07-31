import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, User, Mail, Lock } from 'lucide-react'
import { registerSchema } from '../utils/validation'
import { authService } from '../services/authService'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import { Toast } from '../components/ui/Toast'

export const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { toast, showToast, hideToast } = useToast()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = authService.register(data.email, data.password, data.name)
      if (result.success) {
        login(result.user)
        showToast('Account created successfully!', 'success')
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
              <p className="text-slate-600 text-sm">Join us to manage your properties</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                icon={<User className="w-4 h-4" />}
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                icon={<Lock className="w-4 h-4" />}
                error={errors.password?.message}
                {...register('password')}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                icon={<Lock className="w-4 h-4" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

              <Button type="submit" loading={loading} fullWidth size="lg">
                Create Account
              </Button>
            </form>

            <p className="text-center text-slate-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                Sign in
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
