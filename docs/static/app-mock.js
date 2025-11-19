// Mock API لـ GitHub Pages - يستخدم localStorage بدلاً من قاعدة البيانات

// Override API functions to use localStorage
window.USE_LOCAL_STORAGE = true;

// Mock database in localStorage
const mockDB = {
  getReports() {
    return JSON.parse(localStorage.getItem('mockDB_reports') || '[]');
  },
  
  saveReport(data) {
    const reports = this.getReports();
    const report = {
      id: Date.now(),
      ...data,
      created_at: new Date().toISOString()
    };
    reports.push(report);
    localStorage.setItem('mockDB_reports', JSON.stringify(reports));
    return report;
  },
  
  getStats() {
    const reports = this.getReports();
    return {
      usersStarted: reports.length,
      reportsCompleted: reports.length
    };
  }
};

// Override API functions
window.originalFetch = window.fetch;
window.fetch = async function(url, options = {}) {
  const urlStr = typeof url === 'string' ? url : url.toString();
  
  // Handle stats API
  if (urlStr.includes('/api/stats')) {
    return {
      ok: true,
      json: async () => mockDB.getStats()
    };
  }
  
  // Handle tables API - GET
  if (urlStr.includes('/api/tables/reports') && options.method !== 'POST') {
    const reports = mockDB.getReports();
    return {
      ok: true,
      json: async () => ({
        data: reports.slice(0, 1000),
        total: reports.length,
        page: 1,
        totalPages: 1
      })
    };
  }
  
  // Handle tables API - POST (create report)
  if (urlStr.includes('/api/tables/reports') && options.method === 'POST') {
    try {
      const data = JSON.parse(options.body);
      const report = mockDB.saveReport(data);
      return {
        ok: true,
        json: async () => ({ success: true, data: report })
      };
    } catch (e) {
      return {
        ok: false,
        json: async () => ({ error: e.message })
      };
    }
  }
  
  // Fallback to original fetch for other requests
  return window.originalFetch(url, options);
};

console.log('✅ GitHub Pages Mock API activated - using localStorage');
