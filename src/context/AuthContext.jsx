import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const MOCK_USERS = [
  {
    id: 1,
    name: 'Dr. Prathamesh Giri',
    email: 'admin@pharmaflow.com',
    password: 'admin123',
    role: 'Admin',
    avatar: null,
    phone: '+91 98765 43210',
    department: 'Management',
    joinDate: '2023-01-15',
    permissions: ['all']
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    email: 'pharmacist@pharmaflow.com',
    password: 'pharm123',
    role: 'Pharmacist',
    avatar: null,
    phone: '+91 87654 32109',
    department: 'Pharmacy',
    joinDate: '2023-06-10',
    permissions: ['medicines', 'billing', 'inventory']
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pms-user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate API
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem('pms-user', JSON.stringify(safeUser));
      setIsLoading(false);
      return { success: true };
    }
    setIsLoading(false);
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pms-user');
  };

  const updateUser = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('pms-user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
