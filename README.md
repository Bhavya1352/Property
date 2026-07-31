# Property Management System

A modern, production-ready property management system built with React, Vite, and Tailwind CSS. Designed for property managers and employees to efficiently manage, view, and filter property listings.

## 🎯 Features

### Authentication & Authorization
- **Secure Login/Register** - Email and password-based authentication
- **Role-Based Access Control** - Admin and Employee roles with different permissions
- **Session Persistence** - Automatic session restoration on page refresh
- **Protected Routes** - Unauthorized access prevention

### Dashboard & Analytics
- **Property Statistics** - Total properties, availability, occupancy, and monthly revenue
- **Responsive Layout** - Mobile-first design that works on all devices
- **Sticky Navigation** - Easy access to sidebar on mobile and desktop
- **User Profile** - Personalized welcome and quick access to user profile

### Property Management (Admin Only)
- **Add Properties** - Create new property listings with detailed information
- **Edit Properties** - Update existing property details
- **Delete Properties** - Remove properties with confirmation modal
- **Property Status** - Mark properties as available or occupied

### Property Viewing (All Users)
- **Property Cards** - Beautiful, responsive property cards with key details
- **Property Details** - Comprehensive property information and metrics
- **Image Gallery** - High-quality property images
- **Rental Information** - Clear monthly rent and annual revenue calculations

### Search & Filtering
- **Search by Title/Location** - Real-time search functionality
- **Filter by Type** - Filter properties by type (apartment, house, condo, etc.)
- **Filter by Status** - Filter by availability status
- **Sort Options** - Sort by rent (low to high, high to low) or date
- **Instant Results** - All filters apply instantly without page reload

### UI/UX Components
- **Modern Dashboard Design** - Premium, professional SaaS-like interface
- **Smooth Animations** - Framer Motion animations for better user experience
- **Toast Notifications** - Real-time feedback for user actions
- **Confirmation Modals** - Safety confirmations before dangerous actions
- **Loading Skeletons** - Beautiful loading states
- **Empty States** - Helpful messages when no data is available
- **Pagination** - Easy navigation through large property lists
- **Breadcrumbs** - Clear navigation path on detail pages

## 🛠 Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6
- **Forms**: React Hook Form + Zod Validation
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: Context API
- **Data Persistence**: localStorage

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Textarea.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   └── LoadingSkeleton.jsx
│   ├── layout/                  # Layout components
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── DashboardLayout.jsx
│   ├── property/                # Property-specific components
│   │   ├── PropertyCard.jsx
│   │   ├── PropertyFilters.jsx
│   │   └── PropertyForm.jsx
│   └── common/                  # Common components
│       ├── Pagination.jsx
│       ├── Breadcrumbs.jsx
│       ├── ConfirmModal.jsx
│       └── StatCard.jsx
├── pages/                       # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── PropertyDetails.jsx
│   ├── AddProperty.jsx
│   ├── EditProperty.jsx
│   └── NotFound.jsx
├── context/                     # Context API
│   ├── AuthContext.jsx
│   └── PropertyContext.jsx
├── hooks/                       # Custom hooks
│   ├── useAuth.js
│   ├── useProperty.js
│   └── useToast.js
├── services/                    # Business logic
│   ├── authService.js
│   └── propertyService.js
├── routes/                      # Route protection
│   └── ProtectedRoute.jsx
├── utils/                       # Utilities
│   ├── cn.js
│   ├── format.js
│   └── validation.js
├── data/                        # Mock data
│   ├── users.json
│   └── properties.json
├── App.jsx                      # Main app component
├── main.jsx                     # Entry point
└── index.css                    # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/pnpm/yarn

### Installation

1. **Clone and navigate to project**
   ```bash
   cd property-management-system
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`

## 🔐 Authentication

### Default Credentials

**Admin Account:**
- Email: `admin@property.com`
- Password: `admin123`

**Employee Account:**
- Email: `employee@property.com`
- Password: `employee123`

### How Authentication Works

