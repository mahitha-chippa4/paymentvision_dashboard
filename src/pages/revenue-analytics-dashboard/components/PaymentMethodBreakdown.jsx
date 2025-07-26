import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethodBreakdown = () => {
  const [viewMode, setViewMode] = useState('revenue');

  const paymentData = [
    {
      method: 'Credit Cards',
      revenue: 1420000,
      percentage: 49.8,
      transactions: 8420,
      avgValue: 168.65,
      growth: '+15.2%',
      color: '#1E3A8A',
      icon: 'CreditCard'
    },
    {
      method: 'Digital Wallets',
      revenue: 852000,
      percentage: 29.9,
      transactions: 6180,
      avgValue: 137.86,
      growth: '+22.4%',
      color: '#0EA5E9',
      icon: 'Smartphone'
    },
    {
      method: 'Bank Transfers',
      revenue: 426000,
      percentage: 15.0,
      transactions: 1240,
      avgValue: 343.55,
      growth: '+8.7%',
      color: '#059669',
      icon: 'Building2'
    },
    {
      method: 'Buy Now Pay Later',
      revenue: 149392,
      percentage: 5.3,
      transactions: 890,
      avgValue: 167.86,
      growth: '+45.1%',
      color: '#D97706',
      icon: 'Calendar'
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={data.icon} size={16} className="text-primary" />
            <span className="font-medium text-popover-foreground">{data.method}</span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue:</span>
              <span className="font-medium">${data.revenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Share:</span>
              <span className="font-medium">{data.percentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transactions:</span>
              <span className="font-medium">{data.transactions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Value:</span>
              <span className="font-medium">${data.avgValue}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Payment Method Performance</h2>
          <p className="text-sm text-muted-foreground">
            Revenue breakdown and performance rankings
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'revenue' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('revenue')}
            className="text-xs"
          >
            Revenue
          </Button>
          <Button
            variant={viewMode === 'transactions' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('transactions')}
            className="text-xs"
          >
            Volume
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={paymentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey={viewMode === 'revenue' ? 'revenue' : 'transactions'}
            >
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Rankings */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground mb-3">Performance Rankings</h3>
        
        {paymentData.map((method, index) => (
          <div
            key={method.method}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground w-4">
                  #{index + 1}
                </span>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: method.color }}
                ></div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name={method.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {method.method}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-right">
              <div>
                <div className="text-sm font-medium text-foreground">
                  {viewMode === 'revenue' 
                    ? `$${(method.revenue / 1000).toFixed(0)}K`
                    : `${method.transactions.toLocaleString()}`
                  }
                </div>
                <div className="text-xs text-muted-foreground">
                  {method.percentage}% share
                </div>
              </div>
              
              <div className="text-xs text-success font-medium">
                {method.growth}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">4</div>
          <div className="text-xs text-muted-foreground">Active Methods</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-success">+18.2%</div>
          <div className="text-xs text-muted-foreground">Avg Growth</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodBreakdown;