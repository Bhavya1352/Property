import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, ShieldCheck, User } from 'lucide-react'
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
      email: '',
      password: '',
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
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
      <Toast toast={toast} onClose={hideToast} />
      
      <div className="w-full max-w-6xl bg-[#131C2E] rounded-none overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[500px] xs:min-h-[550px] sm:min-h-[600px] lg:min-h-[700px]">
        
        {/* Left Panel - Sign In Form (40%) */}
        <div className="w-full lg:w-[40%] p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 mb-4 xs:mb-6 sm:mb-8 lg:mb-10">
            <img 
              src="/logo.png" 
              alt="PropHub Logo" 
              className="h-6 xs:h-7 sm:h-8 lg:h-10 w-auto"
            />
            <span className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-white">PropHub</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-4 xs:mb-6 sm:mb-8">
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white mb-1 xs:mb-1.5 sm:mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-[10px] xs:text-xs sm:text-sm">Sign in to manage your properties</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 xs:space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-[10px] xs:text-xs sm:text-sm font-medium text-slate-300 mb-1 xs:mb-1.5 sm:mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-2.5 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5 text-slate-500" />
                <input
                  type="email"
                  id="email"
                  placeholder="you@company.com"
                  className={`w-full pl-8 xs:pl-10 sm:pl-12 pr-2.5 xs:pr-3 sm:pr-4 py-2 xs:py-2.5 sm:py-3 bg-[#0B1120] border rounded-lg xs:rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all duration-200 text-[10px] xs:text-xs sm:text-sm ${errors.email ? 'border-red-500' : 'border-slate-700/50'}`}
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-red-400 text-[9px] xs:text-[10px] sm:text-xs mt-0.5 xs:mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-[10px] xs:text-xs sm:text-sm font-medium text-slate-300 mb-1 xs:mb-1.5 sm:mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-2.5 xs:left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5 text-slate-500" />
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`w-full pl-8 xs:pl-10 sm:pl-12 pr-2.5 xs:pr-3 sm:pr-4 py-2 xs:py-2.5 sm:py-3 bg-[#0B1120] border rounded-lg xs:rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all duration-200 text-[10px] xs:text-xs sm:text-sm ${errors.password ? 'border-red-500' : 'border-slate-700/50'}`}
                  {...register('password')}
                />
              </div>
              {errors.password && <p className="text-red-400 text-[9px] xs:text-[10px] sm:text-xs mt-0.5 xs:mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 rounded border-slate-600 bg-[#0B1120] text-[#10B981] focus:ring-[#10B981] focus:ring-offset-0"
                />
                <span className="text-[10px] xs:text-xs sm:text-sm text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-[10px] xs:text-xs sm:text-sm text-[#10B981] hover:text-[#059669] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 xs:py-2.5 sm:py-3 bg-[#10B981] hover:bg-[#059669] disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg xs:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 focus:ring-offset-[#131C2E] text-[10px] xs:text-xs sm:text-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-3 xs:mt-4 sm:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-[10px] xs:text-xs sm:text-sm">
                <span className="px-2 xs:px-3 sm:px-4 bg-[#131C2E] text-slate-500">Demo login</span>
              </div>
            </div>

            <div className="mt-2 xs:mt-3 sm:mt-4 grid grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => fillDemo('admin@property.com', 'admin123')}
                className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 bg-[#0B1120] border border-slate-700/50 rounded-lg xs:rounded-xl text-slate-300 hover:border-slate-600 hover:text-white transition-all duration-200 text-[10px] xs:text-xs sm:text-sm"
              >
                <ShieldCheck className="w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5" />
                <span className="text-[10px] xs:text-xs sm:text-sm font-medium">Admin</span>
              </button>
              <button
                type="button"
                onClick={() => fillDemo('employee@property.com', 'employee123')}
                className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 bg-[#0B1120] border border-slate-700/50 rounded-lg xs:rounded-xl text-slate-300 hover:border-slate-600 hover:text-white transition-all duration-200 text-[10px] xs:text-xs sm:text-sm"
              >
                <User className="w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5" />
                <span className="text-[10px] xs:text-xs sm:text-sm font-medium">Employee</span>
              </button>
            </div>
          </div>

          {/* Create Account Link */}
          <p className="mt-4 xs:mt-6 sm:mt-8 text-center text-slate-400 text-[10px] xs:text-xs sm:text-sm">
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
