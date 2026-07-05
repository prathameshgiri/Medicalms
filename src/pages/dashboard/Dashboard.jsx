import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag, TrendingUp, DollarSign, Pill, AlertTriangle,
  Clock, FileText, Truck, Users, Receipt, Package, Activity,
  Plus, ArrowRight, Bell, BarChart2
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { motion as m } from 'framer-motion';
import StatCard from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';
import { dashboardStats, monthlySales, weeklySales, categorySales, recentActivity, notifications } from '../../data/mockData';
import { formatCurrency, formatDate, timeAgo } from '../../utils/helpers';
import { staggerContainer, staggerItem, fadeInUp } from '../../animations/variants';
import styles from './Dashboard.module.css';

const QUICK_ACTIONS = [
  { label: 'New Bill', icon: Receipt, to: '/billing', color: 'primary' },
  { label: 'Add Medicine', icon: Plus, to: '/medicines/add', color: 'success' },
  { label: 'Add Customer', icon: Users, to: '/customers', color: 'purple' },
  { label: 'View Reports', icon: BarChart2, to: '/reports', color: 'warning' },
  { label: 'Suppliers', icon: Truck, to: '/suppliers', color: 'teal' },
  { label: 'Expiry Alerts', icon: AlertTriangle, to: '/expiry-alerts', color: 'danger' },
];

const activityColors = {
  sale: '#43A047', customer: '#8E24AA', inventory: '#2196F3',
  prescription: '#00897B', order: '#FB8C00', alert: '#E53935'
};

