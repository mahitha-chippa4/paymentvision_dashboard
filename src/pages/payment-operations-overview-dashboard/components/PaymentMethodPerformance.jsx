import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethodPerformance = () => {
  const [viewType, setViewType] = useState('bar');
  const [selectedPeriod, setSelectedPeriod] = useState('24h');

  // Mock payment method performance data
  const paymentMethodData = [
    {
      method: 'Credit Card',
      volume: 15420,
      successRate: 94.2,
      revenue: 2840000,
      avgProcessingTime: 1200,
      icon: 'CreditCard',
      color: '#3B82F6'
    },
    {
      method: 'PayPal',
      volume: 8930,
      successRate: 96.8,
      revenue: 1650000,
      avgProcessingTime: 800,
      icon: 'Wallet',
      color: '#10B981'
    },
    {
      method: 'Bank Transfer',
      volume: 4560,
      successRate: 98.1,
      revenue: 890000,
      avgProcessingTime: 2400,
      icon: 'Building2',
      color: '#8B5CF6'
    },
    {
      method: 'Digital Wallet',
      volume: 6780,
      successRate: 95.5,
      revenue: 1230000,
      avgProcessingTime: 600,
      icon: 'Smartphone',
      color: '#F59E0B'
    },
    {
      method: 'Cryptocurrency',
      volume: 1240,
      successRate: 92.3,
      revenue: 340000,
      avgProcessingTime: 3600,
      icon: 'Coins',
      color: '#EF4444'
    }
  ];

  const periods = [
    { key: '1h', label: '1 Hour' },
    { key: '24h', label: '24 Hours' },
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name={data.icon} size={16} className="text-muted-foreground" />
            <span className="font-medium text-popover-foreground">{data.method}</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Volume:</span>
              <span className="font-medium">{data.volume.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Success Rate:</span>
              <span className="font-medium">{data.successRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-medium">${data.revenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Time:</span>
              <span className="font-medium">{data.avgProcessingTime}ms</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            />
            <span className="font-medium text-popover-foreground">{data.method}</span>
          </div>
          <div className="text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Volume:</span>
              <span className="font-medium">{data.volume.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Share:</span>
              <span className="font-medium">{((data.volume / paymentMethodData.reduce((sum, item) => sum + item.volume, 0)) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Payment Method Performance</h2>
          <p className="text-sm text-muted-foreground">Success rates and volume comparison</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Period Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {periods.map((period) => (
              <Button
                key={period.key}
                variant={selectedPeriod === period.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(period.key)}
                className="text-xs"
              >
                {period.label}
              </Button>
            ))}
          </div>

          {/* View Type Toggle */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewType === 'bar' ? 'default' : 'ghost'}
              size="sm"
              iconName="BarChart3"
              onClick={() => setViewType('bar')}
            />
            <Button
              variant={viewType === 'pie' ? 'default' : 'ghost'}
              size="sm"
              iconName="PieChart"
              onClick={() => setViewType('pie')}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Visualization */}
        <div className="lg:col-span-2">
          <div className="h-80">
            {viewType === 'bar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentMethodData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="method" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="successRate" 
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="volume"
                    label={({ method, percent }) => `${method} ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">Performance Summary</h3>
          
          {paymentMethodData.map((method, index) => (
            <div key={method.method} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={method.icon} size={16} className="text-muted-foreground" />
                  <span className="font-medium text-sm">{method.method}</span>
                </div>
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: method.color }}
                />
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume:</span>
                  <span className="font-medium">{method.volume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success Rate:</span>
                  <span className={`font-medium ${method.successRate >= 95 ? 'text-success' : method.successRate >= 90 ? 'text-warning' : 'text-error'}`}>
                    {method.successRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue:</span>
                  <span className="font-medium">${(method.revenue / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Time:</span>
                  <span className={`font-medium ${method.avgProcessingTime <= 1000 ? 'text-success' : method.avgProcessingTime <= 2000 ? 'text-warning' : 'text-error'}`}>
                    {method.avgProcessingTime}ms
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {paymentMethodData.reduce((sum, method) => sum + method.volume, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {(paymentMethodData.reduce((sum, method) => sum + (method.successRate * method.volume), 0) / paymentMethodData.reduce((sum, method) => sum + method.volume, 0)).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              ${(paymentMethodData.reduce((sum, method) => sum + method.revenue, 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {Math.round(paymentMethodData.reduce((sum, method) => sum + (method.avgProcessingTime * method.volume), 0) / paymentMethodData.reduce((sum, method) => sum + method.volume, 0))}ms
            </div>
            <div className="text-sm text-muted-foreground">Avg Processing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodPerformance;