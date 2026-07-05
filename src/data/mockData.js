// ================================================================
// Mock Data — Medicines
// ================================================================
export const medicines = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    brand: 'Calpol',
    category: 'Analgesic',
    manufacturer: 'GSK Pharma',
    batchNo: 'BT-2024-001',
    mfgDate: '2024-01-15',
    expiryDate: '2026-01-15',
    quantity: 450,
    minQuantity: 50,
    purchasePrice: 8.50,
    sellingPrice: 12.00,
    mrp: 15.00,
    gst: 5,
    description: 'Used for relief of mild to moderate pain and fever.',
    image: null,
    barcode: '8901234567890',
    status: 'active',
    supplierId: 1,
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin',
    brand: 'Mox',
    category: 'Antibiotic',
    manufacturer: 'Cipla',
    batchNo: 'BT-2024-002',
    mfgDate: '2024-03-10',
    expiryDate: '2025-09-10',
    quantity: 8,
    minQuantity: 20,
    purchasePrice: 45.00,
    sellingPrice: 65.00,
    mrp: 75.00,
    gst: 12,
    description: 'Broad-spectrum antibiotic used to treat bacterial infections.',
    image: null,
    barcode: '8901234567891',
    status: 'active',
    supplierId: 2,
  },
  {
    id: 3,
    name: 'Metformin 500mg',
    genericName: 'Metformin HCl',
    brand: 'Glucophage',
    category: 'Antidiabetic',
    manufacturer: 'Sun Pharma',
    batchNo: 'BT-2024-003',
    mfgDate: '2023-11-01',
    expiryDate: '2025-11-01',
    quantity: 200,
    minQuantity: 30,
    purchasePrice: 25.00,
    sellingPrice: 38.00,
    mrp: 45.00,
    gst: 5,
    description: 'Used to treat type 2 diabetes mellitus.',
    image: null,
    barcode: '8901234567892',
    status: 'active',
    supplierId: 1,
  },
  {
    id: 4,
    name: 'Atorvastatin 10mg',
    genericName: 'Atorvastatin',
    brand: 'Lipitor',
    category: 'Cardiovascular',
    manufacturer: 'Pfizer',
    batchNo: 'BT-2024-004',
    mfgDate: '2024-02-20',
    expiryDate: '2026-08-20',
    quantity: 350,
    minQuantity: 40,
    purchasePrice: 55.00,
    sellingPrice: 80.00,
    mrp: 95.00,
    gst: 12,
    description: 'Used to lower cholesterol and reduce risk of heart disease.',
    image: null,
    barcode: '8901234567893',
    status: 'active',
    supplierId: 3,
  },
  {
    id: 5,
    name: 'Azithromycin 500mg',
    genericName: 'Azithromycin',
    brand: 'Zithromax',
    category: 'Antibiotic',
    manufacturer: 'Pfizer',
    batchNo: 'BT-2023-010',
    mfgDate: '2023-08-01',
    expiryDate: '2025-07-10',
    quantity: 5,
    minQuantity: 15,
    purchasePrice: 70.00,
    sellingPrice: 98.00,
    mrp: 120.00,
    gst: 12,
    description: 'Antibiotic used to treat various bacterial infections.',
    image: null,
    barcode: '8901234567894',
    status: 'low-stock',
    supplierId: 2,
  },
  {
    id: 6,
    name: 'Omeprazole 20mg',
    genericName: 'Omeprazole',
    brand: 'Prilosec',
    category: 'Gastrointestinal',
    manufacturer: 'AstraZeneca',
    batchNo: 'BT-2024-006',
    mfgDate: '2024-04-01',
    expiryDate: '2026-04-01',
    quantity: 500,
    minQuantity: 50,
    purchasePrice: 18.00,
    sellingPrice: 28.00,
    mrp: 35.00,
    gst: 5,
    description: 'Proton pump inhibitor used for acid reflux and ulcers.',
    image: null,
    barcode: '8901234567895',
    status: 'active',
    supplierId: 1,
  },
  {
    id: 7,
    name: 'Cetirizine 10mg',
    genericName: 'Cetirizine HCl',
    brand: 'Zyrtec',
    category: 'Antiallergic',
    manufacturer: 'UCB Pharma',
    batchNo: 'BT-2024-007',
    mfgDate: '2024-01-10',
    expiryDate: '2026-01-10',
    quantity: 320,
    minQuantity: 30,
    purchasePrice: 10.00,
    sellingPrice: 16.00,
    mrp: 22.00,
    gst: 5,
    description: 'Antihistamine used to relieve allergy symptoms.',
    image: null,
    barcode: '8901234567896',
    status: 'active',
    supplierId: 3,
  },
  {
    id: 8,
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    brand: 'Brufen',
    category: 'Analgesic',
    manufacturer: 'Abbott',
    batchNo: 'BT-2023-008',
    mfgDate: '2023-06-01',
    expiryDate: '2025-07-18',
    quantity: 0,
    minQuantity: 25,
    purchasePrice: 12.00,
    sellingPrice: 20.00,
    mrp: 28.00,
    gst: 5,
    description: 'NSAID used for pain, fever, and inflammation.',
    image: null,
    barcode: '8901234567897',
    status: 'out-of-stock',
    supplierId: 2,
  },
];

// ================================================================
// Mock Data — Categories
// ================================================================
export const categories = [
  { id: 1, name: 'Analgesic', description: 'Pain relief medications', count: 25, color: '#2196F3', icon: 'pill' },
  { id: 2, name: 'Antibiotic', description: 'Bacterial infection treatments', count: 42, color: '#43A047', icon: 'shield' },
  { id: 3, name: 'Antidiabetic', description: 'Diabetes management drugs', count: 18, color: '#FB8C00', icon: 'activity' },
  { id: 4, name: 'Cardiovascular', description: 'Heart and blood pressure meds', count: 31, color: '#E53935', icon: 'heart' },
  { id: 5, name: 'Gastrointestinal', description: 'Digestive system medications', count: 22, color: '#8E24AA', icon: 'zap' },
  { id: 6, name: 'Antiallergic', description: 'Allergy relief medications', count: 15, color: '#00897B', icon: 'shield-check' },
  { id: 7, name: 'Vitamin & Supplement', description: 'Vitamins and nutritional supplements', count: 38, color: '#F06292', icon: 'sun' },
  { id: 8, name: 'Antifungal', description: 'Fungal infection treatments', count: 12, color: '#7986CB', icon: 'leaf' },
];

// ================================================================
// Mock Data — Customers
// ================================================================
export const customers = [
  { id: 1, name: 'Ananya Sharma', phone: '+91 98765 12340', email: 'ananya@email.com', age: 34, gender: 'Female', address: '12 MG Road, Pune', joinDate: '2023-03-15', totalOrders: 18, totalSpent: 4560, medicalHistory: ['Diabetes', 'Hypertension'], lastVisit: '2025-06-28' },
  { id: 2, name: 'Rohan Patel', phone: '+91 87654 23451', email: 'rohan@email.com', age: 45, gender: 'Male', address: '45 FC Road, Pune', joinDate: '2023-05-20', totalOrders: 25, totalSpent: 8900, medicalHistory: ['Asthma'], lastVisit: '2025-07-01' },
  { id: 3, name: 'Priya Deshmukh', phone: '+91 76543 34562', email: 'priya@email.com', age: 28, gender: 'Female', address: '78 JM Road, Pune', joinDate: '2024-01-10', totalOrders: 9, totalSpent: 2300, medicalHistory: [], lastVisit: '2025-06-15' },
  { id: 4, name: 'Vijay Kumar', phone: '+91 65432 45673', email: 'vijay@email.com', age: 62, gender: 'Male', address: '23 Deccan, Pune', joinDate: '2022-11-05', totalOrders: 56, totalSpent: 21450, medicalHistory: ['Heart Disease', 'Diabetes', 'Hypertension'], lastVisit: '2025-07-03' },
  { id: 5, name: 'Meena Joshi', phone: '+91 54321 56784', email: 'meena@email.com', age: 52, gender: 'Female', address: '56 Kothrud, Pune', joinDate: '2023-08-22', totalOrders: 32, totalSpent: 12800, medicalHistory: ['Thyroid'], lastVisit: '2025-06-30' },
];

