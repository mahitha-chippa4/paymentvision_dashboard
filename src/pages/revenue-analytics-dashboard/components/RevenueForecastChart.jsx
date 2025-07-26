import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueForecastChart = () => {
  const [forecastPeriod, setForecastPeriod] = useState('30d');
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);

  const forecastData = [
    {
      date: 'Jan 20',
      actual: 45000,
      predicted: 44200,
      upperBound: 48500,
      lowerBound: 39900,
      variance: 1.8
    },
    {
      date: 'Jan 21',
      actual: 52000,
      predicted: 50800,
      upperBound: 55200,
      lowerBound: 46400,
      variance: 2.3
    },
    {
      date: 'Jan 22',
      actual: 48000,
      predicted: 49200,
      upperBound: 53100,
      lowerBound: 45300,
      variance: -2.4
    },
    {
      date: 'Jan 23',
      actual: 61000,
      predicted: 58500,
      upperBound: 62800,
      lowerBound: 54200,
      variance: 4.3
    },
    {
      date: 'Jan 24',
      actual: 58000,
      predicted: 59200,
      upperBound: 63500,
      lowerBound: 54900,
      variance: -2.0
    },
    {
      date: 'Jan 25',
      actual: null,
      predicted: 62800,
      upperBound: 67200,
      lowerBound: 58400,
      variance: null
    },
    {
      date: 'Jan 26',
      actual: null,
      predicted: 65400,
      upperBound: 70100,
      lowerBound: 60700,
      variance: null
    },
    {
      date: 'Jan 27',
      actual: null,
      predicted: 68200,
      upperBound: 73500,
      lowerBound: 62900,
      variance: null
    }
  ];

  const periodOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-4 shadow-modal">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            {data.actual && (
              <div className="flex items-center justify-between space-x-4">
                <span className="text-muted-foreground">Actual:</span>
                <span className="font-medium text-foreground">
                  ${data.actual.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between space-x-4">
              <span className="text-muted-foreground">Predicted:</span>
              <span className="font-medium text-accent">
                ${data.predicted.toLocaleString()}
              </span>
            </div>
            {showConfidenceBands && (
              <>
                <div className="flex items-center justify-between space-x-4">
                  <span className="text-muted-foreground">Upper Bound:</span>
                  <span className="font-medium text-success">
                    ${data.upperBound.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <span className="text-muted-foreground">Lower Bound:</span>
                  <span className="font-medium text-warning">
                    ${data.lowerBound.toLocaleString()}
                  </span>
                </div>
              </>
            )}
            {data.variance !== null && (
              <div className="flex items-center justify-between space-x-4 pt-2 border-t border-border">
                <span className="text-muted-foreground">Variance:</span>
                <span className={`font-medium ${data.variance >= 0 ? 'text-success' : 'text-error'}`}>
                  {data.variance >= 0 ? '+' : ''}{data.variance}%
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const calculateAccuracy = () => {
    const actualData = forecastData.filter(d => d.actual !== null);
    const totalVariance = actualData.reduce((sum, d) => sum + Math.abs(d.variance), 0);
    return (100 - (totalVariance / actualData.length)).toFixed(1);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Revenue Forecasting</h2>
          <p className="text-sm text-muted-foreground">
            Predicted vs actual performance with confidence intervals
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Forecast Period Selector */}
          <select
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Toggle Confidence Bands */}
          <Button
            variant={showConfidenceBands ? 'default' : 'outline'}
            size="sm"
            iconName="BarChart3"
            onClick={() => setShowConfidenceBands(!showConfidenceBands)}
            className="text-xs"
          >
            <span className="hidden lg:inline ml-1">Confidence Bands</span>
          </Button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={forecastData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {/* Confidence Bands */}
            {showConfidenceBands && (
              <>
                <Area
                  dataKey="upperBound"
                  stackId="1"
                  stroke="none"
                  fill="var(--color-success)"
                  fillOpacity={0.1}
                  name="Upper Confidence"
                />
                <Area
                  dataKey="lowerBound"
                  stackId="1"
                  stroke="none"
                  fill="var(--color-warning)"
                  fillOpacity={0.1}
                  name="Lower Confidence"
                />
              </>
            )}

            {/* Predicted Revenue Line */}
            <Line
              type="monotone"
              dataKey="predicted"
              name="Predicted Revenue"
              stroke="var(--color-accent)"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
            />

            {/* Actual Revenue Line */}
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual Revenue"
              stroke="var(--color-primary)"
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Forecast Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{calculateAccuracy()}%</div>
          <div className="text-xs text-muted-foreground">Forecast Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-accent">$196K</div>
          <div className="text-xs text-muted-foreground">Predicted Next 3 Days</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-success">+12.8%</div>
          <div className="text-xs text-muted-foreground">Expected Growth</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">±8.2%</div>
          <div className="text-xs text-muted-foreground">Confidence Range</div>
        </div>
      </div>

      {/* Variance Analysis */}
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="TrendingUp" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Variance Analysis</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Current forecast shows strong accuracy with minimal variance. 
          Recent performance indicates revenue trending above predictions, 
          suggesting conservative forecasting model that may need adjustment for Q2.
        </p>
      </div>
    </div>
  );
};

export default RevenueForecastChart;