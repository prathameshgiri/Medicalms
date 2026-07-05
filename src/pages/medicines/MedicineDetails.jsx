import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit, Trash2, ArrowLeft, Package, Calendar, Tag, Building, Hash, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import { QRCodeSVG } from 'qrcode.react';
import { medicines } from '../../data/mockData';
import { formatCurrency, formatDate, getExpiryStatus, getStockStatus } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './MedicineDetails.module.css';

const MedicineDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const med = medicines.find(m => m.id === Number(id));

  if (!med) return (
    <div style={{ textAlign: 'center', padding: 60 }}>
      <div style={{ fontSize: '4rem', marginBottom: 16 }}>💊</div>
      <h2>Medicine not found</h2>
      <Button onClick={() => navigate('/medicines')} icon={ArrowLeft} style={{ marginTop: 16 }}>Go Back</Button>
    </div>
  );

  const { color: expiryColor, label: expiryLabel } = getExpiryStatus(med.expiryDate);
  const { label: stockLabel } = getStockStatus(med.quantity, med.minQuantity);

  const details = [
    { label: 'Generic Name', value: med.genericName, icon: Tag },
    { label: 'Category', value: med.category, icon: Tag },
    { label: 'Manufacturer', value: med.manufacturer, icon: Building },
    { label: 'Batch Number', value: med.batchNo, icon: Hash },
    { label: 'Manufacturing Date', value: formatDate(med.mfgDate), icon: Calendar },
    { label: 'Expiry Date', value: formatDate(med.expiryDate), icon: Calendar },
    { label: 'GST', value: `${med.gst}%`, icon: ShieldCheck },
  ];

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      {/* Header */}
      <motion.div className={styles.header} variants={staggerItem}>
        <button className={styles.back} onClick={() => navigate('/medicines')}>
          <ArrowLeft size={16} /> Back to Inventory
        </button>
        <div className={styles.headerActions}>
          <Button variant="secondary" icon={Edit} onClick={() => navigate('/medicines/add')}>Edit</Button>
          <Button variant="danger" icon={Trash2} onClick={() => { toast.success('Deleted'); navigate('/medicines'); }}>Delete</Button>
        </div>
      </motion.div>

      <div className={styles.grid}>
        {/* Left */}
        <motion.div className={styles.leftCol} variants={staggerItem}>
          {/* Medicine Card */}
          <div className={styles.medicineCard}>
            <div className={styles.medicineAvatar}>
              {med.name.charAt(0)}
            </div>
            <h2 className={styles.medicineName}>{med.name}</h2>
            <p className={styles.medicineBrand}>{med.brand} · {med.manufacturer}</p>
            <div className={styles.statusRow}>
              <Badge variant={expiryColor === 'danger' ? 'danger' : expiryColor === 'warning' ? 'warning' : 'success'} dot>
                {expiryLabel}
              </Badge>
              <Badge variant={med.quantity === 0 ? 'danger' : med.quantity <= med.minQuantity ? 'warning' : 'success'} dot>
                {stockLabel}
              </Badge>
            </div>
          </div>

          {/* QR Code */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>QR Code</h3>
            <div className={styles.qrWrapper}>
              <QRCodeSVG value={`PHARMAFLOW:${med.id}:${med.name}:${med.batchNo}`} size={140} level="H" />
            </div>
            <p className={styles.barcodeText}>{med.barcode}</p>
          </div>

          {/* Pricing */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Pricing</h3>
            <div className={styles.priceGrid}>
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Purchase Price</p>
                <p className={styles.priceVal}>{formatCurrency(med.purchasePrice)}</p>
              </div>
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>Selling Price</p>
                <p className={`${styles.priceVal} ${styles.primaryPrice}`}>{formatCurrency(med.sellingPrice)}</p>
              </div>
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>MRP</p>
                <p className={styles.priceVal}>{formatCurrency(med.mrp)}</p>
              </div>
              <div className={styles.priceItem}>
                <p className={styles.priceLabel}>GST</p>
                <p className={styles.priceVal}>{med.gst}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div className={styles.rightCol} variants={staggerItem}>
          {/* Description */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>About</h3>
            <p className={styles.description}>{med.description || 'No description available.'}</p>
          </div>

          {/* Details */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Details</h3>
            <div className={styles.detailsList}>
              {details.map(({ label, value, icon: Icon }) => (
                <div key={label} className={styles.detailRow}>
                  <div className={styles.detailLeft}>
                    <Icon size={14} />
                    <span className={styles.detailLabel}>{label}</span>
                  </div>
                  <span className={styles.detailValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Info */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Stock Information</h3>
            <div className={styles.stockWidget}>
              <div className={styles.stockCircle}>
                <span className={styles.stockNum}>{med.quantity}</span>
                <span className={styles.stockUnit}>units</span>
              </div>
              <div className={styles.stockDetails}>
                <div className={styles.stockRow}>
                  <span className={styles.stockLabel}>Current Stock</span>
                  <span className={styles.stockBold}>{med.quantity} units</span>
                </div>
                <div className={styles.stockRow}>
                  <span className={styles.stockLabel}>Minimum Level</span>
                  <span className={styles.stockBold}>{med.minQuantity} units</span>
                </div>
                <div className={styles.stockProgress}>
                  <div className={styles.stockBar}>
                    <motion.div
                      className={styles.stockFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (med.quantity / (med.minQuantity * 10)) * 100)}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{
                        background: med.quantity === 0 ? 'var(--gradient-danger)' :
                          med.quantity <= med.minQuantity ? 'var(--gradient-warning)' :
                          'var(--gradient-success)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MedicineDetails;
