import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, ComposedChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TransactionTimelineChart = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [chartType, setChartType] = useState('volume'); // 'volume', 'risk', 'anomalies'

  const timelineData = [
    {
      time: '00:00',
      timestamp: new Date('2025-01-26T00:00:00'),
      totalVolume: 1250,
      fraudulentVolume: 15,
      riskScore: 2.1,
      anomalyDetected: false,
      blockedTransactions: 8,
      approvedTransactions: 1227
    },
    {
      time: '02:00',
      timestamp: new Date('2025-01-26T02:00:00'),
      totalVolume: 890,
      fraudulentVolume: 12,
      riskScore: 1.8,
      anomalyDetected: false,
      blockedTransactions: 5,
      approvedTransactions: 873
    },
    {
      time: '04:00',
      timestamp: new Date('2025-01-26T04:00:00'),
      totalVolume: 650,
      fraudulentVolume: 8,
      riskScore: 1.5,
      anomalyDetected: false,
      blockedTransactions: 3,
      approvedTransactions: 639
    },
    {
      time: '06:00',
      timestamp: new Date('2025-01-26T06:00:00'),
      totalVolume: 1100,
      fraudulentVolume: 18,
      riskScore: 2.3,
      anomalyDetected: false,
      blockedTransactions: 12,
      approvedTransactions: 1070
    },
    {
      time: '08:00',
      timestamp: new Date('2025-01-26T08:00:00'),
      totalVolume: 2100,
      fraudulentVolume: 45,
      riskScore: 3.2,
      anomalyDetected: true,
      blockedTransactions: 28,
      approvedTransactions: 2027
    },
    {
      time: '10:00',
      timestamp: new Date('2025-01-26T10:00:00'),
      totalVolume: 3200,
      fraudulentVolume: 78,
      riskScore: 4.1,
      anomalyDetected: true,
      blockedTransactions: 52,
      approvedTransactions: 3070
    },
    {
      time: '12:00',
      timestamp: new Date('2025-01-26T12:00:00'),
      totalVolume: 4100,
      fraudulentVolume: 125,
      riskScore: 5.8,
      anomalyDetected: true,
      blockedTransactions: 89,
      approvedTransactions: 3886
    },
    {
      time: '14:00',
      timestamp: new Date('2025-01-26T14:00:00'),
      totalVolume: 3800,
      fraudulentVolume: 142,
      riskScore: 6.2,
      anomalyDetected: true,
      blockedTransactions: 98,
      approvedTransactions: 3560
    },
    {
      time: '16:00',
      timestamp: new Date('2025-01-26T16:00:00'),
      totalVolume: 3500,
      fraudulentVolume: 89,
      riskScore: 4.8,
      anomalyDetected: false,
      blockedTransactions: 67,
      approvedTransactions: 3344
    },
    {
      time: '18:00',
      timestamp: new Date('2025-01-26T18:00:00'),
      totalVolume: 2900,
      fraudulentVolume: 56,
      riskScore: 3.5,
      anomalyDetected: false,
      blockedTransactions: 42,
      approvedTransactions: 2802
    },
    {
      time: '20:00',
      timestamp: new Date('2025-01-26T20:00:00'),
      totalVolume: 2200,
      fraudulentVolume: 34,
      riskScore: 2.8,
      anomalyDetected: false,
      blockedTransactions: 25,
      approvedTransactions: 2141
    },
    {
      time: '22:00',
      timestamp: new Date('2025-01-26T22:00:00'),
      totalVolume: 1800,
      fraudulentVolume: 28,
      riskScore: 2.4,
      anomalyDetected: false,
      blockedTransactions: 18,
      approvedTransactions: 1754
    }
  ];

  const timeRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const chartTypeOptions = [
    { value: 'volume', label: 'Transaction Volume', icon: 'BarChart3' },
    { value: 'risk', label: 'Risk Analysis', icon: 'TrendingUp' },
    { value: 'anomalies', label: 'Anomaly Detection', icon: 'AlertTriangle' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-semibold text-sm mb-2">{`Time: ${label}`}</p>
          {chartType === 'volume' && (
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Total Volume:</span>
                <span className="font-medium">{data.totalVolume.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Approved:</span>
                <span className="font-medium text-success">{data.approvedTransactions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Blocked:</span>
                <span className="font-medium text-error">{data.blockedTransactions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Fraudulent:</span>
                <span className="font-medium text-warning">{data.fraudulentVolume.toLocaleString()}</span>
              </div>
            </div>
          )}
          {chartType === 'risk' && (
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Risk Score:</span>
                <span className="font-medium">{data.riskScore}/10</span>
              </div>
              <div className="flex justify-between">
                <span>Fraud Rate:</span>
                <span className="font-medium">{((data.fraudulentVolume / data.totalVolume) * 100).toFixed(2)}%</span>
              </div>
            </div>
          )}
          {chartType === 'anomalies' && (
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Anomaly Status:</span>
                <span className={`font-medium ${data.anomalyDetected ? 'text-error' : 'text-success'}`}>
                  {data.anomalyDetected ? 'Detected' : 'Normal'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Risk Score:</span>
                <span className="font-medium">{data.riskScore}/10</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'volume':
        return (
          <ComposedChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="approvedTransactions" 
              fill="var(--color-success)" 
              name="Approved"
              radius={[2, 2, 0, 0]}
            />
            <Bar 
              dataKey="blockedTransactions" 
              fill="var(--color-error)" 
              name="Blocked"
              radius={[2, 2, 0, 0]}
            />
            <Line 
              type="monotone" 
              dataKey="fraudulentVolume" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
              name="Fraudulent"
            />
          </ComposedChart>
        );

      case 'risk':
        return (
          <ComposedChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={[0, 10]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="riskScore"
              stroke="var(--color-accent)"
              fill="var(--color-accent)"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <ReferenceLine y={5} stroke="var(--color-warning)" strokeDasharray="5 5" />
            <ReferenceLine y={7} stroke="var(--color-error)" strokeDasharray="5 5" />
            <Line 
              type="monotone" 
              dataKey="riskScore" 
              stroke="var(--color-accent)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 5 }}
            />
          </ComposedChart>
        );

      case 'anomalies':
        return (
          <ComposedChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="totalVolume" 
              fill="var(--color-muted)" 
              name="Total Volume"
              radius={[2, 2, 0, 0]}
              opacity={0.3}
            />
            {timelineData.map((entry, index) => (
              entry.anomalyDetected && (
                <ReferenceLine 
                  key={index}
                  x={entry.time} 
                  stroke="var(--color-error)" 
                  strokeWidth={3}
                  strokeDasharray="0"
                />
              )
            ))}
            <Line 
              type="monotone" 
              dataKey="riskScore" 
              stroke="var(--color-error)" 
              strokeWidth={2}
              dot={(props) => {
                const { payload } = props;
                return payload.anomalyDetected ? (
                  <circle 
                    cx={props.cx} 
                    cy={props.cy} 
                    r={6} 
                    fill="var(--color-error)" 
                    stroke="white" 
                    strokeWidth={2}
                  />
                ) : (
                  <circle 
                    cx={props.cx} 
                    cy={props.cy} 
                    r={3} 
                    fill="var(--color-success)" 
                    stroke="white" 
                    strokeWidth={1}
                  />
                );
              }}
            />
          </ComposedChart>
        );

      default:
        return null;
    }
  };

  const anomalyCount = timelineData.filter(d => d.anomalyDetected).length;
  const totalFraudulent = timelineData.reduce((sum, d) => sum + d.fraudulentVolume, 0);
  const totalVolume = timelineData.reduce((sum, d) => sum + d.totalVolume, 0);
  const fraudRate = ((totalFraudulent / totalVolume) * 100).toFixed(2);

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Transaction Timeline Analysis
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time monitoring with anomaly detection
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="min-w-[140px]"
          />
          
          <div className="flex items-center space-x-1">
            {chartTypeOptions.map((option) => (
              <Button
                key={option.value}
                variant={chartType === option.value ? 'default' : 'outline'}
                size="sm"
                iconName={option.icon}
                onClick={() => setChartType(option.value)}
                className="text-xs"
              >
                <span className="hidden lg:inline ml-1">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Activity" size={16} className="text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Total Volume</span>
          </div>
          <div className="text-lg font-bold text-card-foreground">
            {totalVolume.toLocaleString()}
          </div>
        </div>

        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-xs font-medium text-muted-foreground">Fraud Rate</span>
          </div>
          <div className="text-lg font-bold text-warning">
            {fraudRate}%
          </div>
        </div>

        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Zap" size={16} className="text-error" />
            <span className="text-xs font-medium text-muted-foreground">Anomalies</span>
          </div>
          <div className="text-lg font-bold text-error">
            {anomalyCount}
          </div>
        </div>

        <div className="bg-muted/20 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs font-medium text-muted-foreground">Detection Rate</span>
          </div>
          <div className="text-lg font-bold text-success">
            94.7%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Legend and Thresholds */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            {chartType === 'volume' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded"></div>
                  <span className="text-xs text-muted-foreground">Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-error rounded"></div>
                  <span className="text-xs text-muted-foreground">Blocked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-2 bg-warning rounded"></div>
                  <span className="text-xs text-muted-foreground">Fraudulent</span>
                </div>
              </>
            )}
            
            {chartType === 'risk' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-2 bg-warning rounded"></div>
                  <span className="text-xs text-muted-foreground">Medium Risk (5+)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-2 bg-error rounded"></div>
                  <span className="text-xs text-muted-foreground">High Risk (7+)</span>
                </div>
              </>
            )}
            
            {chartType === 'anomalies' && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Normal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Anomaly Detected</span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="RefreshCw" size={12} className="animate-spin" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTimelineChart;