import React, { useState, useEffect } from 'react';
import Button from './Button';
import Select from './Select';
import Input from './Input';
import Icon from '../AppIcon';

const GlobalTimeRangeSelector = () => {
  const [selectedRange, setSelectedRange] = useState('24h');
  const [customRange, setCustomRange] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: ''
  });
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [isLive, setIsLive] = useState(true);

  const presetRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleRangeChange = (value) => {
    setSelectedRange(value);
    if (value === 'custom') {
      setShowCustomPicker(true);
      setIsLive(false);
    } else {
      setShowCustomPicker(false);
      setIsLive(true);
    }
  };

  const handleCustomRangeApply = () => {
    setShowCustomPicker(false);
    setIsLive(false);
    // In real implementation, apply custom range to dashboard
    console.log('Custom range applied:', customRange);
  };

  const toggleLiveMode = () => {
    setIsLive(!isLive);
    if (!isLive) {
      setSelectedRange('24h');
      setShowCustomPicker(false);
    }
  };

  const getDisplayLabel = () => {
    if (selectedRange === 'custom' && customRange.startDate && customRange.endDate) {
      return `${customRange.startDate} - ${customRange.endDate}`;
    }
    return presetRanges.find(range => range.value === selectedRange)?.label || 'Last 24 Hours';
  };

  // Auto-refresh in live mode
  useEffect(() => {
    let interval;
    if (isLive) {
      interval = setInterval(() => {
        // In real implementation, refresh dashboard data
        console.log('Auto-refreshing data...');
      }, 30000); // Refresh every 30 seconds
    }
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="flex items-center space-x-3">
      {/* Live Mode Toggle */}
      <div className="flex items-center space-x-2">
        <Button
          variant={isLive ? 'default' : 'outline'}
          size="sm"
          iconName={isLive ? 'Radio' : 'Pause'}
          onClick={toggleLiveMode}
          className={`transition-smooth ${isLive ? 'animate-pulse' : ''}`}
        >
          <span className="hidden lg:inline ml-1">
            {isLive ? 'Live' : 'Paused'}
          </span>
        </Button>
      </div>

      {/* Time Range Selector */}
      <div className="relative">
        <div className="hidden md:block">
          <Select
            options={presetRanges}
            value={selectedRange}
            onChange={handleRangeChange}
            className="min-w-[140px]"
          />
        </div>

        {/* Mobile: Compact Display */}
        <div className="md:hidden">
          <Button
            variant="outline"
            size="sm"
            iconName="Clock"
            onClick={() => setShowCustomPicker(!showCustomPicker)}
            className="text-xs"
          >
            {selectedRange === 'custom' ? 'Custom' : selectedRange.toUpperCase()}
          </Button>
        </div>
      </div>

      {/* Custom Date Range Picker */}
      {showCustomPicker && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-md shadow-modal z-[1150] animate-fade-in">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Custom Time Range</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowCustomPicker(false)}
              />
            </div>

            <div className="space-y-4">
              {/* Start Date & Time */}
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  label="Start Date"
                  value={customRange.startDate}
                  onChange={(e) => setCustomRange(prev => ({
                    ...prev,
                    startDate: e.target.value
                  }))}
                />
                <Input
                  type="time"
                  label="Start Time"
                  value={customRange.startTime}
                  onChange={(e) => setCustomRange(prev => ({
                    ...prev,
                    startTime: e.target.value
                  }))}
                />
              </div>

              {/* End Date & Time */}
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  label="End Date"
                  value={customRange.endDate}
                  onChange={(e) => setCustomRange(prev => ({
                    ...prev,
                    endDate: e.target.value
                  }))}
                />
                <Input
                  type="time"
                  label="End Time"
                  value={customRange.endTime}
                  onChange={(e) => setCustomRange(prev => ({
                    ...prev,
                    endTime: e.target.value
                  }))}
                />
              </div>

              {/* Quick Presets */}
              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground mb-2">Quick Presets:</p>
                <div className="grid grid-cols-2 gap-2">
                  {presetRanges.slice(0, 4).map((preset) => (
                    <Button
                      key={preset.value}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedRange(preset.value);
                        setShowCustomPicker(false);
                        setIsLive(true);
                      }}
                      className="text-xs"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomPicker(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleCustomRangeApply}
                  disabled={!customRange.startDate || !customRange.endDate}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showCustomPicker && (
        <div
          className="fixed inset-0 z-[1140]"
          onClick={() => setShowCustomPicker(false)}
        />
      )}

      {/* Last Updated Indicator */}
      {isLive && (
        <div className="hidden lg:flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="RefreshCw" size={12} className="animate-spin" />
          <span>Updated {new Date().toLocaleTimeString()}</span>
        </div>
      )}
    </div>
  );
};

export default GlobalTimeRangeSelector;