import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeTransactionChart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('volume');
  const [isLive, setIsLive] = useState(true);

  // Mock real-time data generation
  useEffect(() => {
    const generateInitialData = () => {
      const data = [];
      const now = new Date();
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          timestamp: time.getTime(),
          volume: Math.floor(Math.random() * 1000) + 500,
          successRate: Math.floor(Math.random() * 10) + 90,
          revenue: Math.floor(Math.random() * 50000) + 25000,
          avgProcessingTime: Math.floor(Math.random() * 500) + 200
        });
      }
      return data;
    };

    setChartData(generateInitialData());

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isLive) {
        setChartData(prevData => {
          const newData = [...prevData];
          const now = new Date();
          
          // Remove oldest data point and add new one
          newData.shift();
          newData.push({
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            timestamp: now.getTime(),
            volume: Math.floor(Math.random() * 1000) + 500,
            successRate: Math.floor(Math.random() * 10) + 90,
            revenue: Math.floor(Math.random() * 50000) + 25000,
            avgProcessingTime: Math.floor(Math.random() * 500) + 200
          });
          
          return newData;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const metrics = [
    { key: 'volume', label: 'Transaction Volume', color: '#3B82F6', unit: '' },
    { key: 'successRate', label: 'Success Rate', color: '#10B981', unit: '%' },
    { key: 'revenue', label: 'Revenue', color: '#8B5CF6', unit: '$' },
    { key: 'avgProcessingTime', label: 'Avg Processing Time', color: '#F59E0B', unit: 'ms' }
  ];

  const selectedMetricData = metrics.find(m => m.key === selectedMetric);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-popover-foreground">
                {selectedMetricData.label}: {entry.value}{selectedMetricData.unit}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Real-Time Transaction Flow</h2>
          <p className="text-sm text-muted-foreground">Live payment processing metrics</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Metric Selector */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {metrics.map((metric) => (
              <Button
                key={metric.key}
                variant={selectedMetric === metric.key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedMetric(metric.key)}
                className="text-xs"
              >
                {metric.label}
              </Button>
            ))}
          </div>

          {/* Live Toggle */}
          <Button
            variant={isLive ? 'default' : 'outline'}
            size="sm"
            iconName={isLive ? 'Radio' : 'Pause'}
            onClick={() => setIsLive(!isLive)}
            className={isLive ? 'animate-pulse' : ''}
          >
            <span className="hidden lg:inline ml-1">
              {isLive ? 'Live' : 'Paused'}
            </span>
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={selectedMetricData.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={selectedMetricData.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={selectedMetricData.color}
              strokeWidth={2}
              fill="url(#colorGradient)"
              dot={{ fill: selectedMetricData.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: selectedMetricData.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: selectedMetricData.color }}
            />
            <span className="text-sm text-muted-foreground">
              Current: {chartData[chartData.length - 1]?.[selectedMetric]}{selectedMetricData.unit}
            </span>
          </div>
          {isLive && (
            <div className="flex items-center space-x-1 text-xs text-success">
              <Icon name="RefreshCw" size={12} className="animate-spin" />
              <span>Auto-updating every 5s</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="ghost" size="sm" iconName="Maximize2">
            Fullscreen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTransactionChart;