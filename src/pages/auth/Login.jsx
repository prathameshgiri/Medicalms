import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Mail, Lock, Shield, Sparkles, Activity, Heart, Pill } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import styles from './Auth.module.css';

const floatingIcons = [
  { Icon: Pill, top: '12%', left: '8%', delay: 0 },
  { Icon: Heart, top: '25%', right: '10%', delay: 0.5 },
  { Icon: Activity, bottom: '30%', left: '6%', delay: 1 },
  { Icon: Shield, bottom: '15%', right: '8%', delay: 1.5 },
  { Icon: Sparkles, top: '60%', left: '12%', delay: 0.8 },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await login(data.email, data.password);
    setLoading(false);
    if (result.success) {
      toast.success('Welcome back! 👋');
      navigate('/dashboard');
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  return (
    <div className={styles.authPage}>
      {/* Animated background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, delay, ...pos }, i) => (
        <motion.div
          key={i}
          className={styles.floatingIcon}
          style={pos}
          animate={{ y: [0, -16, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4 + i * 0.5, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon size={28} />
        </motion.div>
      ))}

      <div className={styles.authCenter}>
        {/* Left — Branding */}
        <motion.div
          className={styles.branding}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.brandLogo}>
            <Shield size={36} />
          </div>
          <h1 className={styles.brandName}>PharmaFlow</h1>
          <p className={styles.brandTagline}>
            Your complete pharmacy management solution
          </p>
          <div className={styles.features}>
            {['Inventory Management', 'Smart Billing & POS', 'Prescription Tracking', 'Analytics & Reports'].map((f, i) => (
              <motion.div
                key={f}
                className={styles.featureItem}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className={styles.featureDot} />
                {f}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right — Login Card */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Welcome back 👋</h2>
            <p className={styles.cardSub}>Sign in to your PharmaFlow account</p>
          </div>

          {/* Demo credentials hint */}
          <div className={styles.demoHint}>
            <p>Demo: <strong>admin@pharmaflow.com</strong> / <strong>admin123</strong></p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="admin@pharmaflow.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' }
              })}
            />

            <Input
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Min 6 characters' }
              })}
            />

            <div className={styles.formFooter}>
              <label className={styles.remember}>
                <input type="checkbox" {...register('remember')} />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
              icon={Shield}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>

          <p className={styles.switchText}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.switchLink}>Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
