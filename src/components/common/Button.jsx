import { motion } from 'framer-motion';
import styles from './Button.module.css';

/**
 * Reusable animated button component
 * @param {string} variant - primary | secondary | success | danger | warning | outline | ghost
 * @param {string} size - sm | md | lg
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) => {
  return (
    <motion.button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.full : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...rest}
    >
      {loading ? (
        <span className={styles.spinner} />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
          {children && <span>{children}</span>}
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
        </>
      )}
    </motion.button>
  );
};

export default Button;