// ================================================================
// Mock Data — Suppliers
// ================================================================
export const suppliers = [
  { id: 1, name: 'MediPharma Distributors', contact: 'Suresh Iyer', phone: '+91 98001 12345', email: 'suresh@medipharma.com', address: 'Plot 12, MIDC, Pune', gstNo: 'GSTIN27AABCS1681G1ZB', totalOrders: 45, pendingPayment: 28500, rating: 4.8 },
  { id: 2, name: 'HealthPlus Suppliers', contact: 'Kavita Nair', phone: '+91 99002 23456', email: 'kavita@healthplus.com', address: 'Sector 7, Navi Mumbai', gstNo: 'GSTIN27AAHPN2245H1ZD', totalOrders: 38, pendingPayment: 15600, rating: 4.5 },
  { id: 3, name: 'PharmaDirect India', contact: 'Arjun Mehta', phone: '+91 97003 34567', email: 'arjun@pharmadirect.in', address: 'Baner Road, Pune', gstNo: 'GSTIN27AAIPD3912K1ZF', totalOrders: 22, pendingPayment: 0, rating: 4.9 },
];

// ================================================================
// Mock Data — Sales (for charts)
// ================================================================
export const monthlySales = [
  { month: 'Jan', revenue: 45000, orders: 320, profit: 12000 },
  { month: 'Feb', revenue: 52000, orders: 380, profit: 14500 },
  { month: 'Mar', revenue: 48000, orders: 350, profit: 13200 },
  { month: 'Apr', revenue: 61000, orders: 420, profit: 17000 },
  { month: 'May', revenue: 58000, orders: 410, profit: 16200 },
  { month: 'Jun', revenue: 67000, orders: 480, profit: 19500 },
  { month: 'Jul', revenue: 72000, orders: 510, profit: 21000 },
];

export const weeklySales = [
  { day: 'Mon', sales: 8500, orders: 62 },
  { day: 'Tue', sales: 9200, orders: 71 },
  { day: 'Wed', sales: 7800, orders: 55 },
  { day: 'Thu', sales: 11000, orders: 83 },
  { day: 'Fri', sales: 13500, orders: 95 },
  { day: 'Sat', sales: 16000, orders: 118 },
  { day: 'Sun', sales: 10200, orders: 76 },
];

export const categorySales = [
  { name: 'Analgesic', value: 28, color: '#2196F3' },
  { name: 'Antibiotic', value: 22, color: '#43A047' },
  { name: 'Antidiabetic', value: 18, color: '#FB8C00' },
  { name: 'Cardiovascular', value: 15, color: '#E53935' },
  { name: 'Gastrointestinal', value: 10, color: '#8E24AA' },
  { name: 'Others', value: 7, color: '#00897B' },
];

// ================================================================
// Mock Data — Prescriptions
// ================================================================
export const prescriptions = [
  { id: 1, patientName: 'Ananya Sharma', doctorName: 'Dr. Rajesh Kumar', hospital: 'Ruby Hall Clinic', date: '2025-06-28', medicines: ['Metformin 500mg', 'Atorvastatin 10mg'], status: 'approved', prescriptionNo: 'RX-2025-001' },
  { id: 2, patientName: 'Vijay Kumar', doctorName: 'Dr. Sunita Patel', hospital: 'KEM Hospital', date: '2025-07-01', medicines: ['Amoxicillin 250mg', 'Paracetamol 500mg'], status: 'pending', prescriptionNo: 'RX-2025-002' },
  { id: 3, patientName: 'Priya Deshmukh', doctorName: 'Dr. Amit Shah', hospital: 'Jehangir Hospital', date: '2025-07-03', medicines: ['Cetirizine 10mg'], status: 'pending', prescriptionNo: 'RX-2025-003' },
  { id: 4, patientName: 'Rohan Patel', doctorName: 'Dr. Priya Verma', hospital: 'Poona Hospital', date: '2025-06-25', medicines: ['Omeprazole 20mg', 'Ibuprofen 400mg'], status: 'rejected', prescriptionNo: 'RX-2025-004' },
];

