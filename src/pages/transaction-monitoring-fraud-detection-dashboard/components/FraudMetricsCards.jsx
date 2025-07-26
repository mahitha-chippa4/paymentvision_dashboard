import React from 'react';
import Icon from '../../../components/AppIcon';

const FraudMetricsCards = () => {
  const metricsData = [
    {
      id: 'fraud-detection-rate',
      title: 'Fraud Detection Rate',
      value: '94.7%',
      change: '+2.3%',
      changeType: 'positive',
      icon: 'Shield',
      description: 'Successful fraud identification',
      trend: [85, 88, 91, 89, 93, 95, 94.7],
      color: 'success'
    },
    {
      id: 'false-positive-rate',
      title: 'False Positive Rate',
      value: '3.2%',
      change: '-0.8%',
      changeType: 'positive',
      icon: 'AlertTriangle',
      description: 'Legitimate transactions flagged',
      trend: [4.5, 4.2, 3.8, 4.1, 3.5, 3.4, 3.2],
      color: 'warning'
    },
    {
      id: 'blocked-transactions',
      title: 'Blocked Transactions',
      value: '1,247',
      change: '+156',
      changeType: 'neutral',
      icon: 'Ban',
      description: 'Transactions blocked today',
      trend: [980, 1050, 1120, 1180, 1200, 1220, 1247],
      color: 'error'
    },
    {
      id: 'risk-score-avg',
      title: 'Avg Risk Score',
      value: '2.8',
      change: '-0.3',
      changeType: 'positive',
      icon: 'Target',
      description: 'Average transaction risk level',
      trend: [3.5, 3.2, 3.0, 3.1, 2.9, 2.8, 2.8],
      color: 'accent'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCardBorderColor = (color) => {
    switch (color) {
      case 'success':
        return 'border-l-success';
      case 'warning':
        return 'border-l-warning';
      case 'error':
        return 'border-l-error';
      case 'accent':
        return 'border-l-accent';
      default:
        return 'border-l-primary';
    }
  };

  const renderMiniChart = (trend, color) => {
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min;
    
    return (
      <div className="flex items-end space-x-1 h-8">
        {trend.map((value, index) => {
          const height = range > 0 ? ((value - min) / range) * 100 : 50;
          return (
            <div
              key={index}
              className={`w-1 bg-${color} opacity-60 rounded-sm`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metricsData.map((metric) => (
        <div
          key={metric.id}
          className={`bg-card border ${getCardBorderColor(metric.color)} border-l-4 rounded-lg p-6 card-shadow transition-smooth hover:shadow-lg`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-${metric.color}/10 rounded-lg`}>
                <Icon name={metric.icon} size={20} className={`text-${metric.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-card-foreground">
                  {metric.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-card-foreground">
                  {metric.value}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${getChangeColor(metric.changeType)}`}>
                  <Icon 
                    name={metric.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                  />
                  <span>{metric.change}</span>
                  <span className="text-xs text-muted-foreground">vs yesterday</span>
                </div>
              </div>
              <div className="w-16">
                {renderMiniChart(metric.trend, metric.color)}
              </div>
            </div>

            {/* Real-time indicator */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Updated {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FraudMetricsCards;