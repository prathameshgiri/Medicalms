import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Camera, Save, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });

  const save = () => { updateUser(form); toast.success('Profile updated!'); };

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem}>
        <h1 className={styles.title}>My Profile</h1>
        <p className={styles.sub}>Manage your personal information and account settings</p>
      </motion.div>

      <motion.div className={styles.layout} variants={staggerItem}>
        {/* Avatar Card */}
        <div className={styles.avatarCard}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>{user?.name?.charAt(0) || 'A'}</div>
            <button className={styles.cameraBtn}><Camera size={16} /></button>
          </div>
          <h3 className={styles.profileName}>{user?.name}</h3>
          <Badge variant="primary">{user?.role}</Badge>
          <p className={styles.profileEmail}>{user?.email}</p>
          <div className={styles.profileStats}>
            <div className={styles.profileStat}><strong>{user?.department}</strong><span>Department</span></div>
            <div className={styles.profileStat}><strong>{user?.joinDate}</strong><span>Joined</span></div>
          </div>
        </div>

        {/* Form */}
        <div className={styles.formCard}>
          <h3 className={styles.sectionTitle}>Personal Information</h3>
          <div className={styles.formGrid}>
            <Input label="Full Name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            <Input label="Email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
            <Input label="Phone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            <div>
              <label className={styles.fieldLabel}>Role</label>
              <input className={styles.readOnly} value={user?.role} readOnly />
            </div>
          </div>
          <Button icon={Save} onClick={save}>Save Changes</Button>

          <div className={styles.divider} />
          <h3 className={styles.sectionTitle}>Change Password</h3>
          <div className={styles.formGrid}>
            <Input label="Current Password" type="password" placeholder="Enter current password" />
            <Input label="New Password" type="password" placeholder="Enter new password" />
          </div>
          <Button variant="secondary" icon={Shield}>Update Password</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
