import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIMetricCard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  trendValue, 
  sparklineData, 
  icon, 
  color = 'primary',
  onClick 
}) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: {
        bg: 'bg-primary/10',
        icon: 'text-primary',
        trend: trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'
      },
      success: {
        bg: 'bg-success/10',
        icon: 'text-success',
        trend: trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'
      },
      warning: {
        bg: 'bg-warning/10',
        icon: 'text-warning',
        trend: trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'
      },
      error: {
        bg: 'bg-error/10',
        icon: 'text-error',
        trend: trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'
      }
    };
    return colors[colorType] || colors.primary;
  };

  const colorClasses = getColorClasses(color);
  const trendIcon = trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 card-shadow transition-smooth hover:shadow-lg ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
          <Icon name={icon} size={24} className={colorClasses.icon} />
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={trendIcon} size={16} className={colorClasses.trend} />
          <span className={`text-sm font-medium ${colorClasses.trend}`}>
            {trendValue}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      </div>

      {/* Sparkline visualization */}
      {sparklineData && sparklineData.length > 0 && (
        <div className="mt-4 h-8 flex items-end space-x-1">
          {sparklineData.map((point, index) => (
            <div
              key={index}
              className={`flex-1 ${colorClasses.bg} rounded-sm transition-all duration-300`}
              style={{ height: `${(point / Math.max(...sparklineData)) * 100}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default KPIMetricCard;