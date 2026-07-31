import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, ShieldCheck, UserCheck } from 'lucide-react'
import { loginSchema } from '../utils/validation'
import { authService } from '../services/authService'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { Toast } from '../components/ui/Toast'

export const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { toast, showToast, hideToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

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
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8">
      <Toast toast={toast} onClose={hideToast} />
      
      <div className="w-full max-w-6xl bg-[#131C2E] rounded-none overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[600px] xs:min-h-[650px] sm:min-h-[700px]">
        
        {/* Left Panel - Sign In Form (40%) */}
        <div className="w-full lg:w-[40%] p-5 xs:p-6 sm:p-8 md:p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2 xs:gap-3 mb-6 xs:mb-8 sm:mb-10">
            <img 
              src="/logo.png" 
              alt="PropHub Logo" 
              className="h-8 xs:h-9 sm:h-10 w-auto"
            />
            <span className="text-xl xs:text-2xl font-semibold text-white">PropHub</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-6 xs:mb-8">
            <h1 className="text-2xl xs:text-3xl font-semibold text-white mb-1.5 xs:mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-sm xs:text-base">Sign in to manage your properties</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 xs:space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs xs:text-sm font-medium text-slate-300 mb-1.5 xs:mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-4 xs:w-5 h-4 xs:h-5 text-slate-500" />
                <input
                  type="email"
                  id="email"
                  placeholder="you@company.com"
                  className={`w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2.5 xs:py-3 bg-[#0B1120] border rounded-lg xs:rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all duration-200 text-xs xs:text-sm ${errors.email ? 'border-red-500' : 'border-slate-700/50'}`}
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-red-400 text-[10px] xs:text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs xs:text-sm font-medium text-slate-300 mb-1.5 xs:mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 w-4 xs:w-5 h-4 xs:h-5 text-slate-500" />
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2.5 xs:py-3 bg-[#0B1120] border rounded-lg xs:rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all duration-200 text-xs xs:text-sm ${errors.password ? 'border-red-500' : 'border-slate-700/50'}`}
                  {...register('password')}
                />
              </div>
              {errors.password && <p className="text-red-400 text-[10px] xs:text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 xs:gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 xs:w-4 h-3.5 xs:h-4 rounded border-slate-600 bg-[#0B1120] text-[#10B981] focus:ring-[#10B981] focus:ring-offset-0"
                />
                <span className="text-xs xs:text-sm text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-xs xs:text-sm text-[#10B981] hover:text-[#059669] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 xs:py-3 bg-[#10B981] hover:bg-[#059669] disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg xs:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 focus:ring-offset-[#131C2E] text-xs xs:text-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-4 xs:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs xs:text-sm">
                <span className="px-3 xs:px-4 bg-[#131C2E] text-slate-500">Demo login</span>
              </div>
            </div>

            <div className="mt-3 xs:mt-4 grid grid-cols-2 gap-2 xs:gap-3">
              <button
                type="button"
                onClick={() => fillDemo('admin@property.com', 'admin123')}
                className="flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-2 xs:py-2.5 bg-[#0B1120] border border-slate-700/50 rounded-lg xs:rounded-xl text-slate-300 hover:border-slate-600 hover:text-white transition-all duration-200 text-xs xs:text-sm"
              >
                <ShieldCheck className="w-4 xs:w-5 h-4 xs:h-5" />
                <span className="text-xs xs:text-sm font-medium">Admin</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemo('employee@property.com', 'employee123')}
                className="flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-2 xs:py-2.5 bg-[#0B1120] border border-slate-700/50 rounded-lg xs:rounded-xl text-slate-300 hover:border-slate-600 hover:text-white transition-all duration-200 text-xs xs:text-sm"
              >
                <UserCheck className="w-4 xs:w-5 h-4 xs:h-5" />
                <span className="text-xs xs:text-sm font-medium">Manager</span>
              </button>
            </div>
          </div>

          {/* Create Account Link */}
          <p className="mt-6 xs:mt-8 text-center text-slate-400 text-xs xs:text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#10B981] hover:text-[#059669] font-medium transition-colors">
              Create account
            </Link>
          </p>
        </div>

        {/* Right Panel - Premium Real Estate Visual (60%) */}
        <div className="w-full lg:w-[60%] relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#131C2E] to-slate-900 hidden lg:block">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/login-image-right-side.webp" 
              alt="Login" 
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-[#131C2E]/60 to-emerald-900/10"></div>
          </div>

          {/* Elegant lighting effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  )
}
