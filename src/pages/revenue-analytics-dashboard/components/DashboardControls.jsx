import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const DashboardControls = () => {
  const [fiscalPeriod, setFiscalPeriod] = useState('current-month');
  const [currency, setCurrency] = useState('USD');
  const [comparisonMode, setComparisonMode] = useState('period-over-period');
  const [showBookmarks, setShowBookmarks] = useState(false);

  const fiscalPeriodOptions = [
    { value: 'current-month', label: 'Current Month (January 2025)' },
    { value: 'last-month', label: 'Last Month (December 2024)' },
    { value: 'current-quarter', label: 'Current Quarter (Q1 2025)' },
    { value: 'last-quarter', label: 'Last Quarter (Q4 2024)' },
    { value: 'current-year', label: 'Current Year (2025)' },
    { value: 'last-year', label: 'Last Year (2024)' },
    { value: 'custom', label: 'Custom Period' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)', description: 'US Dollar' },
    { value: 'EUR', label: 'EUR (€)', description: 'Euro' },
    { value: 'GBP', label: 'GBP (£)', description: 'British Pound' },
    { value: 'JPY', label: 'JPY (¥)', description: 'Japanese Yen' },
    { value: 'CAD', label: 'CAD (C$)', description: 'Canadian Dollar' }
  ];

  const comparisonOptions = [
    { value: 'period-over-period', label: 'Period over Period' },
    { value: 'year-over-year', label: 'Year over Year' },
    { value: 'quarter-over-quarter', label: 'Quarter over Quarter' },
    { value: 'no-comparison', label: 'No Comparison' }
  ];

  const bookmarkedViews = [
    { id: 1, name: 'Q4 2024 Performance Review', icon: 'BarChart3' },
    { id: 2, name: 'Holiday Season Analysis', icon: 'Calendar' },
    { id: 3, name: 'Payment Method Trends', icon: 'CreditCard' },
    { id: 4, name: 'Geographic Revenue Split', icon: 'Globe' }
  ];

  const handleExport = () => {
    // In real implementation, trigger export functionality
    console.log('Exporting revenue analytics report...');
  };

  const handleBookmarkView = () => {
    // In real implementation, save current view configuration
    console.log('Bookmarking current view configuration...');
  };

  const loadBookmarkedView = (viewId) => {
    // In real implementation, load saved view configuration
    console.log(`Loading bookmarked view: ${viewId}`);
    setShowBookmarks(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Period and Currency Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Fiscal Period Selector */}
          <div className="min-w-[200px]">
            <Select
              label="Fiscal Period"
              options={fiscalPeriodOptions}
              value={fiscalPeriod}
              onChange={setFiscalPeriod}
              className="text-sm"
            />
          </div>

          {/* Currency Toggle */}
          <div className="min-w-[120px]">
            <Select
              label="Currency"
              options={currencyOptions}
              value={currency}
              onChange={setCurrency}
              className="text-sm"
            />
          </div>

          {/* Comparison Mode */}
          <div className="min-w-[160px]">
            <Select
              label="Comparison"
              options={comparisonOptions}
              value={comparisonMode}
              onChange={setComparisonMode}
              className="text-sm"
            />
          </div>
        </div>

        {/* Right Section - Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Bookmarks Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Bookmark"
              onClick={() => setShowBookmarks(!showBookmarks)}
              className="text-xs"
            >
              <span className="hidden md:inline ml-1">Views</span>
            </Button>

            {showBookmarks && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-md shadow-modal z-[1150] animate-fade-in">
                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-popover-foreground">
                      Saved Views
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => setShowBookmarks(false)}
                    />
                  </div>

                  <div className="space-y-2">
                    {bookmarkedViews.map((view) => (
                      <button
                        key={view.id}
                        onClick={() => loadBookmarkedView(view.id)}
                        className="flex items-center space-x-3 w-full p-2 text-left hover:bg-muted rounded-md transition-smooth"
                      >
                        <Icon name={view.icon} size={16} className="text-primary" />
                        <span className="text-sm text-popover-foreground">
                          {view.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-border mt-3 pt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Plus"
                      onClick={handleBookmarkView}
                      className="w-full text-xs"
                    >
                      Save Current View
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Export Controls */}
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={handleExport}
            className="text-xs"
          >
            <span className="hidden md:inline ml-1">Export</span>
          </Button>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            onClick={() => window.location.reload()}
            className="text-xs"
          >
            <span className="hidden md:inline ml-1">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Currency Conversion Rate Display */}
      {currency !== 'USD' && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="ArrowRightLeft" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              Conversion Rate: 1 USD = {currency === 'EUR' ? '0.92' : currency === 'GBP' ? '0.79' : currency === 'JPY' ? '148.50' : '1.35'} {currency}
            </span>
            <span className="text-xs text-muted-foreground">
              (Updated: {new Date().toLocaleTimeString()})
            </span>
          </div>
        </div>
      )}

      {/* Click outside to close bookmarks */}
      {showBookmarks && (
        <div
          className="fixed inset-0 z-[1140]"
          onClick={() => setShowBookmarks(false)}
        />
      )}
    </div>
  );
};

export default DashboardControls;