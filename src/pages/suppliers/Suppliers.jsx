import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Phone, Mail, MapPin, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { suppliers as initSuppliers } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Suppliers.module.css';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(initSuppliers);
  const [selected, setSelected] = useState(null);

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div className={styles.header} variants={staggerItem}>
        <div>
          <h1 className={styles.title}>Suppliers</h1>
          <p className={styles.sub}>{suppliers.length} suppliers registered</p>
        </div>
        <Button icon={Plus}>Add Supplier</Button>
      </motion.div>

      <motion.div className={styles.grid} variants={staggerContainer}>
        {suppliers.map((s) => (
          <motion.div key={s.id} className={styles.card} variants={staggerItem} whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}>
            <div className={styles.cardTop}>
              <div className={styles.avatar}>{s.name[0]}</div>
              <div className={styles.info}>
                <h3 className={styles.name}>{s.name}</h3>
                <p className={styles.contact}>Contact: {s.contact}</p>
              </div>
              <div className={styles.rating}><Star size={12} fill="currentColor" />{s.rating}</div>
            </div>
            <div className={styles.row}><Phone size={13} />{s.phone}</div>
            <div className={styles.row}><Mail size={13} />{s.email}</div>
            <div className={styles.row}><MapPin size={13} />{s.address}</div>
            <div className={styles.gst}>GST: <span>{s.gstNo}</span></div>
            <div className={styles.cardFooter}>
              <div className={styles.stat}><strong>{s.totalOrders}</strong><span>Orders</span></div>
              <div className={styles.stat}>
                <strong style={{ color: s.pendingPayment > 0 ? 'var(--danger)' : 'var(--success)' }}>
                  {formatCurrency(s.pendingPayment)}
                </strong>
                <span>Pending</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.btn} onClick={() => setSelected(s)}><Eye size={14} /></button>
                <button className={styles.btn}><Edit size={14} /></button>
                <button className={`${styles.btn} ${styles.del}`} onClick={() => { setSuppliers(p => p.filter(x => x.id !== s.id)); toast.success('Supplier removed'); }}><Trash2 size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Supplier Details">
        {selected && (
          <div>
            <div className={styles.modalTop}>
              <div className={styles.modalAvatar}>{selected.name[0]}</div>
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.contact}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              <p><Phone size={13} /> {selected.phone}</p>
              <p><Mail size={13} /> {selected.email}</p>
              <p><MapPin size={13} /> {selected.address}</p>
              <p>GST No: <strong>{selected.gstNo}</strong></p>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Suppliers;
