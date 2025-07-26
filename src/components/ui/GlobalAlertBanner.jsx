import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const GlobalAlertBanner = () => {
  const [alerts, setAlerts] = useState([]);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Mock alerts for demonstration
  useEffect(() => {
    const mockAlerts = [
      {
        id: 1,
        type: 'error',
        title: 'Critical System Alert',
        message: 'High-risk transaction detected requiring immediate review',
        timestamp: new Date(),
        acknowledged: false
      },
      {
        id: 2,
        type: 'warning',
        title: 'Processing Delay',
        message: 'Payment processing experiencing 15% slower than normal response times',
        timestamp: new Date(Date.now() - 300000),
        acknowledged: false
      }
    ];

    // Simulate real-time alerts
    const timer = setTimeout(() => {
      setAlerts(mockAlerts);
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const currentAlert = alerts[currentAlertIndex];

  const getAlertStyles = (type) => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-error',
          text: 'text-error-foreground',
          icon: 'AlertTriangle'
        };
      case 'warning':
        return {
          bg: 'bg-warning',
          text: 'text-warning-foreground',
          icon: 'AlertCircle'
        };
      case 'success':
        return {
          bg: 'bg-success',
          text: 'text-success-foreground',
          icon: 'CheckCircle'
        };
      default:
        return {
          bg: 'bg-accent',
          text: 'text-accent-foreground',
          icon: 'Info'
        };
    }
  };

  const acknowledgeAlert = () => {
    const updatedAlerts = alerts.map((alert, index) => 
      index === currentAlertIndex ? { ...alert, acknowledged: true } : alert
    );
    setAlerts(updatedAlerts);
    
    // Move to next alert or hide banner
    const nextUnacknowledged = updatedAlerts.findIndex(alert => !alert.acknowledged);
    if (nextUnacknowledged !== -1) {
      setCurrentAlertIndex(nextUnacknowledged);
    } else {
      setIsVisible(false);
    }
  };

  const navigateAlert = (direction) => {
    if (direction === 'next' && currentAlertIndex < alerts.length - 1) {
      setCurrentAlertIndex(currentAlertIndex + 1);
    } else if (direction === 'prev' && currentAlertIndex > 0) {
      setCurrentAlertIndex(currentAlertIndex - 1);
    }
  };

  const dismissBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible || !currentAlert || alerts.length === 0) {
    return null;
  }

  const alertStyles = getAlertStyles(currentAlert.type);

  return (
    <div className={`fixed top-16 left-0 right-0 z-[1100] ${alertStyles.bg} ${alertStyles.text} transition-smooth`}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4 flex-1">
          <Icon name={alertStyles.icon} size={20} />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <h4 className="font-semibold text-sm">{currentAlert.title}</h4>
              <span className="text-xs opacity-75">
                {currentAlert.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-sm opacity-90 truncate">{currentAlert.message}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          {/* Alert Navigation */}
          {alerts.length > 1 && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronLeft"
                onClick={() => navigateAlert('prev')}
                disabled={currentAlertIndex === 0}
                className="text-current hover:bg-white/20"
              />
              <span className="text-xs px-2">
                {currentAlertIndex + 1} of {alerts.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName="ChevronRight"
                onClick={() => navigateAlert('next')}
                disabled={currentAlertIndex === alerts.length - 1}
                className="text-current hover:bg-white/20"
              />
            </div>
          )}

          {/* Action Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={acknowledgeAlert}
            className="text-current hover:bg-white/20 text-xs px-3"
          >
            Acknowledge
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={dismissBanner}
            className="text-current hover:bg-white/20"
          />
        </div>
      </div>

      {/* Mobile Responsive Layout */}
      <div className="md:hidden px-6 pb-3">
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            {alerts.length > 1 && (
              <span className="text-xs opacity-75">
                Alert {currentAlertIndex + 1} of {alerts.length}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={acknowledgeAlert}
              className="text-current hover:bg-white/20 text-xs"
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAlertBanner;