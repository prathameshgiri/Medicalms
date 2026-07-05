import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Mail, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import Button from '../../components/common/Button';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Help.module.css';

const FAQS = [
  { q: 'How do I add a new medicine?', a: 'Go to Medicines → Add Medicine and fill in all required details including name, batch, expiry and pricing.' },
  { q: 'How do I generate an invoice?', a: 'Navigate to Billing/POS, search for medicines, add them to cart, fill customer details and click Generate Invoice.' },
  { q: 'Can I export reports to Excel?', a: 'Yes! Go to Reports, select the report type and click Export button to download Excel or PDF.' },
  { q: 'How do expiry alerts work?', a: 'The system automatically flags medicines expiring in 30 days (warning), 15 days (critical), and expired ones.' },
  { q: 'How to approve prescriptions?', a: 'Go to Prescriptions, find the pending prescription and click the Approve button.' },
];

const Help = () => {
  const [open, setOpen] = useState(null);

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem}>
        <h1 className={styles.title}>Help Center</h1>
        <p className={styles.sub}>Find answers, documentation, and support</p>
      </motion.div>

      <motion.div className={styles.grid} variants={staggerItem}>
        <div>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {FAQS.map((faq, i) => (
              <motion.div key={i} className={styles.faq} onClick={() => setOpen(open === i ? null : i)}>
                <div className={styles.faqQ}>
                  <span>{faq.q}</span>
                  {open === i ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                {open === i && (
                  <motion.div className={styles.faqA} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Contact Support</h2>
          <div className={styles.contactCards}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon} style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}><Mail size={22} /></div>
              <h4>Email Support</h4>
              <p>support@pharmaflow.com</p>
              <Button size="sm" variant="outline">Send Email</Button>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon} style={{ background: 'var(--success-soft)', color: 'var(--success)' }}><Phone size={22} /></div>
              <h4>Phone Support</h4>
              <p>+91 1800 123 4567</p>
              <Button size="sm" variant="outline">Call Now</Button>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon} style={{ background: 'var(--purple-soft)', color: 'var(--purple)' }}><MessageSquare size={22} /></div>
              <h4>Live Chat</h4>
              <p>Available 9AM – 9PM</p>
              <Button size="sm" variant="outline">Start Chat</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Help;
