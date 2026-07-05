import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  Plus, Search, Filter, Download, Trash2, Edit,
  Eye, ChevronUp, ChevronDown, Package, RefreshCw
} from 'lucide-react';
import { medicines as initialMeds } from '../../data/mockData';
import { formatCurrency, formatDate, getExpiryStatus, getStockStatus } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/common/Modal';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Medicines.module.css';

const PAGE_SIZE = 6;

const Medicines = () => {
  const navigate = useNavigate();
  const [meds, setMeds] = useState(initialMeds);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const filtered = meds
    .filter(m =>
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
       m.brand.toLowerCase().includes(search.toLowerCase()) ||
       m.batchNo.toLowerCase().includes(search.toLowerCase())) &&
      (!categoryFilter || m.category === categoryFilter) &&
      (!statusFilter || m.status === statusFilter)
    )
    .sort((a, b) => {
      let va = a[sortField], vb = b[sortField];
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const categories = [...new Set(meds.map(m => m.category))];

  const confirmDelete = () => {
    setMeds(prev => prev.filter(m => m.id !== deleteId));
    toast.success('Medicine deleted');
    setDeleteId(null);
  };

  const SortIcon = ({ field }) => (
    <span className={styles.sortIcon}>
      {sortField === field
        ? sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
        : <ChevronUp size={13} style={{ opacity: 0.3 }} />}
    </span>
  );

  const getStockBadge = (m) => {
    if (m.quantity === 0) return <Badge variant="danger" dot>Out of Stock</Badge>;
    if (m.quantity <= m.minQuantity) return <Badge variant="warning" dot>Low Stock</Badge>;
    return <Badge variant="success" dot>In Stock</Badge>;
  };

  const getExpiryBadge = (date) => {
    const { color, label } = getExpiryStatus(date);
    const variantMap = { danger: 'danger', warning: 'warning', success: 'success', primary: 'primary', gray: 'neutral' };
    return <Badge variant={variantMap[color] || 'neutral'}>{label}</Badge>;
  };

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      {/* Header */}
      <motion.div className={styles.header} variants={staggerItem}>
        <div>
          <h1 className={styles.title}>Medicine Inventory</h1>
          <p className={styles.sub}>{filtered.length} medicines found</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary" icon={Download} size="sm">Export</Button>
          <Button icon={Plus} size="sm" onClick={() => navigate('/medicines/add')}>Add Medicine</Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div className={styles.filters} variants={staggerItem}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search by name, brand, batch..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select className={styles.select} value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className={styles.select} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        <button className={styles.resetBtn} onClick={() => { setSearch(''); setCategoryFilter(''); setStatusFilter(''); }}>
          <RefreshCw size={14} /> Reset
        </button>
      </motion.div>

      {/* Table */}
      <motion.div className={styles.tableCard} variants={staggerItem}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th} onClick={() => handleSort('name')}>
                  Medicine <SortIcon field="name" />
                </th>
                <th className={styles.th} onClick={() => handleSort('category')}>
                  Category <SortIcon field="category" />
                </th>
                <th className={styles.th}>Batch</th>
                <th className={styles.th} onClick={() => handleSort('expiryDate')}>
                  Expiry <SortIcon field="expiryDate" />
                </th>
                <th className={styles.th} onClick={() => handleSort('quantity')}>
                  Stock <SortIcon field="quantity" />
                </th>
                <th className={styles.th} onClick={() => handleSort('sellingPrice')}>
                  Price <SortIcon field="sellingPrice" />
                </th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className={styles.emptyCell}>
                    <div className={styles.emptyState}>
                      <Package size={40} style={{ color: 'var(--gray-300)' }} />
                      <p>No medicines found</p>
                    </div>
                  </td>
                </tr>
              ) : paginated.map((m, i) => (
                <motion.tr
                  key={m.id}
                  className={styles.tr}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <td className={styles.td}>
                    <div className={styles.medInfo}>
                      <div className={styles.medAvatar}>{m.name[0]}</div>
                      <div>
                        <p className={styles.medName}>{m.name}</p>
                        <p className={styles.medBrand}>{m.brand} · {m.manufacturer}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}><Badge variant="primary" size="sm">{m.category}</Badge></td>
                  <td className={styles.td}><span className={styles.mono}>{m.batchNo}</span></td>
                  <td className={styles.td}>{getExpiryBadge(m.expiryDate)}</td>
                  <td className={styles.td}>
                    <div className={styles.stockInfo}>
                      <span className={styles.stockNum}>{m.quantity}</span>
                      <div className={styles.stockBar}>
                        <div
                          className={styles.stockFill}
                          style={{
                            width: `${Math.min(100, (m.quantity / (m.minQuantity * 10)) * 100)}%`,
                            background: m.quantity === 0 ? 'var(--danger)' : m.quantity <= m.minQuantity ? 'var(--warning)' : 'var(--success)'
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}><span className={styles.price}>{formatCurrency(m.sellingPrice)}</span></td>
                  <td className={styles.td}>{getStockBadge(m)}</td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <motion.button className={styles.actionBtn} title="View"
                        onClick={() => navigate(`/medicines/${m.id}`)}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Eye size={15} />
                      </motion.button>
                      <motion.button className={styles.actionBtn} title="Edit"
                        onClick={() => navigate('/medicines/add')}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Edit size={15} />
                      </motion.button>
                      <motion.button className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete"
                        onClick={() => setDeleteId(m.id)}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Trash2 size={15} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.tableFooter}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
          />
        </div>
      </motion.div>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Medicine" size="sm">
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🗑️</div>
          <p style={{ color: 'var(--gray-600)', marginBottom: 20 }}>
            Are you sure you want to delete this medicine? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete} icon={Trash2}>Delete</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Medicines;
