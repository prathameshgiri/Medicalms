import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const sidebarWidth = isMobile ? 0 : (collapsed ? 72 : 260);

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <Sidebar 
        collapsed={isMobile ? false : collapsed} 
        onToggle={() => isMobile ? setMobileOpen(false) : setCollapsed(p => !p)} 
        isMobile={isMobile}
        mobileOpen={mobileOpen}
      />
      
      <div
        className={styles.main}
        style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.35s cubic-bezier(0.25,0.46,0.45,0.94)' }}
      >
        <Navbar
          onMenuToggle={() => isMobile ? setMobileOpen(true) : setCollapsed(p => !p)}
          sidebarWidth={sidebarWidth}
        />
        <motion.main
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default MainLayout;
