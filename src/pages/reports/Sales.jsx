import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { TrendingUp, ShoppingBag, DollarSign, Award } from 'lucide-react';
import { monthlySales, weeklySales, categorySales } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';
import StatCard from '../../components/common/StatCard';
import { staggerContainer, staggerItem } from '../../animations/variants';
import styles from './Sales.module.css';

const TABS = ['Daily', 'Weekly', 'Monthly'];

const Sales = () => {
  const [tab, setTab] = useState('Monthly');

  const totals = {
    revenue: monthlySales.reduce((s, m) => s + m.revenue, 0),
    orders: monthlySales.reduce((s, m) => s + m.orders, 0),
    profit: monthlySales.reduce((s, m) => s + m.profit, 0),
  };

  const topMeds = [
    { name: 'Paracetamol 500mg', sales: 1250, revenue: 15000 },
    { name: 'Atorvastatin 10mg', sales: 980, revenue: 78400 },
    { name: 'Metformin 500mg', sales: 870, revenue: 33060 },
    { name: 'Omeprazole 20mg', sales: 760, revenue: 21280 },
    { name: 'Cetirizine 10mg', sales: 620, revenue: 9920 },
  ];

  return (
    <motion.div className={styles.page} initial="initial" animate="animate" variants={staggerContainer}>
      <motion.div variants={staggerItem}>
        <h1 className={styles.title}>Sales Analytics</h1>
        <p className={styles.sub}>Performance overview across all time periods</p>
      </motion.div>

      <motion.div className={styles.statsGrid} variants={staggerContainer}>
        <StatCard title="Total Revenue" value={totals.revenue} icon={DollarSign} color="primary" prefix="₹" change={15.3} />
        <StatCard title="Total Orders" value={totals.orders} icon={ShoppingBag} color="success" change={8.2} />
        <StatCard title="Net Profit" value={totals.profit} icon={TrendingUp} color="purple" prefix="₹" change={12.4} />
        <StatCard title="Avg Order Value" value={Math.round(totals.revenue / totals.orders)} icon={Award} color="teal" prefix="₹" />
      </motion.div>

      <motion.div className={styles.chartCard} variants={staggerItem}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>Revenue Trend</h3>
          <div className={styles.tabs}>
            {TABS.map(t => (
              <button key={t} className={`${styles.tab} ${tab === t ? styles.activeTab : ''}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={tab === 'Weekly' ? weeklySales : monthlySales}>
            <defs>
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2196F3" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2196F3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
            <XAxis dataKey={tab === 'Weekly' ? 'day' : 'month'} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={(val, name) => [formatCurrency(val), name]} />
            <Area type="monotone" dataKey={tab === 'Weekly' ? 'sales' : 'revenue'} stroke="#2196F3" fill="url(#grad1)" strokeWidth={2.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div className={styles.bottomRow} variants={staggerItem}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Top Selling Medicines</h3>
          <div className={styles.topMeds}>
            {topMeds.map((m, i) => (
              <div key={m.name} className={styles.topMedRow}>
                <div className={styles.rank}>{i + 1}</div>
                <div className={styles.topMedInfo}>
                  <p className={styles.topMedName}>{m.name}</p>
                  <p className={styles.topMedSales}>{m.sales} units sold</p>
                </div>
                <span className={styles.topMedRevenue}>{formatCurrency(m.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categorySales} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip formatter={(v) => [`${v}%`, 'Share']} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={20}>
                {categorySales.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sales;
