/**
 * HOPEHUB Centralized API Client
 * Configures base URL from VITE_API_BASE_URL (defaults to http://localhost:8080/api)
 * Automatically injects JWT Bearer tokens and handles graceful fallbacks.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('hopehub_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.message || data?.error || `HTTP error ${res.status}`;
      const error = new Error(errorMsg);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    // If backend is unreachable or throws network error
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      err.isNetworkError = true;
      console.warn(`[HOPEHUB API] Backend server unreachable at ${API_BASE}. Falling back to demo mode.`);
    }
    throw err;
  }
}

export const api = {
  // Authentication & Profile
  auth: {
    login: (email, password) => request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
    register: (userData) => request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
    getMe: () => request('/auth/me'),
    updateProfile: (profileData) => request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    }),
    changePassword: (currentPassword, newPassword) => request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    })
  },

  // Campaigns
  campaigns: {
    getAll: () => request('/campaigns'),
    getFeatured: () => request('/campaigns/featured'),
    getById: (id) => request(`/campaigns/${id}`),
    getByCategory: (category) => request(`/campaigns/category/${category}`),
    search: (q) => request(`/campaigns/search?q=${encodeURIComponent(q || '')}`),
    create: (data) => request('/campaigns', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    getMyCampaigns: () => request('/campaigns/my-campaigns')
  },

  // NGOs
  ngos: {
    getAll: () => request('/ngos'),
    getById: (id) => request(`/ngos/${id}`),
    getMe: () => request('/ngos/me')
  },

  // Donations & Receipts (Simulated Demo Mode)
  donations: {
    create: (donationData) => request('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData)
    }),
    getReceipt: (receiptNumber) => request(`/donations/receipt/${encodeURIComponent(receiptNumber)}`),
    getMyDonations: () => request('/donations/my-donations')
  },

  // Beneficiary Assistance Requests (Confidential)
  beneficiaries: {
    submitRequest: (requestData) => request('/beneficiaries/requests', {
      method: 'POST',
      body: JSON.stringify(requestData)
    }),
    getMyRequests: () => request('/beneficiaries/my-requests'),
    getById: (id) => request(`/beneficiaries/requests/${id}`)
  },

  // Volunteer Opportunities & Applications
  volunteers: {
    getOpportunities: () => request('/volunteers/opportunities'),
    getOpportunityById: (id) => request(`/volunteers/opportunities/${id}`),
    apply: (opportunityId, message) => request(`/volunteers/apply/${opportunityId}`, {
      method: 'POST',
      body: JSON.stringify({ message })
    }),
    getMyApplications: () => request('/volunteers/my-applications'),
    getNgoApplications: () => request('/volunteers/ngo-applications'),
    updateStatus: (appId, status, hoursLogged = 0) => request(`/volunteers/applications/${appId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, hoursLogged })
    })
  },

  // In-Kind Resource Contributions
  resources: {
    submit: (resourceData) => request('/resources', {
      method: 'POST',
      body: JSON.stringify(resourceData)
    }),
    getMyResources: () => request('/resources/my-resources')
  },

  // Notifications
  notifications: {
    getMyNotifications: () => request('/notifications'),
    markAllRead: () => request('/notifications/mark-read', { method: 'PUT' })
  },

  // System Stats & Health
  system: {
    getHealth: () => request('/health'),
    getStats: () => request('/stats/overview')
  },

  // Administrator Operations
  admin: {
    getStats: () => request('/admin/stats'),
    getUsers: () => request('/admin/users'),
    toggleUserStatus: (userId, active) => request(`/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ active })
    }),
    getCampaigns: () => request('/admin/campaigns'),
    updateCampaignStatus: (id, status) => request(`/admin/campaigns/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
    getNgos: () => request('/admin/ngos'),
    verifyNgo: (id, status) => request(`/admin/ngos/${id}/verify`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
    getRequests: () => request('/admin/requests'),
    updateRequestStatus: (id, status, adminNotes = '') => request(`/admin/requests/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, adminNotes })
    }),
    getAuditLogs: () => request('/admin/audit-logs')
  }
};
