import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RiskLevelFilter = ({ onFilterChange }) => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [alertStatus, setAlertStatus] = useState('all');

  const riskLevelOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk (0-3)' },
    { value: 'medium', label: 'Medium Risk (3-6)' },
    { value: 'high', label: 'High Risk (6-8)' },
    { value: 'critical', label: 'Critical Risk (8+)' }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north_america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia_pacific', label: 'Asia Pacific' },
    { value: 'south_america', label: 'South America' },
    { value: 'africa', label: 'Africa' }
  ];

  const alertStatusOptions = [
    { value: 'all', label: 'All Alerts' },
    { value: 'unacknowledged', label: 'Unacknowledged' },
    { value: 'acknowledged', label: 'Acknowledged' },
    { value: 'investigating', label: 'Under Investigation' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      riskLevel: selectedRiskLevel,
      region: selectedRegion,
      alertStatus: alertStatus,
      [filterType]: value
    };

    switch (filterType) {
      case 'riskLevel':
        setSelectedRiskLevel(value);
        break;
      case 'region':
        setSelectedRegion(value);
        break;
      case 'alertStatus':
        setAlertStatus(value);
        break;
    }

    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearAllFilters = () => {
    setSelectedRiskLevel('all');
    setSelectedRegion('all');
    setAlertStatus('all');
    
    if (onFilterChange) {
      onFilterChange({
        riskLevel: 'all',
        region: 'all',
        alertStatus: 'all'
      });
    }
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'low':
        return 'text-success border-success bg-success/10';
      case 'medium':
        return 'text-warning border-warning bg-warning/10';
      case 'high':
        return 'text-error border-error bg-error/10';
      case 'critical':
        return 'text-error border-error bg-error/20';
      default:
        return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedRiskLevel !== 'all') count++;
    if (selectedRegion !== 'all') count++;
    if (alertStatus !== 'all') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-card border border-border rounded-lg p-4 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-sm text-card-foreground">
              Risk & Alert Filters
            </h3>
            <p className="text-xs text-muted-foreground">
              Filter transactions by risk level and geographic region
            </p>
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex items-center space-x-2">
            <div className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              {activeFilterCount} active
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={clearAllFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Risk Level Filter */}
        <div>
          <label className="block text-xs font-medium text-card-foreground mb-2">
            Risk Level
          </label>
          <Select
            options={riskLevelOptions}
            value={selectedRiskLevel}
            onChange={(value) => handleFilterChange('riskLevel', value)}
            className="w-full"
          />
          {selectedRiskLevel !== 'all' && (
            <div className={`mt-2 px-2 py-1 rounded text-xs font-medium border ${getRiskLevelColor(selectedRiskLevel)}`}>
              {riskLevelOptions.find(opt => opt.value === selectedRiskLevel)?.label}
            </div>
          )}
        </div>

        {/* Geographic Region Filter */}
        <div>
          <label className="block text-xs font-medium text-card-foreground mb-2">
            Geographic Region
          </label>
          <Select
            options={regionOptions}
            value={selectedRegion}
            onChange={(value) => handleFilterChange('region', value)}
            className="w-full"
          />
        </div>

        {/* Alert Status Filter */}
        <div>
          <label className="block text-xs font-medium text-card-foreground mb-2">
            Alert Status
          </label>
          <Select
            options={alertStatusOptions}
            value={alertStatus}
            onChange={(value) => handleFilterChange('alertStatus', value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Quick Filter Buttons */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-card-foreground mb-2">Quick Filters:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedRiskLevel === 'critical' ? 'default' : 'outline'}
                size="sm"
                iconName="AlertTriangle"
                onClick={() => handleFilterChange('riskLevel', 'critical')}
                className="text-xs"
              >
                Critical Risk
              </Button>
              <Button
                variant={alertStatus === 'unacknowledged' ? 'default' : 'outline'}
                size="sm"
                iconName="Bell"
                onClick={() => handleFilterChange('alertStatus', 'unacknowledged')}
                className="text-xs"
              >
                Unacknowledged
              </Button>
              <Button
                variant={selectedRegion === 'asia_pacific' ? 'default' : 'outline'}
                size="sm"
                iconName="Globe"
                onClick={() => handleFilterChange('region', 'asia_pacific')}
                className="text-xs"
              >
                High-Risk Regions
              </Button>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              Showing filtered results
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-success font-medium">Live Updates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskLevelFilter;