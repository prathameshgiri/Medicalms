import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import styles from './NotFound.module.css';

const NotFound = () => (
  <div className={styles.page}>
    <motion.div
      className={styles.content}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.div
        className={styles.illustration}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        💊
      </motion.div>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Oops! Page Not Found</h2>
      <p className={styles.desc}>
        The page you're looking for seems to have been misplaced — just like a prescription in a messy drawer!
      </p>
      <div className={styles.actions}>
        <Link to="/dashboard">
          <Button icon={Home} size="lg">Go to Dashboard</Button>
        </Link>
        <Button variant="secondary" icon={ArrowLeft} size="lg" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>

      {/* Background decoration */}
      <div className={styles.decorCircle1} />
      <div className={styles.decorCircle2} />
    </motion.div>
  </div>
);

export default NotFound;
