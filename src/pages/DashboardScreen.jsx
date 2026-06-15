import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
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
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-medium animate-pulse">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  // Development preview mode - show content even if not authenticated
  const isPreviewMode = !user;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-background/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-glow">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Payment<span className="text-primary">Vision</span>
                </h1>
                {user && (
                  <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                    {userProfile?.full_name || 'Dashboard Overview'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {isPreviewMode && (
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded-full font-medium">
                  Preview Mode
                </div>
              )}
              {user ? (
                <Button onClick={handleSignOut} variant="outline" className="text-sm border-slate-700 hover:bg-slate-800 text-slate-300">
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate('/login')} variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300">
                    Sign In
                  </Button>
                  <Button onClick={() => navigate('/signup')} className="bg-primary hover:bg-primary/90 shadow-glow">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg relative flex items-center justify-between">
            <span className="block sm:inline">{error}</span>
            <button
              type="button"
              className="ml-4 text-red-400 hover:text-red-300 transition-colors"
              onClick={() => navigator.clipboard.writeText(error)}
            >
              <span className="sr-only">Copy error</span>
              📋
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* Card 1 */}
          <div className="group relative bg-card border border-white/5 rounded-2xl p-6 shadow-card hover:border-primary/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+12%</span>
              </div>
              <p className="text-sm font-medium text-slate-400">Payments Today</p>
              <h3 className="text-3xl font-bold text-white mt-1 group-hover:text-primary transition-colors">
                {stats?.total_payments_today || 0}
              </h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-card border border-white/5 rounded-2xl p-6 shadow-card hover:border-emerald-500/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-emerald-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">+5%</span>
              </div>
              <p className="text-sm font-medium text-slate-400">Weekly Volume</p>
              <h3 className="text-3xl font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">
                {stats?.total_payments_week || 0}
              </h3>
            </div>
          </div>

          {/* Card 3 - Revenue */}
          <div className="group relative bg-card border border-white/5 rounded-2xl p-6 shadow-card hover:border-amber-400/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05 1.18 1.91 2.53 1.91 1.33 0 2.33-.83 2.33-1.94 0-1.03-1.09-1.59-2.1-2.03l-1.3-.59c-1.04-.45-2.55-1.12-2.55-3.1 0-1.85 1.4-2.92 2.94-3.28V4h2.7v1.9c1.5.3 2.76 1.3 2.87 3h-1.99c-.06-.92-1.04-1.54-2.16-1.54-1.16 0-1.94.71-1.94 1.73 0 1.05 1.05 1.35 2.05 1.8l1.45.69c1.07.49 2.59 1.13 2.59 3.12 0 1.95-1.55 3.13-3.3 3.39z" /></svg>
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-400">Total Revenue</p>
              <h3 className="text-3xl font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">
                ${stats?.total_revenue?.toLocaleString() || '0.00'}
              </h3>
            </div>
          </div>

          {/* Card 4 - Failed */}
          <div className="group relative bg-card border border-white/5 rounded-2xl p-6 shadow-card hover:border-red-500/50 transition-all duration-300 overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 border border-red-500/20 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Action Req</span>
              </div>
              <p className="text-sm font-medium text-slate-400">Failed Transactions</p>
              <h3 className="text-3xl font-bold text-white mt-1 group-hover:text-red-400 transition-colors">
                {stats?.failed_transactions || 0}
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-card border border-white/5 rounded-2xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                Revenue Trend
              </h3>
              <select className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-primary focus:border-primary p-2">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.revenue_by_day || []}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { weekday: 'short' })}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    tickFormatter={(value) => `$${value}`}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-white/5 rounded-2xl p-6 shadow-card flex flex-col h-full">
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Actions
            </h3>
            <div className="flex-1 space-y-4">
              <button
                onClick={() => navigate('/transactions')}
                className="w-full text-left group p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800 hover:border-primary/50 transition-all duration-200 flex items-center"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors">All Transactions</h4>
                  <p className="text-xs text-slate-400">View and manage history</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </button>

              <button
                onClick={() => navigate('/add-payment')}
                className="w-full text-left group p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-200 flex items-center"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">New Payment</h4>
                  <p className="text-xs text-slate-400">Process a transaction</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </button>

              <button
                onClick={() => navigate('/users')}
                className="w-full text-left group p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800 hover:border-purple-500/50 transition-all duration-200 flex items-center"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mr-4 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">Manage Users</h4>
                  <p className="text-xs text-slate-400">Admin controls</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}