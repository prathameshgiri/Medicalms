import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, Moon, Sun, User, Settings, LogOut,
  ChevronDown, Globe, Calendar, MessageSquare, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { notifications } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';
import styles from './Navbar.module.css';

const Navbar = ({ onMenuToggle, sidebarWidth }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const notifColors = { warning: '#FB8C00', danger: '#E53935', success: '#43A047', info: '#2196F3' };

  return (
    <header
      className={styles.navbar}
      style={{ left: sidebarWidth }}
    >
      <div className={styles.left}>
        <motion.button
          className={styles.menuBtn}
          onClick={onMenuToggle}
          whileTap={{ scale: 0.9 }}
        >
          <Menu size={20} />
        </motion.button>

        {/* Search Bar */}
        <div className={styles.searchWrapper}>
          <div
            className={`${styles.searchBar} ${searchOpen ? styles.searchBarOpen : ''}`}
          >
            <Search size={16} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              placeholder="Search medicines, patients..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  className={styles.clearBtn}
                  onClick={() => { setSearchQuery(''); setSearchOpen(false); }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        {/* Date */}
        <div className={styles.dateDisplay}>
          <Calendar size={14} />
          <span>{formatDate(new Date(), 'dd MMM yyyy')}</span>
        </div>

        {/* Dark Mode Toggle */}
        <motion.button
          className={styles.iconBtn}
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>

        {/* Notifications */}
        <div className={styles.dropdown} ref={notifRef}>
          <motion.button
            className={styles.iconBtn}
            onClick={() => { setNotifOpen(p => !p); setProfileOpen(false); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <motion.span
                className={styles.badge}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                className={styles.dropdownPanel}
                style={{ width: 340 }}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.panelHeader}>
                  <span>Notifications</span>
                  <span className={styles.unreadBadge}>{unreadCount} new</span>
                </div>
                <div className={styles.notifList}>
                  {notifications.slice(0, 4).map(n => (
                    <div key={n.id} className={`${styles.notifItem} ${!n.read ? styles.unread : ''}`}>
                      <div
                        className={styles.notifDot}
                        style={{ background: notifColors[n.type] }}
                      />
                      <div className={styles.notifContent}>
                        <p className={styles.notifTitle}>{n.title}</p>
                        <p className={styles.notifMsg}>{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/notifications" className={styles.viewAll} onClick={() => setNotifOpen(false)}>
                  View all notifications →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className={styles.dropdown} ref={profileRef}>
          <motion.button
            className={styles.profileBtn}
            onClick={() => { setProfileOpen(p => !p); setNotifOpen(false); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.avatar}>
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.profileName}>{user?.name?.split(' ')[0] || 'Admin'}</span>
              <span className={styles.profileRole}>{user?.role || 'Admin'}</span>
            </div>
            <motion.span
              animate={{ rotate: profileOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={14} />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                className={styles.dropdownPanel}
                style={{ width: 220 }}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.profileHeader}>
                  <div className={styles.avatarLg}>{user?.name?.charAt(0) || 'A'}</div>
                  <div>
                    <p className={styles.profileName}>{user?.name}</p>
                    <p className={styles.profileEmail}>{user?.email}</p>
                  </div>
                </div>
                <div className={styles.menuList}>
                  <Link to="/profile" className={styles.menuItem} onClick={() => setProfileOpen(false)}>
                    <User size={15} /> My Profile
                  </Link>
                  <Link to="/settings" className={styles.menuItem} onClick={() => setProfileOpen(false)}>
                    <Settings size={15} /> Settings
                  </Link>
                  <div className={styles.divider} />
                  <button className={`${styles.menuItem} ${styles.logoutItem}`} onClick={logout}>
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
