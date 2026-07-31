import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail, Lock } from 'lucide-react'
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
        showToast('Account registered successfully!', 'success')
        setTimeout(() => navigate('/dashboard'), 400)
      } else {
        showToast(result.error, 'error')
      }
    } catch (error) {
      showToast('An error occurred during registration.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-3 xs:p-4 relative transition-colors duration-200">
      <Toast toast={toast} onClose={hideToast} />

      <div className="w-full max-w-md space-y-4 xs:space-y-6">
        <div className="flex flex-col items-center justify-center text-center space-y-1.5 xs:space-y-2">
          <img 
            src="/logo.png" 
            alt="PropHub Logo" 
            className="h-10 xs:h-12 w-auto"
          />
          <p className="text-[10px] xs:text-xs text-slate-500 dark:text-slate-400 font-medium">
            Join the platform to manage properties
          </p>
        </div>

        <Card glass className="shadow-2xl">
          <CardBody className="space-y-4 xs:space-y-6 p-4 xs:p-6 sm:p-8">
            <div>
              <h2 className="text-xl xs:text-2xl font-bold text-slate-900 dark:text-slate-100 text-center">
                Create Account
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] xs:text-xs text-center mt-1">
                Employee access account creation
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 xs:space-y-4">
              <Input
                label="Full Name"
                placeholder="Jane Doe"
                icon={<User className="w-3.5 xs:w-4 h-3.5 xs:h-4" />}
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="jane@property.com"
                icon={<Mail className="w-3.5 xs:w-4 h-3.5 xs:h-4" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="At least 6 characters"
                icon={<Lock className="w-3.5 xs:w-4 h-3.5 xs:h-4" />}
                error={errors.password?.message}
                {...register('password')}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter password"
                icon={<Lock className="w-3.5 xs:w-4 h-3.5 xs:h-4" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

              <Button type="submit" loading={loading} fullWidth size="lg">
                Create Account
              </Button>
            </form>

            <p className="text-center text-[10px] xs:text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
