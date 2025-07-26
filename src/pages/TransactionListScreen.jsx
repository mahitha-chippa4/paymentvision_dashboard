import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import paymentService from '../utils/paymentService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function TransactionListScreen() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    payment_method: 'all',
    date_from: '',
    date_to: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const limit = 10;

  useEffect(() => {
    loadPayments();
  }, [filters, currentPage]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const result = await paymentService.getPayments(filters, currentPage, limit);
      
      if (result.success) {
        setPayments(result.data || []);
        setHasMore(result.hasMore || false);
      } else {
        setError(result.error || 'Failed to load transactions');
      }
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const getStatusBadge = (status) => {
    const colors = {
      success: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getMethodBadge = (method) => {
    const colors = {
      credit_card: 'bg-blue-100 text-blue-800',
      debit_card: 'bg-purple-100 text-purple-800',
      bank_transfer: 'bg-indigo-100 text-indigo-800',
      paypal: 'bg-orange-100 text-orange-800',
      crypto: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[method] || 'bg-gray-100 text-gray-800'}`}>
        {method?.replace('_', ' ')}
      </span>
    );
  };

  // Development preview mode - show mock data if not authenticated
  const isPreviewMode = !user;
  const mockPayments = [
    {
      id: '1',
      amount: 1250.00,
      receiver: 'John Doe',
      status: 'success',
      payment_method: 'credit_card',
      created_at: new Date().toISOString(),
      user_profiles: { full_name: 'Admin User' }
    },
    {
      id: '2',
      amount: 750.50,
      receiver: 'Jane Smith',
      status: 'pending',
      payment_method: 'bank_transfer',
      created_at: new Date(Date.now() - 86400000).toISOString(),
      user_profiles: { full_name: 'Regular User' }
    }
  ];

  const displayPayments = isPreviewMode ? mockPayments : payments;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
              {isPreviewMode && (
                <div className="mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                  Preview Mode - Sign in to view your transactions
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Back to Dashboard
              </Button>
              <Button onClick={() => navigate('/add-payment')}>
                Add Payment
              </Button>
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

      {/* Filters */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Filter Transactions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isPreviewMode}
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={filters.payment_method}
                  onChange={(e) => handleFilterChange('payment_method', e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={isPreviewMode}
                >
                  <option value="all">All Methods</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="crypto">Crypto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <Input
                  type="date"
                  value={filters.date_from}
                  onChange={(e) => handleFilterChange('date_from', e.target.value)}
                  disabled={isPreviewMode}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <Input
                  type="date"
                  value={filters.date_to}
                  onChange={(e) => handleFilterChange('date_to', e.target.value)}
                  disabled={isPreviewMode}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Transactions
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {isPreviewMode ? 'Sample transaction data' : 'Your transaction history'}
            </p>
          </div>
          
          {loading && !isPreviewMode ? (
            <div className="px-4 py-6 text-center">
              <div className="text-lg">Loading transactions...</div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {displayPayments?.map?.((payment) => (
                <li key={payment?.id}>
                  <div 
                    className="px-4 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => !isPreviewMode && navigate(`/transaction/${payment?.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {payment?.receiver?.charAt?.(0) || '?'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900">
                              {payment?.receiver}
                            </p>
                            {getStatusBadge(payment?.status)}
                          </div>
                          <p className="text-sm text-gray-500">
                            {payment?.user_profiles?.full_name} • {new Date(payment?.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getMethodBadge(payment?.payment_method)}
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${payment?.amount?.toLocaleString?.() || '0.00'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {payment?.transaction_id || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                    {payment?.description && (
                      <div className="mt-2 ml-14">
                        <p className="text-sm text-gray-600">{payment?.description}</p>
                      </div>
                    )}
                  </div>
                </li>
              )) || []}
              
              {(!displayPayments || displayPayments?.length === 0) && (
                <li className="px-4 py-6 text-center text-gray-500">
                  No transactions found
                </li>
              )}
            </ul>
          )}

          {/* Pagination */}
          {!isPreviewMode && displayPayments?.length > 0 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!hasMore}
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="rounded-l-md"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={!hasMore}
                      className="rounded-r-md"
                    >
                      Next
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}