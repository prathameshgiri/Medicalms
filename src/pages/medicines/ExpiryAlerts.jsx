import { motion } from 'framer-motion';
import { AlertTriangle, AlertOctagon, Clock } from 'lucide-react';
import { medicines } from '../../data/mockData';
import { formatDate, daysUntilExpiry } from '../../utils/helpers';
import Badge from '../../components/common/Badge';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './ExpiryAlerts.module.css';

const ExpiryAlerts = () => {
  const expired = medicines.filter(m => daysUntilExpiry(m.expiryDate) < 0);
  const critical = medicines.filter(m => { const d = daysUntilExpiry(m.expiryDate); return d >= 0 && d <= 15; });
  const warning = medicines.filter(m => { const d = daysUntilExpiry(m.expiryDate); return d > 15 && d <= 30; });

  const groups = [
    { title: 'Expired', icon: AlertOctagon, items: expired, color: 'danger', bg: 'var(--danger-soft)' },
    { title: 'Expiring in 15 Days', icon: AlertTriangle, items: critical, color: 'danger', bg: '#fff3f3' },
    { title: 'Expiring in 30 Days', icon: Clock, items: warning, color: 'warning', bg: 'var(--warning-soft)' },
  ];

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem}>
        <h1 className={styles.title}>Expiry Alerts</h1>
        <p className={styles.sub}>Monitor medicine expiry dates</p>
      </motion.div>

      <div className={styles.statsRow}>
        <div className={styles.statCard} style={{ background: 'var(--danger-soft)', borderColor: 'var(--danger)' }}>
          <AlertOctagon size={24} color="var(--danger)" />
          <span className={styles.statNum} style={{ color: 'var(--danger)' }}>{expired.length}</span>
          <span className={styles.statLabel}>Expired</span>
        </div>
        <div className={styles.statCard} style={{ background: '#fff3f3', borderColor: 'var(--danger)' }}>
          <AlertTriangle size={24} color="var(--danger)" />
          <span className={styles.statNum} style={{ color: 'var(--danger)' }}>{critical.length}</span>
          <span className={styles.statLabel}>Critical (≤15 days)</span>
        </div>
        <div className={styles.statCard} style={{ background: 'var(--warning-soft)', borderColor: 'var(--warning)' }}>
          <Clock size={24} color="var(--warning)" />
          <span className={styles.statNum} style={{ color: 'var(--warning)' }}>{warning.length}</span>
          <span className={styles.statLabel}>Warning (≤30 days)</span>
        </div>
      </div>

      {groups.map(({ title, icon: Icon, items, color, bg }) => items.length > 0 && (
        <motion.div key={title} className={styles.section} variants={staggerItem}>
          <div className={styles.sectionTitle}>
            <Icon size={18} color={`var(--${color})`} />
            <span style={{ color: `var(--${color})` }}>{title}</span>
            <Badge variant={color}>{items.length}</Badge>
          </div>
          <div className={styles.alertGrid}>
            {items.map(m => {
              const days = daysUntilExpiry(m.expiryDate);
              return (
                <motion.div
                  key={m.id}
                  className={styles.alertCard}
                  style={{ background: bg, borderColor: `var(--${color})` }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={styles.medAvatar}>{m.name[0]}</div>
                  <div className={styles.medInfo}>
                    <p className={styles.medName}>{m.name}</p>
                    <p className={styles.medBrand}>{m.brand} · Batch: {m.batchNo}</p>
                    <p className={styles.medExpiry}>Expiry: {formatDate(m.expiryDate)}</p>
                  </div>
                  <div className={styles.daysLeft}>
                    <span className={styles.days} style={{ color: `var(--${color})` }}>{days < 0 ? Math.abs(days) : days}</span>
                    <span className={styles.daysLabel}>{days < 0 ? 'days ago' : 'days left'}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExpiryAlerts;
