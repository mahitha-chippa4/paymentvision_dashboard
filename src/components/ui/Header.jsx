import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Overview',
      path: '/payment-operations-overview-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Payment Operations Overview'
    },
    {
      label: 'Revenue Analytics',
      path: '/revenue-analytics-dashboard',
      icon: 'TrendingUp',
      tooltip: 'Revenue Analytics Dashboard'
    },
    {
      label: 'Risk & Fraud',
      path: '/transaction-monitoring-fraud-detection-dashboard',
      icon: 'Shield',
      tooltip: 'Transaction Monitoring & Fraud Detection'
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/payment-operations-overview-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="CreditCard" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground leading-tight">
                PaymentVision
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Dashboard
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={item.tooltip}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Real-time Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success font-medium">Live</span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Bell" className="relative">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm" iconName="Settings" />
            <Button variant="ghost" size="sm" iconName="User" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            iconName={mobileMenuOpen ? "X" : "Menu"}
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-in">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile Quick Actions */}
            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-success font-medium">System Live</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" iconName="Bell" />
                  <Button variant="ghost" size="sm" iconName="Settings" />
                  <Button variant="ghost" size="sm" iconName="User" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;