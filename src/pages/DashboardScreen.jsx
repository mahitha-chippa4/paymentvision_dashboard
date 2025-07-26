import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import paymentService from '../utils/paymentService';
import Button from '../components/ui/Button';

export default function DashboardScreen() {
  const { user, userProfile, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_payments_today: 0,
    total_payments_week: 0,
    total_revenue: 0,
    failed_transactions: 0,
    revenue_by_day: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const result = await paymentService.getPaymentStats();
      
      if (result.success) {
        setStats(result.data || stats);
      } else {
        setError(result.error || 'Failed to load statistics');
      }
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.log('Sign out error:', err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  // Development preview mode - show content even if not authenticated
  const isPreviewMode = !user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Payment Dashboard
              </h1>
              {isPreviewMode && (
                <div className="mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                  Preview Mode - Full functionality available after login
                </div>
              )}
              {user && (
                <p className="text-sm text-gray-600 mt-1">
                  Welcome back, {userProfile?.full_name || user?.email}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              {user ? (
                <Button onClick={handleSignOut} variant="outline">
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate('/login')} variant="outline">
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/signup')}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mx-4 mt-4 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button
            type="button"
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => navigator.clipboard.writeText(error)}
          >
            <span className="sr-only">Copy error</span>
            📋
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Payments Today
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats?.total_payments_today || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">📈</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        This Week
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats?.total_payments_week || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">💰</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Revenue
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        ${stats?.total_revenue?.toLocaleString() || '0.00'}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">❌</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Failed Transactions
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats?.failed_transactions || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Revenue Over Last 7 Days
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats?.revenue_by_day || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Revenue']}
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button 
                  onClick={() => navigate('/transactions')}
                  className="w-full"
                >
                  View All Transactions
                </Button>
                <Button 
                  onClick={() => navigate('/add-payment')}
                  className="w-full"
                >
                  Add New Payment
                </Button>
                <Button 
                  onClick={() => navigate('/users')}
                  variant="outline"
                  className="w-full"
                >
                  Manage Users
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}