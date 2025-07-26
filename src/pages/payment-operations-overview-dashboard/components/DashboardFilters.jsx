import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DashboardFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    dateRange: '24h',
    paymentMethod: 'all',
    currency: 'USD',
    region: 'all',
    status: 'all'
  });

  const [autoRefresh, setAutoRefresh] = useState({
    enabled: true,
    interval: 30
  });

  const dateRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const paymentMethodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'digital_wallet', label: 'Digital Wallet' },
    { value: 'cryptocurrency', label: 'Cryptocurrency' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'JPY', label: 'JPY (¥)' },
    { value: 'CAD', label: 'CAD (C$)' },
    { value: 'AUD', label: 'AUD (A$)' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north_america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia_pacific', label: 'Asia Pacific' },
    { value: 'latin_america', label: 'Latin America' },
    { value: 'middle_east_africa', label: 'Middle East & Africa' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'success', label: 'Success' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const refreshIntervalOptions = [
    { value: 5, label: '5 seconds' },
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const handleAutoRefreshToggle = () => {
    const newAutoRefresh = { ...autoRefresh, enabled: !autoRefresh.enabled };
    setAutoRefresh(newAutoRefresh);
  };

  const handleRefreshIntervalChange = (interval) => {
    const newAutoRefresh = { ...autoRefresh, interval };
    setAutoRefresh(newAutoRefresh);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '24h',
      paymentMethod: 'all',
      currency: 'USD',
      region: 'all',
      status: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Dashboard Filters</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            onClick={resetFilters}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />

        <Select
          label="Payment Method"
          options={paymentMethodOptions}
          value={filters.paymentMethod}
          onChange={(value) => handleFilterChange('paymentMethod', value)}
        />

        <Select
          label="Currency"
          options={currencyOptions}
          value={filters.currency}
          onChange={(value) => handleFilterChange('currency', value)}
        />

        <Select
          label="Region"
          options={regionOptions}
          value={filters.region}
          onChange={(value) => handleFilterChange('region', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
      </div>

      {/* Auto-refresh Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefresh.enabled ? 'default' : 'outline'}
              size="sm"
              iconName={autoRefresh.enabled ? 'Play' : 'Pause'}
              onClick={handleAutoRefreshToggle}
              className={autoRefresh.enabled ? 'animate-pulse' : ''}
            >
              Auto-refresh
            </Button>
            
            {autoRefresh.enabled && (
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                {refreshIntervalOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={autoRefresh.interval === option.value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleRefreshIntervalChange(option.value)}
                    className="text-xs"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {autoRefresh.enabled && (
            <>
              <Icon name="RefreshCw" size={14} className="animate-spin" />
              <span>Refreshing every {autoRefresh.interval}s</span>
            </>
          )}
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Active Filters Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          <div className="flex items-center space-x-2 flex-wrap">
            {Object.entries(filters).map(([key, value]) => {
              if (value === 'all' || value === 'USD') return null;
              
              const getFilterLabel = (filterKey, filterValue) => {
                const optionMap = {
                  dateRange: dateRangeOptions,
                  paymentMethod: paymentMethodOptions,
                  currency: currencyOptions,
                  region: regionOptions,
                  status: statusOptions
                };
                
                const option = optionMap[filterKey]?.find(opt => opt.value === filterValue);
                return option ? option.label : filterValue;
              };

              return (
                <div
                  key={key}
                  className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                >
                  <span>{getFilterLabel(key, value)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => handleFilterChange(key, key === 'currency' ? 'USD' : 'all')}
                    className="h-4 w-4 p-0 text-primary hover:text-primary/80"
                  />
                </div>
              );
            })}
            
            {Object.values(filters).every(value => value === 'all' || value === 'USD' || value === '24h') && (
              <span className="text-muted-foreground italic">No active filters</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFilters;