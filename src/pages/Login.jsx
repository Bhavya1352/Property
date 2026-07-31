import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, Mail, Lock, ShieldCheck, UserCheck, Sun, Moon } from 'lucide-react'
import { loginSchema } from '../utils/validation'
import { authService } from '../services/authService'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { useTheme } from '../hooks/useTheme'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card, CardBody } from '../components/ui/Card'
import { Toast } from '../components/ui/Toast'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { toast, showToast, hideToast } = useToast()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@property.com',
      password: 'admin123',
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = authService.login(data.email, data.password)
      if (result.success) {
        login(result.user)
        showToast(`Welcome back, ${result.user.name}!`, 'success')
        setTimeout(() => navigate('/dashboard'), 400)
      } else {
        showToast(result.error, 'error')
      }
    } catch (error) {
      showToast('An error occurred during authentication.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = (email, password) => {
    setValue('email', email)
    setValue('password', password)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 relative transition-colors duration-200">
      <Toast toast={toast} onClose={hideToast} />

      {/* Theme Toggle Top Right */}
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-sm hover:scale-105 transition-all"
        title="Toggle Theme"
      >
        {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
      </button>

      <div className="w-full max-w-md space-y-6">
        {/* Branding Logo */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="p-3.5 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-glow text-white">
            <Building2 className="w-9 h-9" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Prop<span className="text-primary-600 dark:text-primary-400">Hub</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Production Grade Property Management System
          </p>
        </div>

        <Card glass className="shadow-2xl">
          <CardBody className="space-y-6 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center">
                Sign In
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs text-center mt-1">
                Enter your credentials to access your dashboard
              </p>
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
                placeholder="Enter password"
                icon={<Lock className="w-4 h-4" />}
                error={errors.password?.message}
                {...register('password')}
              />

              <Button type="submit" loading={loading} fullWidth size="lg">
                Sign In to Dashboard
              </Button>
            </form>

            {/* Quick Demo Login Preset Buttons */}
            <div className="space-y-3 pt-2">
              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                <span className="absolute bg-white dark:bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-400">
                  Quick Demo Login
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => fillDemo('admin@property.com', 'admin123')}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 hover:border-primary-500 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Admin Demo</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('employee@property.com', 'employee123')}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 hover:border-primary-500 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all"
                >
                  <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Employee Demo</span>
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
