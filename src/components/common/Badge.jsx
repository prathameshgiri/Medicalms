import styles from './Badge.module.css';

/**
 * Reusable badge/pill component
 */
const Badge = ({ children, variant = 'primary', size = 'md', dot = false }) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
};

export default Badge;
