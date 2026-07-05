import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Pill, Package, Tag, Receipt, TrendingUp,
  Users, Truck, FileText, AlertTriangle, ShoppingCart, BarChart2,
  UserCog, Bell, Settings, LogOut, ChevronLeft, ChevronRight,
  HelpCircle, Info, Layers, Shield, Stethoscope
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { sidebarVariants, sidebarLabelVariants } from '../../animations/variants';
import styles from './Sidebar.module.css';

const navGroups = [
  {
    label: 'Main',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ]
  },
  {
    label: 'Inventory',
    items: [
      { to: '/medicines', icon: Pill, label: 'Medicines' },
      { to: '/categories', icon: Tag, label: 'Categories' },
      { to: '/low-stock', icon: Layers, label: 'Low Stock' },
      { to: '/expiry-alerts', icon: AlertTriangle, label: 'Expiry Alerts' },
    ]
  },
  {
    label: 'Commerce',
    items: [
      { to: '/billing', icon: Receipt, label: 'Billing / POS' },
      { to: '/sales', icon: TrendingUp, label: 'Sales' },
      { to: '/purchase-orders', icon: ShoppingCart, label: 'Purchase Orders' },
      { to: '/prescriptions', icon: Stethoscope, label: 'Prescriptions' },
    ]
  },
  {
    label: 'People',
    items: [
      { to: '/customers', icon: Users, label: 'Customers' },
      { to: '/suppliers', icon: Truck, label: 'Suppliers' },
      { to: '/employees', icon: UserCog, label: 'Employees' },
    ]
  },
  {
    label: 'Analytics',
    items: [
      { to: '/reports', icon: BarChart2, label: 'Reports' },
    ]
  },
  {
    label: 'System',
    items: [
      { to: '/notifications', icon: Bell, label: 'Notifications' },
      { to: '/settings', icon: Settings, label: 'Settings' },
      { to: '/help', icon: HelpCircle, label: 'Help Center' },
      { to: '/about', icon: Info, label: 'About' },
    ]
  }
];

const Sidebar = ({ collapsed, onToggle, isMobile, mobileOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <motion.aside
      className={styles.sidebar}
      variants={sidebarVariants}
      animate={isMobile ? (mobileOpen ? 'mobileOpen' : 'mobileClosed') : (collapsed ? 'collapsed' : 'expanded')}
      initial={false}
    >
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Shield size={22} />
        </div>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              className={styles.logoText}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.logoName}>PharmaFlow</span>
              <span className={styles.logoSub}>Management System</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {navGroups.map((group) => (
          <div key={group.label} className={styles.navGroup}>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  className={styles.groupLabel}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {group.label}
                </motion.span>
              )}
            </AnimatePresence>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <span className={`${styles.navIcon} ${isActive ? styles.navIconActive : ''}`}>
                      <item.icon size={20} />
                    </span>
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          className={styles.navLabel}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {isActive && (
                      <motion.div
                        className={styles.activeIndicator}
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User Profile Bottom */}
      <div className={styles.userSection}>
        <div className={styles.userAvatar}>
          {user?.name?.charAt(0) || 'A'}
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className={styles.userInfo}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.userName}>{user?.name || 'Admin'}</span>
              <span className={styles.userRole}>{user?.role || 'Admin'}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          className={styles.logoutBtn}
          onClick={logout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Logout"
        >
          <LogOut size={18} />
        </motion.button>
      </div>

      {/* Toggle Button */}
      {!isMobile && (
        <motion.button
          className={styles.toggleBtn}
          onClick={onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </motion.button>
      )}
    </motion.aside>
  );
};

export default Sidebar;
