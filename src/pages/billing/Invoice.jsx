import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import { Printer, Download, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { formatDate, formatCurrency } from '../../utils/helpers';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import styles from './Invoice.module.css';

const MOCK_INVOICE = {
  invoiceNo: 'PF25-48291',
  date: new Date().toISOString(),
  customerName: 'Ananya Sharma',
  customerPhone: '+91 98765 12340',
  items: [
    { name: 'Paracetamol 500mg', qty: 2, price: 12, gst: 5 },
    { name: 'Cetirizine 10mg', qty: 1, price: 16, gst: 5 },
    { name: 'Omeprazole 20mg', qty: 1, price: 28, gst: 5 },
  ],
  paymentMethod: 'UPI',
  discount: 10,
};

const Invoice = () => {
  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });

  const subtotal = MOCK_INVOICE.items.reduce((s, i) => s + i.price * i.qty, 0);
  const gstAmt = MOCK_INVOICE.items.reduce((s, i) => s + (i.price * i.qty * i.gst / 100), 0);
  const discountAmt = (subtotal * MOCK_INVOICE.discount) / 100;
  const total = subtotal + gstAmt - discountAmt;

  return (
    <motion.div className={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={styles.actions}>
        <Button variant="secondary" icon={Printer} onClick={handlePrint}>Print Invoice</Button>
        <Button icon={Download}>Download PDF</Button>
      </div>

      <div className={styles.invoiceWrapper} ref={printRef}>
        {/* Header */}
        <div className={styles.invoiceHeader}>
          <div className={styles.companyInfo}>
            <div className={styles.companyLogo}>💊</div>
            <div>
              <h1 className={styles.companyName}>PharmaFlow</h1>
              <p className={styles.companyAddr}>123 MG Road, Pune, Maharashtra 411001</p>
              <p className={styles.companyAddr}>GST: 27AABCS1681G1ZB | Ph: +91 98765 43210</p>
            </div>
          </div>
          <div className={styles.invoiceMeta}>
            <div className={styles.invoiceTitle}>INVOICE</div>
            <div className={styles.metaRow}><span>Invoice No.</span><strong>{MOCK_INVOICE.invoiceNo}</strong></div>
            <div className={styles.metaRow}><span>Date</span><strong>{formatDate(MOCK_INVOICE.date)}</strong></div>
            <div className={styles.metaRow}><span>Payment</span><Badge variant="success">{MOCK_INVOICE.paymentMethod}</Badge></div>
          </div>
        </div>

        {/* Customer */}
        <div className={styles.customerSection}>
          <div>
            <p className={styles.sectionLabel}>BILLED TO</p>
            <p className={styles.customerName}>{MOCK_INVOICE.customerName}</p>
            <p className={styles.customerPhone}>{MOCK_INVOICE.customerPhone}</p>
          </div>
          <div className={styles.statusBadge}>
            <CheckCircle size={16} />
            <span>PAID</span>
          </div>
        </div>

        {/* Items Table */}
        <table className={styles.itemsTable}>
          <thead>
            <tr className={styles.itemHeader}>
              <th>#</th>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price</th>
              <th>GST</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_INVOICE.items.map((item, i) => (
              <tr key={i} className={styles.itemRow}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.gst}%</td>
                <td>{formatCurrency(item.price * item.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className={styles.invoiceSummary}>
          <div className={styles.qrSection}>
            <QRCodeSVG value={`INV:${MOCK_INVOICE.invoiceNo}:TOTAL:${total.toFixed(2)}`} size={100} level="M" />
            <p className={styles.qrLabel}>Scan to verify</p>
          </div>
          <div className={styles.totals}>
            <div className={styles.totalRow}><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className={styles.totalRow}><span>GST</span><span>{formatCurrency(gstAmt)}</span></div>
            <div className={styles.totalRow} style={{ color: 'var(--success)' }}><span>Discount ({MOCK_INVOICE.discount}%)</span><span>-{formatCurrency(discountAmt)}</span></div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}><span>GRAND TOTAL</span><span>{formatCurrency(total)}</span></div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.invoiceFooter}>
          <p>Thank you for choosing PharmaFlow! 💊</p>
          <p className={styles.footerSub}>This is a computer-generated invoice and does not require a signature.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Invoice;
