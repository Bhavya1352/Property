import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { PropertyProvider } from './context/PropertyContext'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { PropertyDetails } from './pages/PropertyDetails'
import { AddProperty } from './pages/AddProperty'
import { EditProperty } from './pages/EditProperty'
import { NotFound } from './pages/NotFound'
import ModernPropertyCardDemo from './components/property/ModernPropertyCardDemo'
import { SalesPerformanceDashboardDemo } from './components/dashboard/SalesPerformanceDashboardDemo'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <PropertyProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/property/:id"
                element={
                  <ProtectedRoute>
                    <PropertyDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/property/add"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AddProperty />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/property/edit/:id"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <EditProperty />
                  </ProtectedRoute>
                }
              />

              {/* Demo routes */}
              <Route path="/demo/modern-card" element={<ModernPropertyCardDemo />} />
              <Route path="/demo/sales-dashboard" element={<SalesPerformanceDashboardDemo />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </PropertyProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
