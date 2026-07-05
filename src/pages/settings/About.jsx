import { motion } from 'framer-motion';
import { Shield, Award, Target, Eye, CheckCircle } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './About.module.css';

const About = () => (
  <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
    <motion.div className={styles.hero} variants={staggerItem}>
      <div className={styles.heroIcon}><Shield size={40} /></div>
      <h1 className={styles.heroTitle}>About PharmaFlow</h1>
      <p className={styles.heroDesc}>A comprehensive, enterprise-grade pharmacy management system built for modern pharmacies.</p>
    </motion.div>

    <motion.div className={styles.grid} variants={staggerContainer}>
      {[
        { icon: Target, title: 'Our Mission', color: 'primary', desc: 'To empower pharmacies with cutting-edge technology that simplifies operations, reduces errors, and improves patient care through intelligent inventory and billing management.' },
        { icon: Eye, title: 'Our Vision', color: 'success', desc: 'To become the most trusted pharmacy management platform in India, enabling every pharmacy to operate at the highest standard of efficiency and patient service.' },
        { icon: Award, title: 'Our Values', color: 'purple', desc: 'We believe in accuracy, transparency, accessibility, and continuous improvement. Every feature we build is designed with pharmacists and patients in mind.' },
      ].map(({ icon: Icon, title, color, desc }) => (
        <motion.div key={title} className={styles.card} variants={staggerItem} whileHover={{ y: -4 }}>
          <div className={styles.cardIcon} style={{ background: `var(--gradient-${color})` }}><Icon size={22} color="white" /></div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDesc}>{desc}</p>
        </motion.div>
      ))}
    </motion.div>

    <motion.div className={styles.infoCard} variants={staggerItem}>
      <h2 className={styles.infoTitle}>System Information</h2>
      <div className={styles.infoGrid}>
        {[
          ['Version', 'v2.5.0'], ['License', 'Enterprise'], ['Build', '2025.07'],
          ['Framework', 'React.js + Vite'], ['Backend', 'Node.js (API Ready)'], ['Database', 'PostgreSQL Ready'],
        ].map(([k, v]) => (
          <div key={k} className={styles.infoRow}>
            <CheckCircle size={14} style={{ color: 'var(--success)' }} />
            <span className={styles.infoKey}>{k}</span>
            <strong className={styles.infoVal}>{v}</strong>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default About;
