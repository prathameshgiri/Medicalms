import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Mail, Lock, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import styles from './Auth.module.css';
import fp from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0=email, 1=otp, 2=reset, 3=success
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    toast.info('OTP sent to your email!');
    setStep(1);
  };

  const handleOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    setLoading(false);
    setStep(2);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setStep(3);
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <motion.div
        className={`${styles.card} ${fp.fpCard}`}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className={fp.icon}><Mail size={28} /></div>
              <h2 className={styles.cardTitle}>Forgot Password?</h2>
              <p className={styles.cardSub} style={{ marginBottom: 24 }}>Enter your email to receive an OTP</p>
              <form onSubmit={handleEmail} className={styles.form}>
                <Input label="Email Address" icon={Mail} type="email" placeholder="your@email.com"
                  value={email} onChange={e => setEmail(e.target.value)} required />
                <Button type="submit" fullWidth loading={loading} icon={Mail}>Send OTP</Button>
                <Link to="/login" className={fp.backLink}><ArrowLeft size={14} /> Back to Login</Link>
              </form>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className={fp.icon}>📬</div>
              <h2 className={styles.cardTitle}>Check Your Email</h2>
              <p className={styles.cardSub} style={{ marginBottom: 24 }}>Enter the OTP sent to <strong>{email}</strong></p>
              <form onSubmit={handleOTP} className={styles.form}>
                <Input label="OTP Code" icon={Shield} placeholder="6-digit code"
                  value={otp} onChange={e => setOtp(e.target.value)} required />
                <Button type="submit" fullWidth loading={loading} icon={Shield}>Verify OTP</Button>
                <button className={fp.resendBtn} type="button" onClick={() => toast.info('OTP resent!')}>Resend OTP</button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className={fp.icon}><Lock size={28} /></div>
              <h2 className={styles.cardTitle}>Reset Password</h2>
              <p className={styles.cardSub} style={{ marginBottom: 24 }}>Create a new secure password</p>
              <form onSubmit={handleReset} className={styles.form}>
                <Input label="New Password" icon={Lock} type="password" placeholder="Min 8 characters"
                  value={password} onChange={e => setPassword(e.target.value)} required />
                <Input label="Confirm Password" icon={Lock} type="password" placeholder="Repeat password"
                  value={confirm} onChange={e => setConfirm(e.target.value)} required />
                <Button type="submit" fullWidth loading={loading} icon={Shield}>Reset Password</Button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={fp.successSection}
            >
              <motion.div
                className={fp.successIcon}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5, times: [0, 0.5, 1] }}
              >
                <CheckCircle size={60} />
              </motion.div>
              <h2 className={styles.cardTitle}>Password Reset! 🎉</h2>
              <p className={styles.cardSub}>Your password has been reset successfully. You can now sign in.</p>
              <Button fullWidth size="lg" onClick={() => navigate('/login')} icon={Shield} style={{ marginTop: 16 }}>
                Go to Login
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