1. **Login** - Users enter email and password
2. **Validation** - Credentials are verified against the user database
3. **Session Storage** - On successful login, user data is stored in `localStorage`
4. **Session Persistence** - App automatically restores session on page refresh
5. **Protected Routes** - Unauthenticated users are redirected to login
6. **Logout** - Clears session data and redirects to login page

### User Roles

**Admin:**
- Can view all properties
- Can add new properties
- Can edit existing properties
- Can delete properties
- Can search and filter properties

**Employee:**
- Can only view properties
- Can search and filter properties
- Cannot add, edit, or delete properties
- Delete button is hidden from UI

## 💾 Data Persistence

### localStorage Strategy

The application uses `localStorage` to persist data between sessions:

1. **User Session** - Stored in `currentUser` key
2. **Properties** - Stored in `properties` key
3. **Automatic Sync** - All changes are immediately saved to localStorage

### How It Works

- On app load, user data is restored from localStorage
- When user logs in, their data is saved to localStorage
- All property changes (add, edit, delete) are immediately saved
- On logout, session data is cleared from localStorage
- Fresh app instance loads default data on first visit

## 🔍 Search & Filter

### Real-Time Search
- Search by property title or location
- Results update instantly as you type
- Case-insensitive matching

### Filters
- **By Type**: Select property type (apartment, house, condo, etc.)
- **By Status**: Filter by availability (available or occupied)
- **Sort By**: Sort by rent (ascending/descending) or date

### Pagination
- Properties are displayed 6 per page
- Easy navigation with pagination controls
- Current page indicator

## ✅ Validation

### Form Validation (Zod + React Hook Form)

**Login Form:**
- Email: Valid email format required
- Password: Required field

**Register Form:**
- Name: Minimum 2 characters
- Email: Valid email format required
- Password: Minimum 6 characters
- Confirm Password: Must match password field

**Property Form:**
- Title: 3-100 characters
- Type: Must select a valid type
- Location: Minimum 5 characters
- Rent: Positive number, minimum $100
- Status: Must select available or occupied
- Description: 10-1000 characters
- Bedrooms: 1-10 number
- Bathrooms: 1-10 number
- Image URL: Valid URL format

## 🎨 Design System

### Color Palette
- **Primary**: Slate blue (#0ea5e9)
- **Neutrals**: Slate grays (#f8fafc to #0f172a)
- **Accents**: Green, Orange, Red

### Typography
- **Heading Font**: System fonts (Apple System, Segoe UI)
- **Body Font**: Same system fonts for consistency
- **Font Sizes**: 12px to 32px scale

### Components
- Rounded corners: 8px default
- Soft shadows for depth
- 16px base spacing unit

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet**: Adapted layout for medium screens
- **Desktop**: Full-featured layout on large screens
- **Breakpoints**: md (768px), lg (1024px)

## 🚢 Deployment

### Build for Production

```bash
pnpm build
# or
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the project
   - Click Deploy

3. **Environment Variables** (if needed)
   - No environment variables required for this demo
   - All data is stored in localStorage

### Deploy to Other Platforms

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
- Update `vite.config.js` with `base: '/repo-name/'`
- Run `npm run build`
- Deploy the `dist` folder

## 🔧 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Run linter
pnpm lint
```

### Project Configuration

- **Vite Config**: `vite.config.js` - Build and dev server settings
- **Tailwind Config**: `tailwind.config.js` - Design system tokens
- **PostCSS Config**: `postcss.config.js` - CSS processing
- **ESLint Config**: `.eslintrc.cjs` - Code quality rules

## 📦 Dependencies

### Production
- `react` - UI library
- `react-dom` - React rendering
- `react-router-dom` - Client-side routing
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `lucide-react` - Icon library
- `framer-motion` - Animation library
- `date-fns` - Date utility library
- `clsx` - Class name utility

### Development
- `vite` - Build tool
- `tailwindcss` - CSS framework
- `postcss` - CSS processing
- `autoprefixer` - CSS vendor prefixes
- `eslint` - Code linter

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)
- [React Hook Form Docs](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Data Not Persisting
- Check browser's localStorage is enabled
- Clear browser cache and cookies
- Check browser console for errors

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using React and Tailwind CSS**
