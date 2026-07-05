import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FileText, CheckCircle, XCircle, Clock, Eye, Upload, Download } from 'lucide-react';
import { prescriptions as initRx } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Prescriptions.module.css';

const statusConfig = {
  approved: { variant: 'success', icon: CheckCircle },
  pending: { variant: 'warning', icon: Clock },
  rejected: { variant: 'danger', icon: XCircle },
};

const Prescriptions = () => {
  const [rxList, setRxList] = useState(initRx);

  const handleApprove = (id) => {
    setRxList(p => p.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    toast.success('Prescription approved');
  };

  const handleReject = (id) => {
    setRxList(p => p.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    toast.error('Prescription rejected');
  };

  const counts = { total: rxList.length, pending: rxList.filter(r => r.status === 'pending').length, approved: rxList.filter(r => r.status === 'approved').length, rejected: rxList.filter(r => r.status === 'rejected').length };

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div className={styles.header} variants={staggerItem}>
        <div><h1 className={styles.title}>Prescriptions</h1><p className={styles.sub}>Manage patient prescriptions</p></div>
        <Button icon={Upload}>Upload Prescription</Button>
      </motion.div>

      <motion.div className={styles.statsRow} variants={staggerItem}>
        {[['Total', counts.total, 'primary'], ['Pending', counts.pending, 'warning'], ['Approved', counts.approved, 'success'], ['Rejected', counts.rejected, 'danger']].map(([label, val, color]) => (
          <div key={label} className={styles.statCard} style={{ borderColor: `var(--${color})` }}>
            <span className={styles.statVal} style={{ color: `var(--${color})` }}>{val}</span>
            <span className={styles.statLabel}>{label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div className={styles.grid} variants={staggerContainer}>
        {rxList.map(rx => {
          const { variant, icon: Icon } = statusConfig[rx.status];
          return (
            <motion.div key={rx.id} className={styles.card} variants={staggerItem} whileHover={{ y: -4 }}>
              <div className={styles.cardTop}>
                <div className={styles.rxIcon}><FileText size={20} /></div>
                <div className={styles.rxInfo}>
                  <p className={styles.rxNo}>{rx.prescriptionNo}</p>
                  <p className={styles.rxPatient}>{rx.patientName}</p>
                </div>
                <Badge variant={variant} dot><Icon size={11} /> {rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}</Badge>
              </div>
              <div className={styles.doctorRow}>
                <p><strong>{rx.doctorName}</strong></p>
                <p className={styles.hospital}>{rx.hospital}</p>
              </div>
              <div className={styles.meds}>
                {rx.medicines.map(m => <span key={m} className={styles.medTag}>{m}</span>)}
              </div>
              <div className={styles.dateRow}>Date: {formatDate(rx.date)}</div>
              {rx.status === 'pending' && (
                <div className={styles.actions}>
                  <Button variant="success" size="sm" icon={CheckCircle} onClick={() => handleApprove(rx.id)}>Approve</Button>
                  <Button variant="danger" size="sm" icon={XCircle} onClick={() => handleReject(rx.id)}>Reject</Button>
                  <Button variant="secondary" size="sm" icon={Eye}>View</Button>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Prescriptions;
