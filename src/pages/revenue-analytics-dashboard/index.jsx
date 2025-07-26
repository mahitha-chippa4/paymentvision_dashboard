import React from 'react';
import Header from '../../components/ui/Header';
import GlobalAlertBanner from '../../components/ui/GlobalAlertBanner';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import GlobalTimeRangeSelector from '../../components/ui/GlobalTimeRangeSelector';
import DashboardControls from './components/DashboardControls';
import RevenueMetricsStrip from './components/RevenueMetricsStrip';
import RevenueChart from './components/RevenueChart';
import PaymentMethodBreakdown from './components/PaymentMethodBreakdown';
import RevenueForecastChart from './components/RevenueForecastChart';
import Icon from '../../components/AppIcon';

const RevenueAnalyticsDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Global Alert Banner */}
      <GlobalAlertBanner />
      
      {/* Main Content */}
      <main className="pt-16 px-6 pb-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name="TrendingUp" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Revenue Analytics Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive financial performance tracking and forecasting
                </p>
              </div>
            </div>
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>PaymentVision</span>
              <Icon name="ChevronRight" size={14} />
              <span>Analytics</span>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground">Revenue Analytics</span>
            </nav>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            <GlobalTimeRangeSelector />
            <QuickActionToolbar />
          </div>
        </div>

        {/* Dashboard Controls */}
        <DashboardControls />

        {/* Revenue Metrics Strip */}
        <RevenueMetricsStrip />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          {/* Revenue Chart - Main Content (8 cols) */}
          <div className="xl:col-span-8">
            <RevenueChart />
          </div>

          {/* Payment Method Breakdown - Right Panel (4 cols) */}
          <div className="xl:col-span-4">
            <PaymentMethodBreakdown />
          </div>
        </div>

        {/* Revenue Forecasting - Full Width */}
        <RevenueForecastChart />

        {/* Additional Insights Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Key Performance Indicators */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Target" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">KPI Summary</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Revenue Goal</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">$3.2M</div>
                  <div className="text-xs text-success">89% achieved</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transaction Volume</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">16.7K</div>
                  <div className="text-xs text-success">+15.2%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Customer LTV</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">$1,247</div>
                  <div className="text-xs text-success">+8.4%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Geographic Performance */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Globe" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Top Regions</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { region: 'North America', revenue: '$1.42M', share: '49.8%', growth: '+12.4%' },
                { region: 'Europe', revenue: '$852K', share: '29.9%', growth: '+18.7%' },
                { region: 'Asia Pacific', revenue: '$573K', share: '20.1%', growth: '+25.3%' }
              ].map((region, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <div>
                    <div className="text-sm font-medium text-foreground">{region.region}</div>
                    <div className="text-xs text-muted-foreground">{region.share} share</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{region.revenue}</div>
                    <div className="text-xs text-success">{region.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Activity" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { 
                  action: 'Large transaction processed', 
                  amount: '$45,230', 
                  time: '2 min ago',
                  type: 'success'
                },
                { 
                  action: 'Monthly report generated', 
                  amount: 'Q1 2025', 
                  time: '15 min ago',
                  type: 'info'
                },
                { 
                  action: 'Forecast model updated', 
                  amount: '94.2% accuracy', 
                  time: '1 hour ago',
                  type: 'info'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-muted/50 rounded">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-success' : 'bg-accent'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {activity.action}
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                  <div className="text-xs font-medium text-foreground">
                    {activity.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border text-center">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PaymentVision Dashboard. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Last updated: {new Date().toLocaleString()}</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default RevenueAnalyticsDashboard;