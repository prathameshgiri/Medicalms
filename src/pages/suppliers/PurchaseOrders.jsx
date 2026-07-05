import { motion } from 'framer-motion';
import { Plus, Eye, CheckCircle, Clock, Truck } from 'lucide-react';
import { purchaseOrders } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './PurchaseOrders.module.css';

const statusConfig = {
  delivered: { variant: 'success', icon: CheckCircle, label: 'Delivered' },
  pending: { variant: 'warning', icon: Clock, label: 'Pending' },
  transit: { variant: 'primary', icon: Truck, label: 'In Transit' },
};

const PurchaseOrders = () => (
  <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
    <motion.div className={styles.header} variants={staggerItem}>
      <div><h1 className={styles.title}>Purchase Orders</h1><p className={styles.sub}>{purchaseOrders.length} orders</p></div>
      <Button icon={Plus}>Create Order</Button>
    </motion.div>
    <motion.div className={styles.grid} variants={staggerContainer}>
      {purchaseOrders.map(po => {
        const { variant, icon: Icon, label } = statusConfig[po.status];
        return (
          <motion.div key={po.id} className={styles.card} variants={staggerItem} whileHover={{ y: -4 }}>
            <div className={styles.cardHead}>
              <div>
                <p className={styles.poNo}>{po.poNo}</p>
                <p className={styles.supplier}>{po.supplier}</p>
              </div>
              <Badge variant={variant} dot>{label}</Badge>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.info}><span>Order Date</span><strong>{formatDate(po.date)}</strong></div>
              <div className={styles.info}><span>Expected</span><strong>{formatDate(po.expectedDelivery)}</strong></div>
              <div className={styles.info}><span>Items</span><strong>{po.items} medicines</strong></div>
              <div className={styles.info}><span>Total</span><strong className={styles.amount}>{formatCurrency(po.total)}</strong></div>
            </div>
            <div className={styles.cardFooter}>
              <Button variant="ghost" size="sm" icon={Eye}>View Details</Button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  </motion.div>
);

export default PurchaseOrders;
