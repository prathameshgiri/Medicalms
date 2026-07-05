import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Lock, Shield, ChevronRight, ChevronLeft } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import styles from './Auth.module.css';
import regStyles from './Register.module.css';

const ROLES = ['Admin', 'Pharmacist', 'Billing Executive', 'Manager', 'Delivery Staff'];

const steps = ['Personal Info', 'Account Setup', 'Verify OTP'];

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    if (step < 1) { setStep(s => s + 1); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setStep(2);
  };

  const verifyOTP = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    toast.success('Account created successfully! 🎉');
    navigate('/login');
  };

  const handleOtpChange = (val, idx) => {
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <motion.div
        className={`${styles.card} ${regStyles.registerCard}`}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Progress steps */}
        <div className={regStyles.steps}>
          {steps.map((s, i) => (
            <div key={s} className={regStyles.step}>
              <div className={`${regStyles.stepDot} ${i <= step ? regStyles.active : ''}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`${regStyles.stepLabel} ${i <= step ? regStyles.activeLabel : ''}`}>{s}</span>
              {i < steps.length - 1 && (
                <div className={`${regStyles.stepLine} ${i < step ? regStyles.activeLine : ''}`} />
              )}
            </div>
          ))}
        </div>

        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className={styles.cardTitle}>Create Account</h2>
            <p className={styles.cardSub} style={{ marginBottom: 24 }}>Tell us about yourself</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <Input label="Full Name" icon={User} placeholder="Dr. Prathamesh Giri" error={errors.name?.message}
                {...register('name', { required: 'Name is required' })} />
              <Input label="Email" icon={Mail} type="email" placeholder="your@email.com" error={errors.email?.message}
                {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} />
              <Input label="Phone Number" icon={Phone} placeholder="+91 98765 43210" error={errors.phone?.message}
                {...register('phone', { required: 'Phone required' })} />
              <div className={regStyles.roleGrid}>
                <label className={regStyles.roleLabel}>Role</label>
                <div className={regStyles.roles}>
                  {ROLES.map(r => (
                    <label key={r} className={regStyles.roleOption}>
                      <input type="radio" value={r} {...register('role', { required: 'Select a role' })} />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
                {errors.role && <p className={regStyles.error}>{errors.role.message}</p>}
              </div>
              <Button type="submit" fullWidth icon={ChevronRight} iconPosition="right">Continue</Button>
            </form>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className={styles.cardTitle}>Set Password</h2>
            <p className={styles.cardSub} style={{ marginBottom: 24 }}>Create a secure password</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <Input label="Password" icon={Lock} type="password" placeholder="Min 8 characters" error={errors.password?.message}
                {...register('password', { required: 'Password required', minLength: { value: 8, message: 'Min 8 characters' } })} />
              <Input label="Confirm Password" icon={Lock} type="password" placeholder="Repeat password" error={errors.confirm?.message}
                {...register('confirm', { required: 'Confirm password', validate: v => v === password || 'Passwords must match' })} />
              <label className={styles.remember}>
                <input type="checkbox" {...register('terms', { required: true })} />
                <span>I agree to the <Link to="/help" className={styles.switchLink}>Terms & Conditions</Link></span>
              </label>
              {errors.terms && <p style={{ color: 'var(--danger)', fontSize: '0.78rem' }}>Accept terms to continue</p>}
              <div style={{ display: 'flex', gap: 12 }}>
                <Button variant="secondary" type="button" icon={ChevronLeft} onClick={() => setStep(0)}>Back</Button>
                <Button type="submit" fullWidth loading={loading} icon={ChevronRight} iconPosition="right">Send OTP</Button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className={regStyles.otpSection}>
              <div className={regStyles.otpIcon}>📱</div>
              <h2 className={styles.cardTitle}>Verify OTP</h2>
              <p className={styles.cardSub}>Enter the 6-digit code sent to your phone</p>
              <div className={regStyles.otpInputs}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    className={regStyles.otpInput}
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(e.target.value, i)}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !digit && i > 0)
                        document.getElementById(`otp-${i - 1}`)?.focus();
                    }}
                  />
                ))}
              </div>
              <p className={regStyles.otpHint}>Demo: any 6 digits work</p>
              <Button fullWidth size="lg" loading={loading} onClick={verifyOTP} icon={Shield}>
                Verify & Create Account
              </Button>
            </div>
          </motion.div>
        )}

        <p className={styles.switchText} style={{ marginTop: 20 }}>
          Already have an account? <Link to="/login" className={styles.switchLink}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
