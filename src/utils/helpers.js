import { format, formatDistanceToNow, addDays, differenceInDays, parseISO } from 'date-fns';

// Format currency
export const formatCurrency = (amount, currency = '₹') => {
  if (amount === null || amount === undefined) return `${currency}0`;
  return `${currency}${Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

// Format date
export const formatDate = (date, fmt = 'dd MMM yyyy') => {
  if (!date) return 'N/A';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, fmt);
  } catch { return 'Invalid Date'; }
};

// Relative time
export const timeAgo = (date) => {
  if (!date) return 'N/A';
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(d, { addSuffix: true });
  } catch { return 'N/A'; }
};

// Days until expiry
export const daysUntilExpiry = (expiryDate) => {
  if (!expiryDate) return null;
  try {
    const d = typeof expiryDate === 'string' ? parseISO(expiryDate) : expiryDate;
    return differenceInDays(d, new Date());
  } catch { return null; }
};

// Expiry status
export const getExpiryStatus = (expiryDate) => {
  const days = daysUntilExpiry(expiryDate);
  if (days === null) return { status: 'unknown', color: 'gray', label: 'Unknown' };
  if (days < 0) return { status: 'expired', color: 'danger', label: 'Expired' };
  if (days <= 15) return { status: 'critical', color: 'danger', label: `${days}d left` };
  if (days <= 30) return { status: 'warning', color: 'warning', label: `${days}d left` };
  if (days <= 90) return { status: 'caution', color: 'primary', label: `${days}d left` };
  return { status: 'good', color: 'success', label: `${days}d left` };
};

// Stock status
export const getStockStatus = (quantity, minQuantity = 10) => {
  if (quantity <= 0) return { status: 'out', color: 'danger', label: 'Out of Stock' };
  if (quantity <= minQuantity) return { status: 'low', color: 'warning', label: 'Low Stock' };
  return { status: 'available', color: 'success', label: 'In Stock' };
};

// Truncate text
export const truncate = (str, len = 30) => {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '…' : str;
};

// Generate invoice number
export const generateInvoiceNo = () => {
  const prefix = 'PF';
  const year = new Date().getFullYear().toString().slice(2);
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `${prefix}${year}-${num}`;
};

// Calculate GST
export const calculateGST = (amount, gstPercent) => {
  const gst = (amount * gstPercent) / 100;
  return { gst: gst.toFixed(2), total: (amount + gst).toFixed(2) };
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Random color from palette
const COLORS = ['#2196F3', '#43A047', '#FB8C00', '#E53935', '#8E24AA', '#00897B'];
export const getRandomColor = (index) => COLORS[index % COLORS.length];

// Generate OTP (mock)
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
