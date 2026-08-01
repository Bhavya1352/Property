# PropHub – Property Management System

A responsive property management application built with React and Vite. It includes role-based authentication, property management, search, filter, sorting, dark mode, and localStorage persistence.

## Features
- Authentication & Protected Routes
- Role-based Access (Admin / Employee)
- Property CRUD (Create, Read, Update, Delete)
- Search, Filter & Sort
- Grid & Table View
- Dark/Light Mode
- Responsive Design (Mobile, Tablet, Laptop, Desktop)
- localStorage Persistence
- Loading & Empty States
- Toast Notifications
- Form Validation

## Tech Stack
React • Vite • Tailwind CSS • React Router • Context API • React Hook Form • Zod • Framer Motion • Lucide React

## Demo Credentials

**Admin Account:**
- Email: admin@property.com
- Password: admin123
- Permissions: Add, Edit, Delete, View properties

**Employee Account:**
- Email: employee@property.com
- Password: employee123
- Permissions: View properties only

## Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
Property/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── context/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API/service layer
│   ├── utils/           # Utility functions
│   └── data/            # Mock data
├── public/              # Static assets
└── index.html           # Entry HTML
```

## Deployment

This project is ready for deployment on Vercel, Netlify, or any static hosting service.
