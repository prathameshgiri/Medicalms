import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Save, X, Upload, Pill, Tag, Building, Package, DollarSign, Calendar, FileText } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { categories } from '../../data/mockData';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './AddMedicine.module.css';

const GST_OPTIONS = [0, 5, 12, 18, 28];

const AddMedicine = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    toast.success('Medicine added successfully! 💊');
    navigate('/medicines');
  };

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div className={styles.header} variants={staggerItem}>
        <div>
          <h1 className={styles.title}>Add Medicine</h1>
          <p className={styles.sub}>Fill in the details to add a new medicine to inventory</p>
        </div>
        <Button variant="secondary" icon={X} onClick={() => navigate('/medicines')}>Cancel</Button>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.grid}>
          {/* Left — Main Form */}
          <motion.div className={styles.mainSection} variants={staggerItem}>
            {/* Basic Info */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Pill size={18} className={styles.cardIcon} />
                <h3>Basic Information</h3>
              </div>
              <div className={styles.formGrid}>
                <Input label="Medicine Name" placeholder="e.g. Paracetamol 500mg" required icon={Pill}
                  error={errors.name?.message}
                  {...register('name', { required: 'Medicine name is required' })} />
                <Input label="Generic Name" placeholder="e.g. Acetaminophen" icon={Pill}
                  {...register('genericName')} />
                <div>
                  <label className={styles.fieldLabel}>Category *</label>
                  <select className={styles.select} {...register('category', { required: true })}>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <Input label="Manufacturer" placeholder="e.g. GSK Pharma" icon={Building}
                  {...register('manufacturer')} />
                <Input label="Brand Name" placeholder="e.g. Calpol" icon={Tag}
                  {...register('brand')} />
                <Input label="Batch Number" placeholder="e.g. BT-2024-001" icon={Package}
                  {...register('batchNo')} />
              </div>
            </div>

            {/* Dates */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Calendar size={18} className={styles.cardIcon} />
                <h3>Dates</h3>
              </div>
              <div className={styles.formGrid}>
                <Input label="Manufacturing Date" type="date" icon={Calendar}
                  {...register('mfgDate')} />
                <Input label="Expiry Date" type="date" icon={Calendar} required
                  error={errors.expiryDate?.message}
                  {...register('expiryDate', { required: 'Expiry date is required' })} />
              </div>
            </div>

            {/* Pricing */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <DollarSign size={18} className={styles.cardIcon} />
                <h3>Pricing & Stock</h3>
              </div>
              <div className={styles.formGrid}>
                <Input label="Purchase Price (₹)" type="number" step="0.01" placeholder="0.00" icon={DollarSign}
                  {...register('purchasePrice', { min: 0 })} />
                <Input label="Selling Price (₹)" type="number" step="0.01" placeholder="0.00" icon={DollarSign}
                  {...register('sellingPrice', { min: 0 })} />
                <Input label="MRP (₹)" type="number" step="0.01" placeholder="0.00" icon={DollarSign}
                  {...register('mrp', { min: 0 })} />
                <div>
                  <label className={styles.fieldLabel}>GST (%)</label>
                  <select className={styles.select} {...register('gst')}>
                    {GST_OPTIONS.map(g => <option key={g} value={g}>{g}%</option>)}
                  </select>
                </div>
                <Input label="Quantity in Stock" type="number" placeholder="0" icon={Package}
                  {...register('quantity', { min: 0 })} />
                <Input label="Minimum Stock Level" type="number" placeholder="10" icon={Package}
                  {...register('minQuantity', { min: 0 })} />
              </div>
            </div>

            {/* Description */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <FileText size={18} className={styles.cardIcon} />
                <h3>Description</h3>
              </div>
              <textarea
                className={styles.textarea}
                placeholder="Enter medicine description, usage, side effects..."
                rows={4}
                {...register('description')}
              />
            </div>
          </motion.div>

          {/* Right — Upload */}
          <motion.div className={styles.sideSection} variants={staggerItem}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Upload size={18} className={styles.cardIcon} />
                <h3>Medicine Image</h3>
              </div>
              <div className={styles.uploadArea} onClick={() => document.getElementById('imgInput').click()}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                ) : (
                  <>
                    <div className={styles.uploadIcon}>📦</div>
                    <p className={styles.uploadText}>Click to upload</p>
                    <p className={styles.uploadSub}>PNG, JPG, WEBP (max 5MB)</p>
                  </>
                )}
                <input id="imgInput" type="file" accept="image/*" hidden onChange={handleImage} />
              </div>
              {imagePreview && (
                <button type="button" className={styles.removeImg} onClick={() => setImagePreview(null)}>
                  <X size={14} /> Remove
                </button>
              )}
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <Package size={18} className={styles.cardIcon} />
                <h3>Additional Info</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Input label="Barcode" placeholder="Enter barcode number" {...register('barcode')} />
                <div>
                  <label className={styles.fieldLabel}>Availability</label>
                  <select className={styles.select} {...register('status')}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" loading={loading} icon={Save}>
              {loading ? 'Saving...' : 'Save Medicine'}
            </Button>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};

export default AddMedicine;
