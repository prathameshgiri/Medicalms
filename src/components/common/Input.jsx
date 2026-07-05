import { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import styles from './Input.module.css';

/**
 * Reusable input component with label, error, icon, and password toggle
 */
const Input = forwardRef(({
  label,
  error,
  hint,
  icon: Icon,
  iconPosition = 'left',
  type = 'text',
  placeholder,
  className = '',
  required,
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={`${styles.inputWrap} ${error ? styles.hasError : ''}`}>
        {Icon && iconPosition === 'left' && (
          <span className={styles.iconLeft}><Icon size={16} /></span>
        )}
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          className={`${styles.input} ${Icon && iconPosition === 'left' ? styles.hasIconLeft : ''} ${isPassword || (Icon && iconPosition === 'right') ? styles.hasIconRight : ''}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.iconRight}
            onClick={() => setShowPassword(p => !p)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {Icon && !isPassword && iconPosition === 'right' && (
          <span className={styles.iconRight}><Icon size={16} /></span>
        )}
      </div>
      {error && (
        <p className={styles.error}>
          <AlertCircle size={12} />
          {error}
        </p>
      )}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
