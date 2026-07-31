import users from '../data/users.json'

export const authService = {
  login: (email, password) => {
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      const { password, ...userWithoutPassword } = user
      return { success: true, user: userWithoutPassword }
    }
    return { success: false, error: 'Invalid email or password' }
  },

  register: (email, password, name) => {
    const userExists = users.some(u => u.email === email)
    if (userExists) {
      return { success: false, error: 'User already exists' }
    }
    
    const newUser = {
      id: String(users.length + 1),
      email,
      password,
      name,
      role: 'employee',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }
    
    users.push(newUser)
    const { password: _, ...userWithoutPassword } = newUser
    return { success: true, user: userWithoutPassword }
  },

  logout: () => {
    return { success: true }
  },
}
