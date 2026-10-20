import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext();

export const DEMO_USERS = {
  DONOR: {
    id: 3,
    name: "Aakash Mehta",
    email: "donor@hopehub.org",
    role: "DONOR",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98765 43210",
    totalDonated: 18500,
    supportedCount: 6
  },
  BENEFICIARY: {
    id: 5,
    name: "Sunita Devi",
    email: "beneficiary@hopehub.org",
    role: "BENEFICIARY",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80",
    phone: "+91 98112 23344",
    location: "Alwar, Rajasthan",
    activeRequests: 1
  },
  VOLUNTEER: {
    id: 4,
    name: "Rohan Varma",
    email: "volunteer@hopehub.org",
    role: "VOLUNTEER",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    phone: "+91 97234 56789",
    skills: ["First Aid", "Teaching", "Logistics"],
    hoursLogged: 42
  },
  NGO: {
    id: 2,
    name: "Pratham Shiksha Foundation",
    email: "ngo@hopehub.org",
    role: "NGO",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    phone: "+91 11 2345 6789",
    regNo: "NGO/DL/2018/004921",
    verified: true
  },
  ADMIN: {
    id: 1,
    name: "Platform Administrator",
    email: "admin@hopehub.org",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    phone: "+91 11 9999 8888",
    department: "Compliance & Trust Governance"
  }
};

export function AuthProvider({ children }) {
  // Current user state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('hopehub_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Welcome to HOPEHUB", message: "Explore verified campaigns and create your first contribution.", isRead: false, time: "Just now" },
    { id: 2, title: "NGO Verified", message: "Pratham Shiksha Foundation has successfully passed compliance audit.", isRead: false, time: "2 hours ago" },
    { id: 3, title: "Emergency Alert", message: "RapidShield dispatched 500 cyclone survival packs.", isRead: true, time: "1 day ago" }
  ]);

  // Try to load notifications and sync user profile if token is present
  useEffect(() => {
    const token = localStorage.getItem('hopehub_token');
    if (token) {
      api.auth.getMe()
        .then(res => {
          if (res?.data) {
            const user = {
              id: res.data.id,
              name: res.data.fullName,
              email: res.data.email,
              role: res.data.role,
              phone: res.data.phone,
              avatar: res.data.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
            };
            setCurrentUser(user);
            localStorage.setItem('hopehub_user', JSON.stringify(user));
          }
        })
        .catch(() => {
          // Keep existing local user state if offline
        });

      api.notifications.getMyNotifications()
        .then(res => {
          if (res?.data && res.data.length > 0) {
            const formatted = res.data.map(n => ({
              id: n.id,
              title: n.title,
              message: n.message,
              isRead: n.isRead,
              time: new Date(n.createdAt).toLocaleDateString()
            }));
            setNotifications(formatted);
          }
        })
        .catch(() => {});
    }
  }, []);

  const loginAs = async (roleKey) => {
    const fallbackUser = DEMO_USERS[roleKey] || DEMO_USERS.DONOR;
    try {
      // Attempt real backend authentication with demo account
      const res = await api.auth.login(fallbackUser.email, "password123");
      if (res?.data) {
        localStorage.setItem('hopehub_token', res.data.token);
        const user = {
          id: res.data.id,
          name: res.data.fullName,
          email: res.data.email,
          role: res.data.role,
          avatar: res.data.avatarUrl || fallbackUser.avatar,
          phone: res.data.phone || fallbackUser.phone
        };
        setCurrentUser(user);
        localStorage.setItem('hopehub_user', JSON.stringify(user));
        return user;
      }
    } catch {
      // Graceful fallback to local demo profile
    }

    setCurrentUser(fallbackUser);
    localStorage.setItem('hopehub_user', JSON.stringify(fallbackUser));
    return fallbackUser;
  };

  const loginCustom = async (email, password, role = "DONOR") => {
    try {
      const res = await api.auth.login(email, password);
      if (res?.data) {
        localStorage.setItem('hopehub_token', res.data.token);
        const user = {
          id: res.data.id,
          name: res.data.fullName,
          email: res.data.email,
          role: res.data.role,
          avatar: res.data.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
          phone: res.data.phone
        };
        setCurrentUser(user);
        localStorage.setItem('hopehub_user', JSON.stringify(user));
        return { success: true, user };
      }
    } catch (err) {
      if (!err.isNetworkError && err.status === 401) {
        throw new Error("Invalid email or password");
      }
      // If network offline or testing mock credentials:
      const user = {
        id: Date.now(),
        name: email.split('@')[0],
        email,
        role,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
      };
      setCurrentUser(user);
      localStorage.setItem('hopehub_user', JSON.stringify(user));
      return { success: true, user };
    }
  };

  const register = async (formData) => {
    try {
      const res = await api.auth.register(formData);
      if (res?.data) {
        localStorage.setItem('hopehub_token', res.data.token);
        const user = {
          id: res.data.id,
          name: res.data.fullName,
          email: res.data.email,
          role: res.data.role,
          avatar: res.data.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
          phone: res.data.phone
        };
        setCurrentUser(user);
        localStorage.setItem('hopehub_user', JSON.stringify(user));
        return { success: true, user };
      }
    } catch (err) {
      if (err.data?.message) {
        throw new Error(err.data.message);
      }
      throw err;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('hopehub_user');
    localStorage.removeItem('hopehub_token');
  };

  const markAllNotificationsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    try {
      await api.notifications.markAllRead();
    } catch {}
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loginAs,
      loginCustom,
      register,
      logout,
      notifications,
      markAllNotificationsRead,
      isAuthenticated: !!currentUser,
      role: currentUser?.role || null
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
