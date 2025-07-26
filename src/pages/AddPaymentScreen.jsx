import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import paymentService from '../utils/paymentService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function AddPaymentScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    receiver: '',
    payment_method: 'credit_card',
    status: 'pending',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please sign in to add payments');
      return;
    }

    if (!formData.amount || !formData.receiver) {
      setError('Amount and receiver are required');
      return;
    }

    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const paymentData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      const result = await paymentService.createPayment(paymentData);
      
      if (result.success) {
        setSuccess('Payment created successfully!');
        setTimeout(() => {
          navigate('/transactions');
        }, 2000);
      } else {
        setError(result.error || 'Failed to create payment');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isPreviewMode = !user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Payment</h1>
              {isPreviewMode && (
                <div className="mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                  Preview Mode - Sign in to create actual payments
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline">
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Payment Information
              </h2>

              {/* Success Message */}
              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                  {success}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
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

              {/* Preview Mode Banner */}
              {isPreviewMode && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-yellow-400">⚠️</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">
                        This is preview mode. <strong>Sign in</strong> to create actual payments.
                      </p>
                      <div className="mt-2">
                        <Button
                          onClick={() => navigate('/login')}
                          size="sm"
                          className="mr-2"
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={() => navigate('/signup')}
                          variant="outline"
                          size="sm"
                        >
                          Sign Up
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount ($) *
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      required
                      disabled={isPreviewMode}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="receiver" className="block text-sm font-medium text-gray-700">
                      Receiver *
                    </label>
                    <Input
                      type="text"
                      id="receiver"
                      name="receiver"
                      value={formData.receiver}
                      onChange={handleChange}
                      placeholder="Recipient name"
                      required
                      disabled={isPreviewMode}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700">
                      Payment Method *
                    </label>
                    <select
                      id="payment_method"
                      name="payment_method"
                      value={formData.payment_method}
                      onChange={handleChange}
                      required
                      disabled={isPreviewMode}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="credit_card">Credit Card</option>
                      <option value="debit_card">Debit Card</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="paypal">PayPal</option>
                      <option value="crypto">Cryptocurrency</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      disabled={isPreviewMode}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="success">Success</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Optional description or notes"
                    disabled={isPreviewMode}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/transactions')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || isPreviewMode}
                    className="disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Payment'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}