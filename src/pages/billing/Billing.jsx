import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Search, Plus, Trash2, Printer, Download, Barcode, User, Phone, FileText, Percent, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { medicines, customers } from '../../data/mockData';
import { formatCurrency, generateInvoiceNo, calculateGST } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Billing.module.css';

const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash', icon: Wallet },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Card', icon: CreditCard },
];

const Billing = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [prescriptionNo, setPrescriptionNo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [invoiceNo] = useState(generateInvoiceNo());

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.length > 1) {
      setSearchResults(medicines.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) && m.quantity > 0).slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const addToCart = (med) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === med.id);
      if (existing) return prev.map(i => i.id === med.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...med, qty: 1 }];
    });
    setSearchQuery('');
    setSearchResults([]);
  };

  const updateQty = (id, qty) => {
    if (qty < 1) { setCart(p => p.filter(i => i.id !== id)); return; }
    setCart(p => p.map(i => i.id === id ? { ...i, qty } : i));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.sellingPrice * i.qty, 0);
  const gstTotal = cart.reduce((sum, i) => sum + (i.sellingPrice * i.qty * i.gst / 100), 0);
  const discountAmt = (subtotal * discount) / 100;
  const grandTotal = subtotal + gstTotal - discountAmt;

  const handleBill = () => {
    if (!cart.length) { toast.error('Add at least one medicine'); return; }
    toast.success(`Invoice ${invoiceNo} generated! 🎉`);
    setCart([]);
  };

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div className={styles.header} variants={staggerItem}>
        <div>
          <h1 className={styles.title}>Billing / POS</h1>
          <p className={styles.sub}>Invoice: <strong>{invoiceNo}</strong></p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary" icon={Printer} size="sm">Print</Button>
          <Button variant="secondary" icon={Download} size="sm">Export PDF</Button>
        </div>
      </motion.div>

      <div className={styles.posLayout}>
        {/* Left — Cart */}
        <motion.div className={styles.leftPanel} variants={staggerItem}>
          {/* Medicine Search */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Add Medicines</h3>
            <div className={styles.searchWrap}>
              <Search size={16} className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Search medicine by name or scan barcode..."
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
              />
              <Barcode size={16} className={styles.barcodeIcon} />
            </div>
            {searchResults.length > 0 && (
              <div className={styles.searchDropdown}>
                {searchResults.map(m => (
                  <div key={m.id} className={styles.searchItem} onClick={() => addToCart(m)}>
                    <div className={styles.searchAvatar}>{m.name[0]}</div>
                    <div className={styles.searchInfo}>
                      <p className={styles.searchName}>{m.name}</p>
                      <p className={styles.searchMeta}>{m.brand} · Stock: {m.quantity}</p>
                    </div>
                    <p className={styles.searchPrice}>{formatCurrency(m.sellingPrice)}</p>
                    <Plus size={16} className={styles.addIcon} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Cart ({cart.length} items)</h3>
            {cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <span style={{ fontSize: '2.5rem' }}>🛒</span>
                <p>No items added yet</p>
              </div>
            ) : (
              <div className={styles.cartItems}>
                {cart.map(item => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.cartAvatar}>{item.name[0]}</div>
                    <div className={styles.cartInfo}>
                      <p className={styles.cartName}>{item.name}</p>
                      <p className={styles.cartMeta}>{formatCurrency(item.sellingPrice)} each · GST {item.gst}%</p>
                    </div>
                    <div className={styles.qtyControls}>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                      <span className={styles.qtyVal}>{item.qty}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <p className={styles.cartTotal}>{formatCurrency(item.sellingPrice * item.qty)}</p>
                    <button className={styles.removeBtn} onClick={() => setCart(p => p.filter(i => i.id !== item.id))}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right — Customer & Summary */}
        <motion.div className={styles.rightPanel} variants={staggerItem}>
          {/* Customer */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Customer Details</h3>
            <div className={styles.customerForm}>
              <div className={styles.inputWrap}>
                <User size={15} className={styles.inputIcon} />
                <input className={styles.custInput} placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
              </div>
              <div className={styles.inputWrap}>
                <Phone size={15} className={styles.inputIcon} />
                <input className={styles.custInput} placeholder="Phone Number" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
              </div>
              <div className={styles.inputWrap}>
                <FileText size={15} className={styles.inputIcon} />
                <input className={styles.custInput} placeholder="Prescription No. (optional)" value={prescriptionNo} onChange={e => setPrescriptionNo(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Payment Method</h3>
            <div className={styles.paymentMethods}>
              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={`${styles.payBtn} ${paymentMethod === id ? styles.payBtnActive : ''}`}
                  onClick={() => setPaymentMethod(id)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Invoice Summary</h3>
            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>GST</span>
                <span>{formatCurrency(gstTotal)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                <span className={styles.discLabel}><Percent size={13} /> Discount</span>
                <div className={styles.discInput}>
                  <input type="number" min={0} max={100} value={discount}
                    onChange={e => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))} className={styles.discNum} />
                  <span>%</span>
                </div>
              </div>
              {discountAmt > 0 && (
                <div className={styles.summaryRow} style={{ color: 'var(--success)' }}>
                  <span>Discount Amount</span>
                  <span>-{formatCurrency(discountAmt)}</span>
                </div>
              )}
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Grand Total</span>
                <span className={styles.grandTotal}>{formatCurrency(grandTotal)}</span>
              </div>
            </div>
            <Button fullWidth size="lg" onClick={handleBill} style={{ marginTop: 16 }}>
              Generate Invoice
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Billing;
