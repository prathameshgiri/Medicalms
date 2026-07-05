import { motion } from 'framer-motion';
import { AlertTriangle, ShoppingCart } from 'lucide-react';
import { medicines } from '../../data/mockData';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './LowStock.module.css';

const LowStock = () => {
  const lowStockItems = medicines.filter(m => m.quantity <= m.minQuantity);

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem}>
        <h1 className={styles.title}>Low Stock Management</h1>
        <p className={styles.sub}>{lowStockItems.length} medicines need restocking</p>
      </motion.div>

      <motion.div className={styles.tableCard} variants={staggerItem}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Min Required</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((m, i) => (
              <motion.tr key={m.id} className={styles.row}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <td>
                  <div className={styles.medInfo}>
                    <div className={styles.avatar}>{m.name[0]}</div>
                    <div>
                      <p className={styles.medName}>{m.name}</p>
                      <p className={styles.medBrand}>{m.brand}</p>
                    </div>
                  </div>
                </td>
                <td><Badge variant="primary" size="sm">{m.category}</Badge></td>
                <td>
                  <div className={styles.stockDisplay}>
                    <span className={styles.stockNum} style={{ color: m.quantity === 0 ? 'var(--danger)' : 'var(--warning)' }}>{m.quantity}</span>
                    <div className={styles.stockBar}>
                      <div className={styles.fill} style={{ width: `${Math.min(100, (m.quantity / m.minQuantity) * 100)}%`, background: m.quantity === 0 ? 'var(--gradient-danger)' : 'var(--gradient-warning)' }} />
                    </div>
                  </div>
                </td>
                <td><span className={styles.minQty}>{m.minQuantity}</span></td>
                <td>
                  {m.quantity === 0
                    ? <Badge variant="danger" dot>Out of Stock</Badge>
                    : <Badge variant="warning" dot>Low Stock</Badge>
                  }
                </td>
                <td><Button size="sm" icon={ShoppingCart}>Restock</Button></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default LowStock;
