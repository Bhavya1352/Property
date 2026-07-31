'use client'

import { useState } from 'react'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl bg-[#131C2E] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[700px]">
        
        {/* Left Panel - Sign In Form (40%) */}
        <div className="w-full lg:w-[40%] p-8 md:p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-2xl font-semibold text-white">PropHub</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-base">Sign in to manage your properties</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 bg-[#0B1120] border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all duration-200"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#0B1120] border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all duration-200"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-[#0B1120] text-[#10B981] focus:ring-[#10B981] focus:ring-offset-0"
                />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#10B981] hover:text-[#059669] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#10B981] hover:bg-[#059669] text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 focus:ring-offset-[#131C2E]"
            >
              Sign In
            </button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#131C2E] text-slate-500">Demo login</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B1120] border border-slate-700/50 rounded-xl text-slate-300 hover:border-slate-600 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="text-sm font-medium">Admin</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0B1120] border border-slate-700/50 rounded-xl text-slate-300 hover:border-slate-600 hover:text-white transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <span className="text-sm font-medium">Manager</span>
              </button>
            </div>
          </div>

          {/* Create Account Link */}
          <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-[#10B981] hover:text-[#059669] font-medium transition-colors">
              Create account
            </a>
          </p>
        </div>

        {/* Right Panel - Premium Real Estate Visual (60%) */}
        <div className="w-full lg:w-[60%] relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#131C2E] to-slate-900">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-[#131C2E]/70 to-emerald-900/20"></div>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}></div>
            
            {/* Luxury Building Illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Building silhouette */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-96 bg-gradient-to-t from-slate-800/50 to-transparent rounded-t-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-48 h-80 bg-gradient-to-t from-slate-700/40 to-transparent rounded-t-2xl"></div>
                <div className="absolute bottom-0 right-1/3 w-56 h-72 bg-gradient-to-t from-slate-700/30 to-transparent rounded-t-2xl"></div>
                
                {/* Window lights */}
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 grid grid-cols-4 gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-3 h-4 bg-[#10B981]/30 rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Analytics Cards */}
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
            {/* Top Stats */}
            <div className="flex gap-4">
              <div className="bg-[#0B1120]/80 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#10B981]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-slate-400 text-xs font-medium">Occupancy</span>
                </div>
                <p className="text-2xl font-semibold text-white">94.2%</p>
                <p className="text-xs text-[#10B981] mt-1">↑ 2.4%</p>
              </div>

              <div className="bg-[#0B1120]/80 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-slate-400 text-xs font-medium">Revenue</span>
                </div>
                <p className="text-2xl font-semibold text-white">$2.4M</p>
                <p className="text-xs text-[#10B981] mt-1">↑ 12.8%</p>
              </div>
            </div>

            {/* Middle Property Preview Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-[#0B1120]/90 backdrop-blur-md border border-slate-700/40 rounded-2xl p-4 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl mb-3 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="absolute top-2 right-2 bg-[#10B981] text-white text-xs px-2 py-1 rounded-full font-medium">
                  Active
                </div>
              </div>
              <h3 className="text-white font-semibold mb-1">Skyline Tower</h3>
              <p className="text-slate-400 text-sm mb-3">Downtown, Manhattan</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Units</p>
                  <p className="text-white font-medium">248</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Avg Rent</p>
                  <p className="text-white font-medium">$3,200</p>
                </div>
              </div>
            </div>

            {/* Bottom Stats & Location */}
            <div className="flex items-end justify-between">
              <div className="bg-[#0B1120]/80 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-slate-400 text-xs font-medium">Active Properties</span>
                </div>
                <p className="text-2xl font-semibold text-white">156</p>
                <p className="text-xs text-slate-500 mt-1">Across 12 locations</p>
              </div>

              {/* Location Chip */}
              <div className="bg-[#0B1120]/80 backdrop-blur-sm border border-slate-700/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-sm font-medium">New York, NY</span>
              </div>
            </div>
          </div>

          {/* Elegant lighting effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  )
}
