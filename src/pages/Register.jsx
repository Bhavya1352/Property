import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, User, Mail, Lock, Sun, Moon } from 'lucide-react'
import { registerSchema } from '../utils/validation'
import { authService } from '../services/authService'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { useTheme } from '../hooks/useTheme'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import { Toast } from '../components/ui/Toast'

export const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { isDark, toggleTheme } = useTheme()
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 relative transition-colors duration-200">
      <Toast toast={toast} onClose={hideToast} />

      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-sm hover:scale-105 transition-all"
        title="Toggle Theme"
      >
        {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
      </button>

      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="p-3.5 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-glow text-white">
            <Building2 className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Prop<span className="text-primary-600 dark:text-primary-400">Hub</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Join the platform to manage properties
          </p>
        </div>

        <Card glass className="shadow-2xl">
          <CardBody className="space-y-6 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center">
                Create Account
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs text-center mt-1">
                Employee access account creation
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Jane Doe"
                icon={<User className="w-4 h-4" />}
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="jane@property.com"
                icon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="At least 6 characters"
                icon={<Lock className="w-4 h-4" />}
                error={errors.password?.message}
                {...register('password')}
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter password"
                icon={<Lock className="w-4 h-4" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

              <Button type="submit" loading={loading} fullWidth size="lg">
                Create Account
              </Button>
            </form>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
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