const activityIcons = {
  sale: Receipt, customer: Users, inventory: Package,
  prescription: FileText, order: ShoppingBag, alert: Bell
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.6)', borderRadius: 12, padding: '12px 16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontSize: 13
    }}>
      <p style={{ fontWeight: 700, marginBottom: 6, color: '#374151' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {p.name === 'revenue' || p.name === 'profit' ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [statsLoading, setStatsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setTimeout(() => setStatsLoading(false), 1000);
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, []);

  const stats = [
    { title: "Today's Sales", value: dashboardStats.todaySales, icon: DollarSign, color: 'primary', prefix: '₹', change: dashboardStats.todaySalesChange },
    { title: "Today's Orders", value: dashboardStats.todayOrders, icon: ShoppingBag, color: 'success', change: dashboardStats.ordersChange },
    { title: 'Monthly Revenue', value: dashboardStats.monthRevenue, icon: TrendingUp, color: 'purple', prefix: '₹', change: dashboardStats.revenueChange },
    { title: 'Medicines in Stock', value: dashboardStats.totalMedicines, icon: Pill, color: 'teal' },
    { title: 'Low Stock Items', value: dashboardStats.lowStockCount, icon: AlertTriangle, color: 'warning' },
    { title: 'Expired Medicines', value: dashboardStats.expiredCount, icon: Clock, color: 'danger' },
    { title: 'Pending Prescriptions', value: dashboardStats.pendingPrescriptions, icon: FileText, color: 'primary' },
    { title: 'Total Customers', value: dashboardStats.totalCustomers, icon: Users, color: 'success' },
  ];

  return (
    <motion.div
      className={styles.page}
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Welcome Banner */}
      <motion.div className={styles.welcomeBanner} variants={fadeInUp}>
        <div className={styles.welcomeLeft}>
          <h1 className={styles.welcomeTitle}>
            Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className={styles.welcomeSub}>
            Here's what's happening at your pharmacy today — {formatDate(currentTime, 'EEEE, dd MMMM yyyy')}
          </p>
          <div className={styles.welcomeStats}>
            <div className={styles.miniStat}>
              <span className={styles.miniStatVal}>{formatCurrency(dashboardStats.todaySales)}</span>
              <span className={styles.miniStatLabel}>Today's Revenue</span>
            </div>
            <div className={styles.miniStatDivider} />
            <div className={styles.miniStat}>
              <span className={styles.miniStatVal}>{dashboardStats.todayOrders}</span>
              <span className={styles.miniStatLabel}>Orders Today</span>
            </div>
            <div className={styles.miniStatDivider} />
            <div className={styles.miniStat}>
              <span className={styles.miniStatVal}>{dashboardStats.pendingPrescriptions}</span>
              <span className={styles.miniStatLabel}>Pending Rx</span>
            </div>
          </div>
        </div>
        <div className={styles.welcomeRight}>
          <motion.div
            className={styles.welcomeIllustration}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🏥
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div className={styles.statsGrid} variants={staggerContainer}>
        {stats.map((s, i) => (
          <StatCard key={s.title} {...s} loading={statsLoading} />
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div className={styles.section} variants={staggerItem}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.quickActions}>
          {QUICK_ACTIONS.map(({ label, icon: Icon, to, color }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to={to} className={styles.quickAction}>
                <div className={`${styles.qaIcon} ${styles[`qa${color}`]}`}>
                  <Icon size={22} />
                </div>
                <span className={styles.qaLabel}>{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <motion.div className={styles.chartsRow} variants={staggerItem}>
        {/* Revenue Area Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.chartTitle}>Revenue Overview</h3>
              <p className={styles.chartSub}>Monthly performance — 2025</p>
            </div>
            <Link to="/reports" className={styles.chartLink}>View all <ArrowRight size={14} /></Link>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlySales} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2196F3" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#43A047" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#43A047" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="revenue" stroke="#2196F3" fill="url(#colorRevenue)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#2196F3' }} />
              <Area type="monotone" dataKey="profit" name="profit" stroke="#43A047" fill="url(#colorProfit)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#43A047' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Sales Bar Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.chartTitle}>Weekly Sales</h3>
              <p className={styles.chartSub}>Orders this week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklySales} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" name="orders" radius={[6, 6, 0, 0]} maxBarSize={36}>
                {weeklySales.map((_, i) => (
                  <Cell key={i} fill={i === 5 ? '#2196F3' : 'rgba(33,150,243,0.25)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Row */}
      <motion.div className={styles.bottomRow} variants={staggerItem}>
        {/* Pie Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Sales by Category</h3>
          </div>
          <div className={styles.pieWrapper}>
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={categorySales} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                  dataKey="value" paddingAngle={3}>
                  {categorySales.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.pieLegend}>
              {categorySales.map(c => (
                <div key={c.name} className={styles.legendItem}>
                  <div className={styles.legendDot} style={{ background: c.color }} />
                  <span className={styles.legendLabel}>{c.name}</span>
                  <span className={styles.legendVal}>{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Recent Activity</h3>
            <Link to="/notifications" className={styles.chartLink}>View all <ArrowRight size={14} /></Link>
          </div>
          <div className={styles.activityList}>
            {recentActivity.map((a, i) => {
              const Icon = activityIcons[a.type] || Activity;
              const color = activityColors[a.type] || '#6B7280';
              return (
                <motion.div
                  key={a.id}
                  className={styles.activityItem}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className={styles.activityIcon} style={{ background: `${color}15`, color }}>
                    <Icon size={15} />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityAction}>{a.action}</p>
                    <p className={styles.activityDetail}>{a.detail}</p>
                  </div>
                  <span className={styles.activityTime}>{a.time}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Alerts Panel */}
        <div className={styles.alertsPanel}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Alerts</h3>
            <Link to="/notifications" className={styles.chartLink}>All <ArrowRight size={14} /></Link>
          </div>
          <div className={styles.alertsList}>
            {notifications.filter(n => !n.read).map(n => (
              <div key={n.id} className={`${styles.alertItem} ${styles[`alert_${n.type}`]}`}>
                <div className={styles.alertDot} />
                <div>
                  <p className={styles.alertTitle}>{n.title}</p>
                  <p className={styles.alertMsg}>{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
