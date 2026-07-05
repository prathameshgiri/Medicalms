import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Store, FileText, Globe, Shield, Save, ChevronRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useTheme } from '../../context/ThemeContext';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Settings.module.css';

const SECTIONS = [
  { id: 'store', label: 'Store Info', icon: Store },
  { id: 'invoice', label: 'Invoice', icon: FileText },
  { id: 'language', label: 'Language & Region', icon: Globe },
  { id: 'security', label: 'Security', icon: Shield },
];

const Settings = () => {
  const [active, setActive] = useState('store');
  const { theme, toggleTheme, isDark } = useTheme();

  const save = () => toast.success('Settings saved!');

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.sub}>Configure your pharmacy management system</p>
      </motion.div>

      <motion.div className={styles.layout} variants={staggerItem}>
        {/* Sidebar */}
        <div className={styles.sideNav}>
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`${styles.navItem} ${active === id ? styles.navActive : ''}`} onClick={() => setActive(id)}>
              <Icon size={17} />{label}
              {active === id && <ChevronRight size={14} className={styles.chevron} />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {active === 'store' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Store Information</h3>
              <div className={styles.formGrid}>
                <Input label="Pharmacy Name" defaultValue="PharmaFlow Pharmacy" />
                <Input label="GST Number" defaultValue="27AABCS1681G1ZB" />
                <Input label="Phone" defaultValue="+91 98765 43210" />
                <Input label="Email" defaultValue="contact@pharmaflow.com" />
                <Input label="Address" defaultValue="123 MG Road, Pune" />
                <Input label="City" defaultValue="Pune" />
              </div>
              <div className={styles.themeToggle}>
                <div>
                  <p className={styles.toggleLabel}>App Theme</p>
                  <p className={styles.toggleSub}>{isDark ? 'Dark Mode' : 'Light Mode'} is active</p>
                </div>
                <button className={`${styles.toggle} ${isDark ? styles.toggleOn : ''}`} onClick={toggleTheme}>
                  <div className={styles.toggleThumb} />
                </button>
              </div>
              <Button icon={Save} onClick={save}>Save Changes</Button>
            </div>
          )}
          {active === 'invoice' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Invoice Settings</h3>
              <div className={styles.formGrid}>
                <Input label="Invoice Prefix" defaultValue="PF" />
                <Input label="Currency Symbol" defaultValue="₹" />
                <Input label="Footer Text" defaultValue="Thank you for your business!" />
              </div>
              <Button icon={Save} onClick={save}>Save Changes</Button>
            </div>
          )}
          {active === 'language' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Language & Region</h3>
              <div className={styles.formGrid}>
                <div>
                  <label className={styles.fieldLabel}>Language</label>
                  <select className={styles.select}><option>English</option><option>Hindi</option><option>Marathi</option></select>
                </div>
                <div>
                  <label className={styles.fieldLabel}>Date Format</label>
                  <select className={styles.select}><option>DD MMM YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select>
                </div>
              </div>
              <Button icon={Save} onClick={save}>Save Changes</Button>
            </div>
          )}
          {active === 'security' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Security</h3>
              <div className={styles.formGrid}>
                <Input label="Current Password" type="password" placeholder="Enter current password" />
                <Input label="New Password" type="password" placeholder="Enter new password" />
                <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
              </div>
              <Button variant="danger" icon={Save} onClick={save}>Update Password</Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
