import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { staggerItem } from '../../animations/variants';
import styles from './StatCard.module.css';

/**
 * Animated statistics card with trend indicator
 */
const StatCard = ({
  title,
  value,
  icon: Icon,
  color = 'primary',
  change,
  changeLabel = 'vs yesterday',
  prefix = '',
  suffix = '',
  loading = false,
}) => {
  const isPositive = change > 0;
  const isNeutral = change === 0 || change === undefined;

  const colorMap = {
    primary: { bg: 'var(--gradient-primary)', soft: 'var(--primary-soft)', text: 'var(--primary)' },
    success: { bg: 'var(--gradient-success)', soft: 'var(--success-soft)', text: 'var(--success)' },
    warning: { bg: 'var(--gradient-warning)', soft: 'var(--warning-soft)', text: 'var(--warning)' },
    danger: { bg: 'var(--gradient-danger)', soft: 'var(--danger-soft)', text: 'var(--danger)' },
    purple: { bg: 'var(--gradient-purple)', soft: 'var(--purple-soft)', text: 'var(--purple)' },
    teal: { bg: 'var(--gradient-teal)', soft: 'var(--teal-soft)', text: 'var(--teal)' },
  };

  const c = colorMap[color] || colorMap.primary;

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={`skeleton ${styles.skeletonIcon}`} />
        <div className={styles.body}>
          <div className={`skeleton ${styles.skeletonText}`} />
          <div className={`skeleton ${styles.skeletonValue}`} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.card}
      variants={staggerItem}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className={styles.iconWrap} style={{ background: c.bg }}>
        {Icon && <Icon size={22} color="white" />}
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <motion.p
          className={styles.value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
        </motion.p>
        {change !== undefined && (
          <div className={styles.change}>
            <span
              className={styles.badge}
              style={{
                background: isNeutral ? 'var(--gray-100)' : isPositive ? 'var(--success-soft)' : 'var(--danger-soft)',
                color: isNeutral ? 'var(--gray-500)' : isPositive ? 'var(--success)' : 'var(--danger)',
              }}
            >
              {isNeutral ? <Minus size={11} /> : isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {Math.abs(change)}%
            </span>
            <span className={styles.changeLabel}>{changeLabel}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
