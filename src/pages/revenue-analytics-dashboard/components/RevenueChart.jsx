import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [selectedSegment, setSelectedSegment] = useState('all');

  const chartData = [
    {
      date: 'Jan 20',
      dailyRevenue: 45000,
      cumulativeRevenue: 45000,
      transactions: 320,
      avgValue: 140.63
    },
    {
      date: 'Jan 21',
      dailyRevenue: 52000,
      cumulativeRevenue: 97000,
      transactions: 385,
      avgValue: 135.06
    },
    {
      date: 'Jan 22',
      dailyRevenue: 48000,
      cumulativeRevenue: 145000,
      transactions: 356,
      avgValue: 134.83
    },
    {
      date: 'Jan 23',
      dailyRevenue: 61000,
      cumulativeRevenue: 206000,
      transactions: 442,
      avgValue: 138.01
    },
    {
      date: 'Jan 24',
      dailyRevenue: 58000,
      cumulativeRevenue: 264000,
      transactions: 418,
      avgValue: 138.76
    },
    {
      date: 'Jan 25',
      dailyRevenue: 67000,
      cumulativeRevenue: 331000,
      transactions: 485,
      avgValue: 138.14
    },
    {
      date: 'Jan 26',
      dailyRevenue: 72000,
      cumulativeRevenue: 403000,
      transactions: 521,
      avgValue: 138.20
    }
  ];

  const periodOptions = [
    { value: 'daily', label: 'Daily', icon: 'Calendar' },
    { value: 'weekly', label: 'Weekly', icon: 'CalendarDays' },
    { value: 'monthly', label: 'Monthly', icon: 'CalendarRange' }
  ];

  const segmentOptions = [
    { value: 'all', label: 'All Segments' },
    { value: 'geography', label: 'By Geography' },
    { value: 'payment-method', label: 'By Payment Method' },
    { value: 'customer-segment', label: 'By Customer Segment' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium text-popover-foreground">
                {entry.name.includes('Revenue') 
                  ? `$${entry.value.toLocaleString()}`
                  : entry.value.toLocaleString()
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Revenue Trends</h2>
          <p className="text-sm text-muted-foreground">
            Daily revenue with cumulative performance
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Period Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {periodOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedPeriod === option.value ? 'default' : 'ghost'}
                size="sm"
                iconName={option.icon}
                onClick={() => setSelectedPeriod(option.value)}
                className="text-xs"
              >
                <span className="hidden lg:inline ml-1">{option.label}</span>
              </Button>
            ))}
          </div>

          {/* Drill-down Options */}
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {segmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Bar
              yAxisId="left"
              dataKey="dailyRevenue"
              name="Daily Revenue"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cumulativeRevenue"
              name="Cumulative Revenue"
              stroke="var(--color-accent)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">$403K</div>
          <div className="text-xs text-muted-foreground">Total Period Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-success">+18.7%</div>
          <div className="text-xs text-muted-foreground">Growth vs Previous</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">$57.6K</div>
          <div className="text-xs text-muted-foreground">Daily Average</div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;