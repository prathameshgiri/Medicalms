import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { notifications as initNotifs } from '../../data/mockData';
import { timeAgo } from '../../utils/helpers';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Notifications.module.css';

const typeVariants = { warning: 'warning', danger: 'danger', success: 'success', info: 'primary' };

const Notifications = () => {
  const [notifs, setNotifs] = useState(initNotifs);

  const markRead = (id) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs(p => p.map(n => ({ ...n, read: true })));
  const unread = notifs.filter(n => !n.read).length;

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div className={styles.header} variants={staggerItem}>
        <div>
          <h1 className={styles.title}>Notifications</h1>
          <p className={styles.sub}>{unread} unread notifications</p>
        </div>
        {unread > 0 && <Button variant="secondary" icon={Check} size="sm" onClick={markAllRead}>Mark all read</Button>}
      </motion.div>

      <motion.div className={styles.list} variants={staggerContainer}>
        {notifs.map((n, i) => (
          <motion.div
            key={n.id}
            className={`${styles.notif} ${!n.read ? styles.unread : ''}`}
            variants={staggerItem}
            onClick={() => markRead(n.id)}
            whileHover={{ x: 4 }}
          >
            <div className={`${styles.dot} ${styles[`dot_${n.type}`]}`} />
            <div className={styles.content}>
              <div className={styles.top}>
                <p className={styles.notifTitle}>{n.title}</p>
                <Badge variant={typeVariants[n.type]} size="sm">{n.type}</Badge>
              </div>
              <p className={styles.msg}>{n.message}</p>
              <p className={styles.time}>{timeAgo(n.time)}</p>
            </div>
            {!n.read && <div className={styles.unreadDot} />}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Notifications;
