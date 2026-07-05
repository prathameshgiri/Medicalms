import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalVariants, overlayVariants } from '../../animations/variants';
import styles from './Modal.module.css';

/**
 * Animated modal dialog
 */
const Modal = ({ isOpen, onClose, title, children, size = 'md', hideClose = false }) => {
  const sizeMap = { sm: 480, md: 600, lg: 800, xl: 1000 };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.portalWrapper}>
          <motion.div
            className={styles.overlay}
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
          />
          <div className={styles.container}>
            <motion.div
              className={styles.modal}
              style={{ maxWidth: sizeMap[size] }}
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {(title || !hideClose) && (
                <div className={styles.header}>
                  {title && <h3 className={styles.title}>{title}</h3>}
                  {!hideClose && (
                    <motion.button
                      className={styles.closeBtn}
                      onClick={onClose}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={18} />
                    </motion.button>
                  )}
                </div>
              )}
              <div className={styles.body}>{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
