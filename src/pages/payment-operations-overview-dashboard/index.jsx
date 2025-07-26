import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import GlobalAlertBanner from '../../components/ui/GlobalAlertBanner';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import GlobalTimeRangeSelector from '../../components/ui/GlobalTimeRangeSelector';
import KPIMetricCard from './components/KPIMetricCard';
import RealTimeTransactionChart from './components/RealTimeTransactionChart';
import LiveTransactionFeed from './components/LiveTransactionFeed';
import PaymentMethodPerformance from './components/PaymentMethodPerformance';
import DashboardFilters from './components/DashboardFilters';
import Icon from '../../components/AppIcon';

const PaymentOperationsOverviewDashboard = () => {
  const [dashboardFilters, setDashboardFilters] = useState({
    dateRange: '24h',
    paymentMethod: 'all',
    currency: 'USD',
    region: 'all',
    status: 'all'
  });

  const [kpiData, setKpiData] = useState({
    totalVolume: { value: 47832, trend: 'up', trendValue: '+12.5%' },
    successRate: { value: 94.8, trend: 'up', trendValue: '+2.1%' },
    totalRevenue: { value: 8.4, trend: 'up', trendValue: '+18.3%' },
    avgProcessingTime: { value: 1247, trend: 'down', trendValue: '-8.2%' }
  });

  // Mock sparkline data for KPI cards
  const generateSparklineData = () => {
    return Array.from({ length: 24 }, () => Math.floor(Math.random() * 100) + 20);
  };

  const handleFiltersChange = (newFilters) => {
    setDashboardFilters(newFilters);
    // In real implementation, this would trigger data refresh
    console.log('Filters updated:', newFilters);
  };

  // Simulate real-time KPI updates
  useEffect(() => {
    const interval = setInterval(() => {
      setKpiData(prev => ({
        totalVolume: {
          ...prev.totalVolume,
          value: prev.totalVolume.value + Math.floor(Math.random() * 10) - 5
        },
        successRate: {
          ...prev.successRate,
          value: Math.max(90, Math.min(99, prev.successRate.value + (Math.random() - 0.5) * 0.5))
        },
        totalRevenue: {
          ...prev.totalRevenue,
          value: prev.totalRevenue.value + (Math.random() - 0.5) * 0.2
        },
        avgProcessingTime: {
          ...prev.avgProcessingTime,
          value: Math.max(800, Math.min(2000, prev.avgProcessingTime.value + Math.floor(Math.random() * 100) - 50))
        }
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <GlobalAlertBanner />
      
      <main className="pt-16">
        <div className="max-w-[1920px] mx-auto p-6">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Payment Operations Overview</h1>
              <p className="text-muted-foreground mt-1">
                Real-time monitoring of payment ecosystem health and performance metrics
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <GlobalTimeRangeSelector />
              <QuickActionToolbar />
            </div>
          </div>

          {/* Dashboard Filters */}
          <DashboardFilters onFiltersChange={handleFiltersChange} />

          {/* KPI Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <KPIMetricCard
              title="Total Transaction Volume"
              value={kpiData.totalVolume.value.toLocaleString()}
              unit="transactions"
              trend={kpiData.totalVolume.trend}
              trendValue={kpiData.totalVolume.trendValue}
              sparklineData={generateSparklineData()}
              icon="TrendingUp"
              color="primary"
              onClick={() => console.log('Navigate to transaction details')}
            />
            
            <KPIMetricCard
              title="Success Rate"
              value={kpiData.successRate.value.toFixed(1)}
              unit="%"
              trend={kpiData.successRate.trend}
              trendValue={kpiData.successRate.trendValue}
              sparklineData={generateSparklineData()}
              icon="CheckCircle"
              color="success"
              onClick={() => console.log('Navigate to success rate analysis')}
            />
            
            <KPIMetricCard
              title="Total Revenue"
              value={kpiData.totalRevenue.value.toFixed(1)}
              unit="M USD"
              trend={kpiData.totalRevenue.trend}
              trendValue={kpiData.totalRevenue.trendValue}
              sparklineData={generateSparklineData()}
              icon="DollarSign"
              color="success"
              onClick={() => console.log('Navigate to revenue analytics')}
            />
            
            <KPIMetricCard
              title="Avg Processing Time"
              value={Math.round(kpiData.avgProcessingTime.value)}
              unit="ms"
              trend={kpiData.avgProcessingTime.trend}
              trendValue={kpiData.avgProcessingTime.trendValue}
              sparklineData={generateSparklineData()}
              icon="Clock"
              color={kpiData.avgProcessingTime.value < 1000 ? 'success' : kpiData.avgProcessingTime.value < 1500 ? 'warning' : 'error'}
              onClick={() => console.log('Navigate to performance analysis')}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Real-time Transaction Chart - Takes 2/3 width on desktop */}
            <div className="xl:col-span-2">
              <RealTimeTransactionChart />
            </div>
            
            {/* Live Transaction Feed - Takes 1/3 width on desktop */}
            <div className="xl:col-span-1">
              <LiveTransactionFeed />
            </div>
          </div>

          {/* Payment Method Performance */}
          <div className="mb-8">
            <PaymentMethodPerformance />
          </div>

          {/* System Status Footer */}
          <div className="bg-card border border-border rounded-lg p-6 card-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">System Status: Operational</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  All payment gateways are functioning normally
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Server" size={16} />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={16} />
                  <span>847ms Avg Response</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={16} />
                  <span>0 Security Incidents</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="RefreshCw" size={16} className="animate-spin" />
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentOperationsOverviewDashboard;