import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import GlobalAlertBanner from '../../components/ui/GlobalAlertBanner';
import QuickActionToolbar from '../../components/ui/QuickActionToolbar';
import GlobalTimeRangeSelector from '../../components/ui/GlobalTimeRangeSelector';
import FraudMetricsCards from './components/FraudMetricsCards';
import GeographicRiskMap from './components/GeographicRiskMap';
import HighRiskTransactionQueue from './components/HighRiskTransactionQueue';
import TransactionTimelineChart from './components/TransactionTimelineChart';
import RiskLevelFilter from './components/RiskLevelFilter';
import Icon from '../../components/AppIcon';

const TransactionMonitoringFraudDetectionDashboard = () => {
  const [filters, setFilters] = useState({
    riskLevel: 'all',
    region: 'all',
    alertStatus: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
    // In real implementation, this would trigger data refresh with new filters
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <GlobalAlertBanner />
        
        <main className="pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Loading skeleton */}
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-96 bg-muted rounded-lg"></div>
                <div className="h-96 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <GlobalAlertBanner />
      
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-error/10 rounded-lg">
                  <Icon name="Shield" size={24} className="text-error" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Transaction Monitoring & Fraud Detection
                  </h1>
                  <p className="text-muted-foreground">
                    Real-time fraud detection and risk analysis dashboard
                  </p>
                </div>
              </div>
              
              {/* Critical Alert Summary */}
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
                  <span className="text-error font-medium">3 Critical Alerts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span className="text-warning font-medium">12 High-Risk Transactions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-success font-medium">94.7% Detection Rate</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <GlobalTimeRangeSelector />
              <QuickActionToolbar />
            </div>
          </div>

          {/* Risk Level Filter */}
          <div className="mb-8">
            <RiskLevelFilter onFilterChange={handleFilterChange} />
          </div>

          {/* Fraud Metrics Cards */}
          <div className="mb-8">
            <FraudMetricsCards />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 mb-8">
            {/* Geographic Risk Map */}
            <div className="xl:col-span-3">
              <GeographicRiskMap />
            </div>

            {/* High-Risk Transaction Queue */}
            <div className="xl:col-span-2">
              <HighRiskTransactionQueue />
            </div>
          </div>

          {/* Transaction Timeline Chart */}
          <div className="mb-8">
            <TransactionTimelineChart />
          </div>

          {/* Additional Risk Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Risk Score Distribution */}
            <div className="bg-card border border-border rounded-lg p-6 card-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="PieChart" size={20} className="text-accent" />
                <div>
                  <h3 className="font-semibold text-sm text-card-foreground">
                    Risk Score Distribution
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Current transaction risk levels
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success rounded"></div>
                    <span className="text-sm">Low Risk (0-3)</span>
                  </div>
                  <span className="text-sm font-medium">78.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-warning rounded"></div>
                    <span className="text-sm">Medium Risk (3-6)</span>
                  </div>
                  <span className="text-sm font-medium">18.6%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-error rounded"></div>
                    <span className="text-sm">High Risk (6+)</span>
                  </div>
                  <span className="text-sm font-medium">3.2%</span>
                </div>
              </div>
            </div>

            {/* Top Risk Factors */}
            <div className="bg-card border border-border rounded-lg p-6 card-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
                <div>
                  <h3 className="font-semibold text-sm text-card-foreground">
                    Top Risk Factors
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Most common fraud indicators
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Velocity checks failed</span>
                  <span className="text-sm font-medium text-error">34%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Unusual transaction patterns</span>
                  <span className="text-sm font-medium text-warning">28%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">New device fingerprints</span>
                  <span className="text-sm font-medium text-warning">22%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cross-border transactions</span>
                  <span className="text-sm font-medium text-accent">16%</span>
                </div>
              </div>
            </div>

            {/* System Performance */}
            <div className="bg-card border border-border rounded-lg p-6 card-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Activity" size={20} className="text-success" />
                <div>
                  <h3 className="font-semibold text-sm text-card-foreground">
                    System Performance
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Real-time monitoring metrics
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Processing Speed</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-success">98ms</span>
                    <Icon name="TrendingUp" size={12} className="text-success" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Uptime</span>
                  <span className="text-sm font-medium text-success">99.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response Time</span>
                  <span className="text-sm font-medium text-success">45ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Queue Processing</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-success">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionMonitoringFraudDetectionDashboard;