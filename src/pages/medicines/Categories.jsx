import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Tag, Search } from 'lucide-react';
import { categories as initCats } from '../../data/mockData';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Badge from '../../components/common/Badge';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Categories.module.css';

const COLORS = ['#2196F3','#43A047','#FB8C00','#E53935','#8E24AA','#00897B','#F06292','#7986CB'];

const Categories = () => {
  const [cats, setCats] = useState(initCats);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', color: COLORS[0] });

  const filtered = cats.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditItem(null); setForm({ name: '', description: '', color: COLORS[0] }); setModalOpen(true); };
  const openEdit = (c) => { setEditItem(c); setForm({ name: c.name, description: c.description, color: c.color }); setModalOpen(true); };

  const handleSave = () => {
    if (!form.name) { toast.error('Category name required'); return; }
    if (editItem) {
      setCats(p => p.map(c => c.id === editItem.id ? { ...c, ...form } : c));
      toast.success('Category updated');
    } else {
      setCats(p => [...p, { id: Date.now(), ...form, count: 0 }]);
      toast.success('Category created');
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setCats(p => p.filter(c => c.id !== id));
    toast.success('Category deleted');
  };

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div className={styles.header} variants={staggerItem}>
        <div>
          <h1 className={styles.title}>Medicine Categories</h1>
          <p className={styles.sub}>{cats.length} categories</p>
        </div>
        <Button icon={Plus} onClick={openAdd}>Add Category</Button>
      </motion.div>

      <motion.div className={styles.searchWrap} variants={staggerItem}>
        <Search size={16} className={styles.searchIcon} />
        <input className={styles.searchInput} placeholder="Search categories..." value={search} onChange={e => setSearch(e.target.value)} />
      </motion.div>

      <motion.div className={styles.grid} variants={staggerContainer}>
        {filtered.map((cat, i) => (
          <motion.div
            key={cat.id}
            className={styles.catCard}
            variants={staggerItem}
            whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.12)' }}
          >
            <div className={styles.catIcon} style={{ background: `${cat.color}15`, color: cat.color }}>
              <Tag size={26} />
            </div>
            <div className={styles.catBody}>
              <h3 className={styles.catName}>{cat.name}</h3>
              <p className={styles.catDesc}>{cat.description}</p>
              <Badge variant="primary" size="sm">{cat.count} medicines</Badge>
            </div>
            <div className={styles.catAccent} style={{ background: cat.color }} />
            <div className={styles.catActions}>
              <button className={styles.catBtn} onClick={() => openEdit(cat)} title="Edit">
                <Edit size={14} />
              </button>
              <button className={`${styles.catBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(cat.id)} title="Delete">
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Category' : 'Add Category'} size="sm">
        <div className={styles.form}>
          <div>
            <label className={styles.label}>Category Name *</label>
            <input className={styles.input} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Antibiotic" />
          </div>
          <div>
            <label className={styles.label}>Description</label>
            <textarea className={styles.textarea} rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief description..." />
          </div>
          <div>
            <label className={styles.label}>Color</label>
            <div className={styles.colorPicker}>
              {COLORS.map(c => (
                <button key={c} className={`${styles.colorDot} ${form.color === c ? styles.colorSelected : ''}`}
                  style={{ background: c }} onClick={() => setForm(p => ({ ...p, color: c }))} type="button" />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="secondary" fullWidth onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button fullWidth onClick={handleSave} icon={Plus}>{editItem ? 'Update' : 'Create'}</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Categories;
