import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Calendar, DollarSign } from 'lucide-react';
import { employees as initEmployees } from '../../data/mockData';
import { formatDate, formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Employees.module.css';

const Employees = () => (
  <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
    <motion.div className={styles.header} variants={staggerItem}>
      <div><h1 className={styles.title}>Employees</h1><p className={styles.sub}>{initEmployees.length} staff members</p></div>
      <Button icon={Plus}>Add Employee</Button>
    </motion.div>

    <motion.div className={styles.grid} variants={staggerContainer}>
      {initEmployees.map(emp => (
        <motion.div key={emp.id} className={styles.card} variants={staggerItem} whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}>
          <div className={styles.cardTop}>
            <div className={styles.avatar}>{emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
            <div className={styles.info}>
              <h3 className={styles.name}>{emp.name}</h3>
              <Badge variant={emp.status === 'active' ? 'success' : 'warning'} size="sm" dot>
                {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
              </Badge>
            </div>
            <div className={styles.actions}>
              <button className={styles.btn}><Edit size={14} /></button>
              <button className={`${styles.btn} ${styles.del}`}><Trash2 size={14} /></button>
            </div>
          </div>
          <div className={styles.role}>{emp.role}</div>
          <div className={styles.details}>
            <div className={styles.detail}><span>Shift</span><strong>{emp.shift}</strong></div>
            <div className={styles.detail}><span>Joined</span><strong>{formatDate(emp.joinDate)}</strong></div>
            <div className={styles.detail}><span>Salary</span><strong className={styles.salary}>{formatCurrency(emp.salary)}</strong></div>
            <div className={styles.detail}><span>Attendance</span>
              <div className={styles.attendance}>
                <div className={styles.attendBar}><div className={styles.attendFill} style={{ width: `${emp.attendance}%` }} /></div>
                <strong>{emp.attendance}%</strong>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

export default Employees;
