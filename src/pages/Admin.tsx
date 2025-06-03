
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '@/components/AdminDashboard';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated as admin
    // This is a placeholder - in real implementation, check JWT token or session
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken === 'hell-admin-authenticated') {
      setIsAuthenticated(true);
    } else {
      // Redirect to admin login
      navigate('/admin/login');
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-volcanic-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-inferno-500 mx-auto mb-4"></div>
          <p className="text-volcanic-600">Lade höllisches Portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <AdminDashboard />;
};

export default Admin;
