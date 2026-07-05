import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, pageSize }) => {
  const pages = [];
  const maxVisible = 5;

  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.wrapper}>
      <span className={styles.info}>
        Showing <strong>{from}–{to}</strong> of <strong>{totalItems}</strong> results
      </span>
      <div className={styles.controls}>
        <motion.button
          className={styles.btn}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronsLeft size={14} />
        </motion.button>
        <motion.button
          className={styles.btn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={14} />
        </motion.button>
        {pages.map(p => (
          <motion.button
            key={p}
            className={`${styles.btn} ${p === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(p)}
            whileTap={{ scale: 0.9 }}
          >
            {p}
          </motion.button>
        ))}
        <motion.button
          className={styles.btn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={14} />
        </motion.button>
        <motion.button
          className={styles.btn}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronsRight size={14} />
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;
