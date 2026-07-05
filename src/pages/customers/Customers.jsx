import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';
import { customers as initCustomers } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Customers.module.css';

const PAGE_SIZE = 5;

const Customers = () => {
  const [customers, setCustomers] = useState(initCustomers);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div className={styles.header} variants={staggerItem}>
        <div>
          <h1 className={styles.title}>Customers</h1>
          <p className={styles.sub}>{customers.length} registered customers</p>
        </div>
        <Button icon={Plus}>Add Customer</Button>
      </motion.div>

      <motion.div className={styles.searchWrap} variants={staggerItem}>
        <Search size={16} className={styles.searchIcon} />
        <input className={styles.searchInput} placeholder="Search by name, phone, email..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
      </motion.div>

      <motion.div className={styles.grid} variants={staggerContainer}>
        {paginated.map((c, i) => (
          <motion.div
            key={c.id}
            className={styles.customerCard}
            variants={staggerItem}
            whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
          >
            <div className={styles.cardTop}>
              <div className={styles.avatar}>{c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
              <div className={styles.info}>
                <h3 className={styles.name}>{c.name}</h3>
                <p className={styles.age}>{c.age} yrs · {c.gender}</p>
              </div>
              <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={() => setSelected(c)}><Eye size={14} /></button>
                <button className={styles.actionBtn}><Edit size={14} /></button>
                <button className={`${styles.actionBtn} ${styles.danger}`} onClick={() => { setCustomers(p => p.filter(x => x.id !== c.id)); toast.success('Customer removed'); }}><Trash2 size={14} /></button>
              </div>
            </div>
            <div className={styles.contactRow}><Phone size={13} /> {c.phone}</div>
            <div className={styles.contactRow}><Mail size={13} /> {c.email}</div>
            <div className={styles.contactRow}><MapPin size={13} /> {c.address}</div>
            <div className={styles.cardFooter}>
              <div className={styles.stat}><span className={styles.statVal}>{c.totalOrders}</span><span className={styles.statLabel}>Orders</span></div>
              <div className={styles.stat}><span className={styles.statVal}>{formatCurrency(c.totalSpent)}</span><span className={styles.statLabel}>Total Spent</span></div>
              <div className={styles.stat}>
                {c.medicalHistory.length > 0
                  ? <Badge variant="warning" size="sm">{c.medicalHistory[0]}</Badge>
                  : <Badge variant="success" size="sm">Healthy</Badge>
                }
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Pagination currentPage={page} totalPages={Math.ceil(filtered.length / PAGE_SIZE)}
        onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Customer Details">
        {selected && (
          <div className={styles.modalContent}>
            <div className={styles.modalAvatar}>{selected.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
            <h2 className={styles.modalName}>{selected.name}</h2>
            <p>{selected.email} · {selected.phone}</p>
            <p>{selected.address}</p>
            <div className={styles.modalStats}>
              <div className={styles.modalStat}><strong>{selected.totalOrders}</strong><span>Orders</span></div>
              <div className={styles.modalStat}><strong>{formatCurrency(selected.totalSpent)}</strong><span>Spent</span></div>
              <div className={styles.modalStat}><strong>{formatDate(selected.lastVisit)}</strong><span>Last Visit</span></div>
            </div>
            {selected.medicalHistory.length > 0 && (
              <div className={styles.history}>
                <p className={styles.histLabel}>Medical History</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {selected.medicalHistory.map(h => <Badge key={h} variant="warning">{h}</Badge>)}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Customers;
