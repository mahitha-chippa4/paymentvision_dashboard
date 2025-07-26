import React from 'react';
import Icon from '../../../components/AppIcon';

const RevenueMetricsStrip = () => {
  const metrics = [
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: '$2,847,392',
      change: '+12.4%',
      changeType: 'positive',
      period: 'vs last month',
      icon: 'DollarSign',
      confidence: '98%'
    },
    {
      id: 'growth-rate',
      title: 'Growth Rate',
      value: '18.7%',
      change: '+3.2%',
      changeType: 'positive',
      period: 'vs last quarter',
      icon: 'TrendingUp',
      confidence: '94%'
    },
    {
      id: 'avg-transaction',
      title: 'Avg Transaction Value',
      value: '$127.45',
      change: '-2.1%',
      changeType: 'negative',
      period: 'vs last month',
      icon: 'CreditCard',
      confidence: '96%'
    },
    {
      id: 'forecast-accuracy',
      title: 'Forecast Accuracy',
      value: '94.2%',
      change: '+1.8%',
      changeType: 'positive',
      period: 'vs last period',
      icon: 'Target',
      confidence: '92%'
    }
  ];

  const getChangeColor = (type) => {
    return type === 'positive' ? 'text-success' : 'text-error';
  };

  const getChangeIcon = (type) => {
    return type === 'positive' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-card-shadow transition-smooth"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={metric.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    Confidence: {metric.confidence}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-2xl font-semibold text-foreground">
              {metric.value}
            </div>
            
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                <Icon name={getChangeIcon(metric.changeType)} size={14} />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {metric.period}
              </span>
            </div>
          </div>

          {/* Progress indicator for confidence */}
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-1">
              <div
                className="bg-primary h-1 rounded-full transition-smooth"
                style={{ width: metric.confidence }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueMetricsStrip;