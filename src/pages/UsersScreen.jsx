import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';
import Button from '../components/ui/Button';

export default function UsersScreen() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadUsers();
    } else {
      // Preview mode - show mock data
      setUsers([
        {
          id: '1',
          user_profiles: {
            full_name: 'Admin User',
            email: 'admin@payment.com',
            role: 'admin'
          },
          department: 'Administration',
          hire_date: '2023-01-15',
          is_active: true
        },
        {
          id: '2',
          user_profiles: {
            full_name: 'Regular User',
            email: 'user@payment.com',
            role: 'member'
          },
          department: 'Operations',
          hire_date: '2023-06-01',
          is_active: true
        }
      ]);
      setLoading(false);
    }
  }, [user]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          user_profiles!users_user_profile_id_fkey(
            id,
            full_name,
            email,
            role
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setUsers(data || []);
      }
    } catch (err) {
      if (err?.message?.includes('Failed to fetch') || 
          err?.message?.includes('NetworkError')) {
        setError('Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.');
      } else {
        setError('Failed to load users');
      }
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      manager: 'bg-blue-100 text-blue-800',
      member: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role] || 'bg-gray-100 text-gray-800'}`}>
        {role}
      </span>
    );
  };

  const getStatusBadge = (isActive) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const isPreviewMode = !user;
  const isAdmin = userProfile?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              {isPreviewMode && (
                <div className="mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                  Preview Mode - Sign in as admin to manage users
                </div>
              )}
              {user && !isAdmin && (
                <div className="mt-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-md">
                  Admin access required to manage users
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

      {/* Access Denied for Non-Admins */}
      {user && !isAdmin && (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-6 rounded-lg text-center">
            <div className="mb-4">
              <span className="text-4xl">🔒</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Admin Access Required</h2>
            <p className="mb-4">You need administrator privileges to access user management.</p>
            <Button onClick={() => navigate('/dashboard')} variant="outline">
              Return to Dashboard
            </Button>
          </div>
        </div>
      )}

      {/* Main Content - Show for preview mode or admin users */}
      {(isPreviewMode || isAdmin) && (
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Users Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  System Users
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {isPreviewMode ? 'Sample user data' : 'Manage system users and their roles'}
                </p>
              </div>
              
              {loading && !isPreviewMode ? (
                <div className="px-4 py-6 text-center">
                  <div className="text-lg">Loading users...</div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {users?.map?.((userData) => (
                    <li key={userData?.id}>
                      <div className="px-4 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {userData?.user_profiles?.full_name?.charAt?.(0) || '?'}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium text-gray-900">
                                  {userData?.user_profiles?.full_name || 'Unknown'}
                                </p>
                                {getRoleBadge(userData?.user_profiles?.role)}
                                {getStatusBadge(userData?.is_active)}
                              </div>
                              <p className="text-sm text-gray-500">
                                {userData?.user_profiles?.email || 'No email'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                {userData?.department || 'No Department'}
                              </p>
                              <p className="text-sm text-gray-500">
                                Hired: {userData?.hire_date ? 
                                  new Date(userData.hire_date).toLocaleDateString() : 
                                  'N/A'
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )) || []}
                  
                  {(!users || users?.length === 0) && (
                    <li className="px-4 py-6 text-center text-gray-500">
                      No users found
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Action Buttons */}
            {(isPreviewMode || isAdmin) && (
              <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    User Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button 
                      disabled={isPreviewMode}
                      className="w-full disabled:opacity-50"
                    >
                      Add New User
                    </Button>
                    <Button 
                      variant="outline"
                      disabled={isPreviewMode}
                      className="w-full disabled:opacity-50"
                    >
                      Export Users
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                      className="w-full"
                    >
                      Back to Dashboard
                    </Button>
                  </div>
                  
                  {isPreviewMode && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Sign in as an admin to manage users
                      </p>
                      <Button onClick={() => navigate('/login')} size="sm">
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
}