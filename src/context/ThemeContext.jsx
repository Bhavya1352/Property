import { createContext } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  // Light mode only - no theme toggle
  const theme = 'light'

  // Set light mode on document root
  const root = document.documentElement
  root.classList.remove('dark')
  root.classList.add('light')

  return (
    <ThemeContext.Provider value={{ theme, isDark: false }}>
      {children}
    </ThemeContext.Provider>
  )
}
