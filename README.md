# Property Management System (PropHub)

A production-ready, high-performance Property Management SaaS application built with **React 18**, **Vite**, **Tailwind CSS**, **Zod**, and **React Hook Form**. Inspired by modern SaaS dashboard design languages like **Vercel**, **Linear**, and **Stripe**, incorporating glassmorphism, responsive navigation, dark/light theme toggle, role-based access control, and complete `localStorage` persistence.

---

## Features Overview

### 🔐 Authentication & Role-Based Access Control (RBAC)
- **Role Permissions**:
  - **Admin**: Complete CRUD capabilities — Add Property, Edit Property, Delete Property (with modal confirmation), View, Search, Filter, and Sort.
  - **Employee**: Read-only capabilities — View Property details, Search by title/location, Filter by type/status, and Sort by rent/date. Delete, Edit, and Add buttons are strictly hidden.
- **Default Accounts**:
  - **Admin**: `admin@property.com` / `admin123`
  - **Employee**: `employee@property.com` / `employee123`
- **Session Persistence**: Authentication session persists in `localStorage` across page refreshes.

### 🏢 Property Management & Instant CRUD
- **Create & Edit**: Form validation powered by **React Hook Form** + **Zod** schema with live image preview.
- **Delete**: Accessible only to Admins with a confirmation modal (`ConfirmModal`).
- **Data Persistence**: Synchronized immediately with `localStorage`.

### 🔍 Real-Time Search, Filtering, and Sorting
- **Search**: Instant title & location search.
- **Filter**: Filter by property type (*Apartment, House, Condo, Studio, Townhouse, Loft*) and status (*Available, Occupied*).
- **Sort**: Sort by *Rent: Low to High*, *Rent: High to Low*, *Newest First*, or *Oldest First*.
- **View Toggle**: Switch seamlessly between **Grid View** and **Table View**.

### 🎨 Design & Aesthetic Excellence (Watermelon / Shadcn Vibe)
- **Dark Mode**: Full dark/light mode toggle with persistent preferences.
- **Micro-Animations**: Powered by **Framer Motion**.
- **Metrics Dashboard**: Cards for *Total Properties*, *Available*, *Occupied*, and calculated *Monthly Revenue*.
- **System Feed**: Recent Activity widget for tracking system updates.
- **Toast Notifications**: Interactive feedback toasts for all user actions.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM (v6)
- **State Management**: Context API (`AuthContext`, `PropertyContext`, `ThemeContext`)
- **Styling**: Tailwind CSS with custom design tokens
- **Form Handling**: React Hook Form
- **Schema Validation**: Zod
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## 📂 Project Structure

```
src/
├── components/
│   ├── common/         # Breadcrumbs, ConfirmModal, Pagination, StatCard, RecentActivity
│   ├── forms/          # Reusable form field elements
│   ├── layout/         # Header, Sidebar, DashboardLayout
│   ├── property/       # PropertyCard, PropertyFilters, PropertyForm, PropertyTableView
│   └── ui/             # Badge, Button, Card, Input, Select, Textarea, Modal, Toast, UserDropdown
├── context/            # AuthContext, PropertyContext, ThemeContext
├── data/               # Default users & initial properties JSON
├── hooks/              # Custom hooks (useAuth, useProperty, useTheme, useToast)
├── pages/              # Login, Register, Dashboard, PropertyDetails, AddProperty, EditProperty, NotFound
├── routes/             # ProtectedRoute wrapper
├── services/           # authService.js, propertyService.js
├── utils/              # cn.js, format.js, validation.js
├── App.jsx             # Main routing application wrapper
├── index.css           # Tailwind layers, glassmorphism & dark mode styles
└── main.jsx            # Application entry point
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## ☁️ Deployment on Vercel

1. Push your repository to GitHub.
2. Import the project into your **Vercel Dashboard**.
3. Vercel automatically detects Vite framework settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy! The included `vercel.json` ensures all single-page application routes redirect seamlessly to `index.html`.