// ================================================================
// Mock Data — Purchase Orders
// ================================================================
export const purchaseOrders = [
  { id: 1, poNo: 'PO-2025-001', supplierId: 1, supplier: 'MediPharma Distributors', date: '2025-06-20', expectedDelivery: '2025-07-05', status: 'delivered', total: 45000, items: 12 },
  { id: 2, poNo: 'PO-2025-002', supplierId: 2, supplier: 'HealthPlus Suppliers', date: '2025-07-01', expectedDelivery: '2025-07-10', status: 'pending', total: 28500, items: 8 },
  { id: 3, poNo: 'PO-2025-003', supplierId: 3, supplier: 'PharmaDirect India', date: '2025-07-03', expectedDelivery: '2025-07-08', status: 'transit', total: 15600, items: 5 },
];

// ================================================================
// Mock Data — Employees
// ================================================================
export const employees = [
  { id: 1, name: 'Dr. Prathamesh Giri', role: 'Admin / Manager', email: 'admin@pharmaflow.com', phone: '+91 98765 43210', shift: 'Morning', salary: 85000, status: 'active', joinDate: '2023-01-15', attendance: 97 },
  { id: 2, name: 'Rahul Sharma', role: 'Pharmacist', email: 'pharmacist@pharmaflow.com', phone: '+91 87654 32109', shift: 'Morning', salary: 55000, status: 'active', joinDate: '2023-06-10', attendance: 94 },
  { id: 3, name: 'Sneha Joshi', role: 'Billing Executive', email: 'sneha@pharmaflow.com', phone: '+91 76543 21098', shift: 'Evening', salary: 35000, status: 'active', joinDate: '2024-02-01', attendance: 92 },
  { id: 4, name: 'Amit Kumar', role: 'Delivery Staff', email: 'amit@pharmaflow.com', phone: '+91 65432 10987', shift: 'Morning', salary: 25000, status: 'on-leave', joinDate: '2024-05-15', attendance: 88 },
];

// ================================================================
// Mock Data — Notifications
// ================================================================
export const notifications = [
  { id: 1, type: 'warning', title: 'Low Stock Alert', message: 'Amoxicillin 250mg has only 8 units left', time: '2025-07-05T08:30:00', read: false },
  { id: 2, type: 'danger', title: 'Expiry Alert', message: 'Azithromycin 500mg expires in 13 days', time: '2025-07-05T09:00:00', read: false },
  { id: 3, type: 'success', title: 'Order Delivered', message: 'PO-2025-001 from MediPharma has been delivered', time: '2025-07-05T10:15:00', read: true },
  { id: 4, type: 'info', title: 'New Prescription', message: 'RX-2025-003 from Dr. Amit Shah is pending approval', time: '2025-07-05T11:00:00', read: false },
  { id: 5, type: 'danger', title: 'Out of Stock', message: 'Ibuprofen 400mg is completely out of stock', time: '2025-07-05T12:30:00', read: true },
];

// ================================================================
// Mock Data — Recent Activity
// ================================================================
export const recentActivity = [
  { id: 1, action: 'Sale Completed', detail: 'Invoice #PF25-48291 — ₹1,250', user: 'Rahul Sharma', time: '5 mins ago', type: 'sale' },
  { id: 2, action: 'New Customer Added', detail: 'Meena Joshi registered', user: 'Sneha Joshi', time: '22 mins ago', type: 'customer' },
  { id: 3, action: 'Stock Updated', detail: 'Paracetamol 500mg +100 units', user: 'Rahul Sharma', time: '1 hr ago', type: 'inventory' },
  { id: 4, action: 'Prescription Approved', detail: 'RX-2025-001 approved for Ananya Sharma', user: 'Dr. Prathamesh Giri', time: '2 hrs ago', type: 'prescription' },
  { id: 5, action: 'Purchase Order Created', detail: 'PO-2025-003 to PharmaDirect India', user: 'Dr. Prathamesh Giri', time: '3 hrs ago', type: 'order' },
  { id: 6, action: 'Low Stock Alert', detail: 'Azithromycin 500mg — 5 units', user: 'System', time: '4 hrs ago', type: 'alert' },
];

// ================================================================
// Mock Data — Dashboard Stats
// ================================================================
export const dashboardStats = {
  todaySales: 18650,
  todayOrders: 127,
  monthRevenue: 72000,
  totalMedicines: 847,
  lowStockCount: 12,
  expiredCount: 3,
  pendingPrescriptions: 5,
  totalSuppliers: 8,
  totalCustomers: 342,
  todaySalesChange: +12.5,
  ordersChange: +8.2,
  revenueChange: +15.3,
};
