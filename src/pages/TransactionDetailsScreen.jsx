import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import paymentService from '../utils/paymentService';
import Button from '../components/ui/Button';

export default function TransactionDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && id) {
      loadPayment();
    } else if (!user) {
      // Preview mode - show mock data
      setPayment({
        id: '1',
        amount: 1250.00,
        receiver: 'John Doe',
        status: 'success',
        payment_method: 'credit_card',
        transaction_id: 'TXN001',
        description: 'Payment for services',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_profiles: { 
          full_name: 'Admin User',
          email: 'admin@payment.com'
        }
      });
      setLoading(false);
    }
  }, [id, user]);

  const loadPayment = async () => {
    try {
      setLoading(true);
      const result = await paymentService.getPayment(id);
      
      if (result.success) {
        setPayment(result.data);
      } else {
        setError(result.error || 'Failed to load payment details');
      }
    } catch (err) {
      setError('Failed to load payment details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      success: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const isPreviewMode = !user;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading payment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
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
          <div className="mt-4">
            <Button onClick={() => navigate('/transactions')} variant="outline">
              Back to Transactions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Payment Not Found</h2>
            <p className="mt-2 text-gray-600">The requested payment could not be found.</p>
            <div className="mt-4">
              <Button onClick={() => navigate('/transactions')} variant="outline">
                Back to Transactions
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Transaction Details
              </h1>
              {isPreviewMode && (
                <div className="mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                  Preview Mode - Sample transaction data
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <Button onClick={() => navigate('/transactions')} variant="outline">
                Back to Transactions
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {/* Payment Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Payment to {payment?.receiver}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Transaction ID: {payment?.transaction_id}
                  </p>
                </div>
                {getStatusBadge(payment?.status)}
              </div>

              {/* Payment Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Amount</dt>
                    <dd className="mt-1 text-3xl font-bold text-gray-900">
                      ${payment?.amount?.toLocaleString?.() || '0.00'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Receiver</dt>
                    <dd className="mt-1 text-lg text-gray-900">{payment?.receiver}</dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                    <dd className="mt-1 text-lg text-gray-900 capitalize">
                      {payment?.payment_method?.replace?.('_', ' ') || 'N/A'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1">
                      {getStatusBadge(payment?.status)}
                    </dd>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created By</dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {payment?.user_profiles?.full_name || 'Unknown'}
                    </dd>
                    <dd className="text-sm text-gray-500">
                      {payment?.user_profiles?.email || 'No email'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Created At</dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {payment?.created_at ? new Date(payment.created_at).toLocaleDateString() : 'N/A'}
                    </dd>
                    <dd className="text-sm text-gray-500">
                      {payment?.created_at ? new Date(payment.created_at).toLocaleTimeString() : ''}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-lg text-gray-900">
                      {payment?.updated_at ? new Date(payment.updated_at).toLocaleDateString() : 'N/A'}
                    </dd>
                    <dd className="text-sm text-gray-500">
                      {payment?.updated_at ? new Date(payment.updated_at).toLocaleTimeString() : ''}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Transaction ID</dt>
                    <dd className="mt-1 text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {payment?.transaction_id || 'N/A'}
                    </dd>
                  </div>
                </div>
              </div>

              {/* Description */}
              {payment?.description && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-2 text-gray-900">
                    {payment.description}
                  </dd>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <Button onClick={() => navigate('/transactions')} variant="outline">
                    Back to Transactions
                  </Button>
                  {!isPreviewMode && (
                    <Button onClick={() => navigate('/add-payment')}>
                      Create New Payment
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}