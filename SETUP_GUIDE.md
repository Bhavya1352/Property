# Property Management System - Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```

The app will automatically open at `http://localhost:5173`

### 3. Login with Demo Account
Use these credentials to test the application:

**Admin Account** (Full access):
- Email: `admin@property.com`
- Password: `admin123`

**Employee Account** (View-only):
- Email: `employee@property.com`
- Password: `employee123`

---

## Detailed Setup Instructions

### Prerequisites

You need the following installed on your computer:

- **Node.js** version 16 or higher
  - Download from [nodejs.org](https://nodejs.org)
  - Verify installation: `node --version`

- **pnpm** (Package Manager)
  - Install globally: `npm install -g pnpm`
  - Verify installation: `pnpm --version`

### Step-by-Step Setup

#### Step 1: Get the Project Files

**Option A: Clone from Git**
```bash
git clone <repository-url>
cd property-management-system
```

**Option B: Extract ZIP File**
- Download and extract the project ZIP file
- Open terminal and navigate to the project folder

#### Step 2: Install Dependencies

```bash
pnpm install
```

This downloads all required packages (React, Vite, Tailwind, etc.)

**Expected output:**
```
✓ All packages installed successfully
```

#### Step 3: Start the Development Server

```bash
pnpm dev
```

**Expected output:**
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

#### Step 4: Open in Browser

The app will automatically open at `http://localhost:5173`

If it doesn't open automatically, manually visit the URL in your browser.

---

## Using the Application

### Login Process

1. You'll see the login page with demo credentials displayed
2. Enter email and password
3. Click "Sign In"
4. You'll be redirected to the dashboard

### Admin Features (admin@property.com)

**Dashboard:**
- View all property statistics (total, available, occupied, revenue)
- See all properties in a grid layout with pagination

**Add Property:**
- Click "Add Property" button
- Fill in all property details:
  - Title, Type, Location
  - Monthly Rent, Status
  - Description, Image URL
  - Bedrooms, Bathrooms
- Click "Add Property" to save

**Edit Property:**
- On any property card or details page
- Click "Edit" button
- Modify any fields
- Click "Update Property" to save

**Delete Property:**
- On any property card or details page
- Click "Delete" button (trash icon)
- Confirm deletion in the modal
- Property is permanently removed

**Search & Filter:**
- Search by property title or location
- Filter by property type
- Filter by status (available/occupied)
- Sort by rent or date

### Employee Features (employee@property.com)

**Dashboard:**
- View all properties
- Cannot add, edit, or delete properties
- Can search, filter, and sort properties
- Can view full property details

**View Details:**
- Click "View" button on any property
- See complete property information
- View rental statistics

---

## Understanding the File Structure

### Key Folders

```
src/
├── pages/              - Full page components (Login, Dashboard, etc)
├── components/         - Reusable UI components
├── context/            - Global state (Auth, Properties)
├── hooks/              - Custom React hooks
├── services/           - Business logic (Auth, Property operations)
├── utils/              - Helper functions
└── data/               - Mock data
```

### Important Files

- `App.jsx` - Main router component
- `main.jsx` - App entry point
- `index.css` - Global styles
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind design tokens
- `package.json` - Dependencies and scripts

---

## How Data is Stored

### localStorage

All data is stored in browser's localStorage:

- **User Session** - Stored as `currentUser`
- **Properties** - Stored as `properties`

### Default Data

On first load, the app automatically creates 6 sample properties and 2 demo users.

### Manual Data Reset

To reset all data to defaults:

1. Open browser DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage"
4. Find your domain
5. Delete `currentUser` and `properties` entries
6. Refresh the page

### Exporting Data

To backup your data:
```javascript
// In browser console:
JSON.stringify(JSON.parse(localStorage.getItem('properties')))
```

---

## Customization Guide

### Change App Title

**File:** `index.html`
```html
<title>My Property Manager</title>
```

### Change Logo/Brand Name

**File:** `src/components/layout/Sidebar.jsx`
```jsx
<h1 className="text-xl font-bold text-slate-900">Your App Name</h1>
```

### Change Colors

**File:** `tailwind.config.js`
```js
colors: {
  primary: {
    600: '#YOUR_COLOR_HEX',
    // ... other shades
  }
}
```

### Add New Properties

**File:** `src/data/properties.json` - Add objects to the array

### Add New Users

**File:** `src/data/users.json` - Add user objects to the array

---

## Building for Production

### Create Optimized Build

```bash
pnpm build
```

This creates a `dist` folder with optimized files ready for deployment.

### Preview Production Build

```bash
pnpm preview
```

This lets you test the production build locally.

---

## Deploying to Vercel

### Method 1: Connect GitHub (Recommended)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New" → "Project"
4. Select your GitHub repository
5. Click "Deploy"

Vercel will automatically build and deploy your app!

### Method 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Method 3: Deploy ZIP File

1. Run `pnpm build`
2. ZIP the entire project
3. Upload to your hosting service
4. Point to the `dist` folder as the public directory

---

## Troubleshooting

### Problem: Port 5173 Already in Use

**Solution:**
```bash
# Find the process using the port
lsof -i :5173

# Kill the process (replace PID with the actual ID)
kill -9 <PID>

# Try again
pnpm dev
```

### Problem: Dependencies Not Installing

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Problem: Styling Not Loading

**Solution:**
```bash
# Rebuild CSS
rm -rf dist
pnpm build
```

### Problem: Data Not Persisting

**Check:**
1. localStorage is enabled in browser
2. Browser privacy settings aren't blocking storage
3. Check DevTools → Application → Local Storage

### Problem: Login Not Working

**Check:**
1. Email and password are exactly correct (case-sensitive)
2. No extra spaces in input
3. Browser localStorage is enabled

### Problem: Components Not Updating

**Solution:**
```bash
# Hard refresh browser
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

---

## Performance Tips

### For Development

```bash
# Use faster build
pnpm dev --host
```

### For Production

```bash
# Analyze bundle size
pnpm build --analyze
```

### Browser DevTools

Press F12 and use:
- **Performance** tab - Profile performance
- **Network** tab - Check file sizes
- **Console** - Check for errors

---

## Code Quality

### Run Linter

```bash
pnpm lint
```

### Fix Linting Issues

```bash
pnpm lint --fix
```

---

## Common Tasks

### Add a New Property Type

1. Update validation in `src/utils/validation.js`
2. Add to property type options in components

### Create a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/layout/Sidebar.jsx`

### Add a New User

1. Add to `src/data/users.json`
2. Use email/password to login

### Change Theme Color

1. Edit `src/tailwind.config.js`
2. Update color values in `theme.colors`
3. Colors automatically update throughout app

---

## Environment Variables

Currently, this app doesn't need environment variables!

If you want to add API integration later, create a `.env` file:

```bash
VITE_API_URL=https://api.example.com
```

Then access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Getting Help

### Documentation

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)

### Debugging

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Use React DevTools browser extension
4. Add `console.log()` statements to debug

### Common Issues

Search this document for your error message or check:
- Browser console for JavaScript errors
- Network tab for failed requests
- Application tab for localStorage issues

---

## Next Steps

1. **Explore the Dashboard** - Get familiar with the UI
2. **Test Admin Features** - Add, edit, delete properties
3. **Test Employee Features** - View and filter properties
4. **Customize** - Change colors, add your own data
5. **Deploy** - Share your app with others

---

## FAQ

**Q: Can I add more properties?**
A: Yes! Click "Add Property" (admin only) or edit `src/data/properties.json`

**Q: Can I change the design?**
A: Yes! Edit `src/tailwind.config.js` or component styles

**Q: Can I add authentication with a database?**
A: Yes! Replace `src/services/authService.js` with your API calls

**Q: Can I export data?**
A: Yes! Open DevTools console and run: `JSON.stringify(JSON.parse(localStorage.getItem('properties')))`

**Q: Is this production-ready?**
A: The code quality is production-ready, but add a real database before going live

---

## Support

If you have questions or encounter issues:

1. Check this guide and the README
2. Review the code comments
3. Check browser console for errors
4. Create an issue on GitHub

---

**Happy building! 🚀**
