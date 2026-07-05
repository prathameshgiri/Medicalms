import { motion } from 'framer-motion';
import { Download, Printer, BarChart2, Package, ShoppingBag, Truck, Users, Clock, FileText } from 'lucide-react';
import Button from '../../components/common/Button';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Reports.module.css';

const REPORTS = [
  { title: 'Inventory Report', desc: 'Complete stock status, categories, valuations', icon: Package, color: 'primary' },
  { title: 'Sales Report', desc: 'Daily, weekly, monthly sales performance', icon: BarChart2, color: 'success' },
  { title: 'Purchase Report', desc: 'All purchase orders and supplier invoices', icon: ShoppingBag, color: 'purple' },
  { title: 'Supplier Report', desc: 'Supplier performance and payment status', icon: Truck, color: 'teal' },
  { title: 'Customer Report', desc: 'Customer purchase history and analytics', icon: Users, color: 'warning' },
  { title: 'Expiry Report', desc: 'Medicines by expiry status and batches', icon: Clock, color: 'danger' },
  { title: 'GST Report', desc: 'GST collected by category and period', icon: FileText, color: 'primary' },
];

const Reports = () => (
  <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
    <motion.div variants={staggerItem}>
      <h1 className={styles.title}>Reports Center</h1>
      <p className={styles.sub}>Generate and download comprehensive reports</p>
    </motion.div>

    <motion.div className={styles.grid} variants={staggerContainer}>
      {REPORTS.map(({ title, desc, icon: Icon, color }) => (
        <motion.div key={title} className={styles.card} variants={staggerItem} whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}>
          <div className={styles.cardIcon} style={{ background: `var(--gradient-${color})` }}>
            <Icon size={24} color="white" />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{desc}</p>
          </div>
          <div className={styles.actions}>
            <Button variant="outline" size="sm" icon={Printer}>Print</Button>
            <Button size="sm" icon={Download}>Export</Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default Reports;
