import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';

// Lazy-loaded pages
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Medicines = lazy(() => import('../pages/medicines/Medicines'));
const AddMedicine = lazy(() => import('../pages/medicines/AddMedicine'));
const MedicineDetails = lazy(() => import('../pages/medicines/MedicineDetails'));
const Categories = lazy(() => import('../pages/medicines/Categories'));
const Billing = lazy(() => import('../pages/billing/Billing'));
const Invoice = lazy(() => import('../pages/billing/Invoice'));
const Customers = lazy(() => import('../pages/customers/Customers'));
const Suppliers = lazy(() => import('../pages/suppliers/Suppliers'));
const PurchaseOrders = lazy(() => import('../pages/suppliers/PurchaseOrders'));
const Prescriptions = lazy(() => import('../pages/prescriptions/Prescriptions'));
const ExpiryAlerts = lazy(() => import('../pages/medicines/ExpiryAlerts'));
const LowStock = lazy(() => import('../pages/medicines/LowStock'));
const Sales = lazy(() => import('../pages/reports/Sales'));
const Reports = lazy(() => import('../pages/reports/Reports'));
const Employees = lazy(() => import('../pages/employees/Employees'));
const Notifications = lazy(() => import('../pages/settings/Notifications'));
const Settings = lazy(() => import('../pages/settings/Settings'));
const Profile = lazy(() => import('../pages/settings/Profile'));
const Help = lazy(() => import('../pages/settings/Help'));
const About = lazy(() => import('../pages/settings/About'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Page loader
const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
    <div style={{
      width: 48, height: 48,
      borderRadius: '50%',
      border: '3px solid var(--primary-soft)',
      borderTopColor: 'var(--primary)',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const routes = [
  // Public routes
  { path: '/login', element: <Suspense fallback={<PageLoader />}><Login /></Suspense> },
  { path: '/register', element: <Suspense fallback={<PageLoader />}><Register /></Suspense> },
  { path: '/forgot-password', element: <Suspense fallback={<PageLoader />}><ForgotPassword /></Suspense> },

  // Protected routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Suspense fallback={<PageLoader />}><Dashboard /></Suspense> },
      { path: 'medicines', element: <Suspense fallback={<PageLoader />}><Medicines /></Suspense> },
      { path: 'medicines/add', element: <Suspense fallback={<PageLoader />}><AddMedicine /></Suspense> },
      { path: 'medicines/:id', element: <Suspense fallback={<PageLoader />}><MedicineDetails /></Suspense> },
      { path: 'categories', element: <Suspense fallback={<PageLoader />}><Categories /></Suspense> },
      { path: 'billing', element: <Suspense fallback={<PageLoader />}><Billing /></Suspense> },
      { path: 'billing/invoice/:id', element: <Suspense fallback={<PageLoader />}><Invoice /></Suspense> },
      { path: 'customers', element: <Suspense fallback={<PageLoader />}><Customers /></Suspense> },
      { path: 'suppliers', element: <Suspense fallback={<PageLoader />}><Suppliers /></Suspense> },
      { path: 'purchase-orders', element: <Suspense fallback={<PageLoader />}><PurchaseOrders /></Suspense> },
      { path: 'prescriptions', element: <Suspense fallback={<PageLoader />}><Prescriptions /></Suspense> },
      { path: 'expiry-alerts', element: <Suspense fallback={<PageLoader />}><ExpiryAlerts /></Suspense> },
      { path: 'low-stock', element: <Suspense fallback={<PageLoader />}><LowStock /></Suspense> },
      { path: 'sales', element: <Suspense fallback={<PageLoader />}><Sales /></Suspense> },
      { path: 'reports', element: <Suspense fallback={<PageLoader />}><Reports /></Suspense> },
      { path: 'employees', element: <Suspense fallback={<PageLoader />}><Employees /></Suspense> },
      { path: 'notifications', element: <Suspense fallback={<PageLoader />}><Notifications /></Suspense> },
      { path: 'settings', element: <Suspense fallback={<PageLoader />}><Settings /></Suspense> },
      { path: 'profile', element: <Suspense fallback={<PageLoader />}><Profile /></Suspense> },
      { path: 'help', element: <Suspense fallback={<PageLoader />}><Help /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
    ]
  },

  // 404
  { path: '*', element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
];
