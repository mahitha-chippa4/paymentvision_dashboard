import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveTransactionFeed = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLive, setIsLive] = useState(true);

  // Mock transaction data
  const generateTransaction = () => {
    const paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Digital Wallet', 'Cryptocurrency'];
    const statuses = ['success', 'pending', 'failed'];
    const countries = ['US', 'UK', 'CA', 'DE', 'FR', 'JP', 'AU', 'BR'];
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = (Math.random() * 2000 + 10).toFixed(2);
    
    return {
      id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      amount: parseFloat(amount),
      currency: 'USD',
      status,
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      timestamp: new Date(),
      customerEmail: `user${Math.floor(Math.random() * 1000)}@example.com`,
      processingTime: Math.floor(Math.random() * 3000) + 200
    };
  };

  useEffect(() => {
    // Generate initial transactions
    const initialTransactions = Array.from({ length: 15 }, generateTransaction);
    setTransactions(initialTransactions);

    // Simulate real-time transaction updates
    const interval = setInterval(() => {
      if (isLive) {
        setTransactions(prev => {
          const newTransaction = generateTransaction();
          const updated = [newTransaction, ...prev];
          return updated.slice(0, 50); // Keep only latest 50 transactions
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'pending':
        return { icon: 'Clock', color: 'text-warning' };
      case 'failed':
        return { icon: 'XCircle', color: 'text-error' };
      default:
        return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Credit Card':
        return 'CreditCard';
      case 'PayPal':
        return 'Wallet';
      case 'Bank Transfer':
        return 'Building2';
      case 'Digital Wallet':
        return 'Smartphone';
      case 'Cryptocurrency':
        return 'Coins';
      default:
        return 'CreditCard';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.status === filter;
  });

  const filters = [
    { key: 'all', label: 'All', count: transactions.length },
    { key: 'success', label: 'Success', count: transactions.filter(t => t.status === 'success').length },
    { key: 'pending', label: 'Pending', count: transactions.filter(t => t.status === 'pending').length },
    { key: 'failed', label: 'Failed', count: transactions.filter(t => t.status === 'failed').length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg card-shadow h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Live Transaction Feed</h2>
            <p className="text-sm text-muted-foreground">Real-time payment activity</p>
          </div>
          
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

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          {filters.map((filterOption) => (
            <Button
              key={filterOption.key}
              variant={filter === filterOption.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(filterOption.key)}
              className="text-xs flex items-center space-x-1"
            >
              <span>{filterOption.label}</span>
              <span className="bg-background/20 px-1.5 py-0.5 rounded text-xs">
                {filterOption.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 p-2">
          {filteredTransactions.map((transaction, index) => {
            const statusConfig = getStatusIcon(transaction.status);
            const isNew = index < 3 && isLive; // Highlight newest transactions
            
            return (
              <div
                key={transaction.id}
                className={`p-4 rounded-lg border transition-all duration-300 hover:bg-muted/50 ${
                  isNew ? 'bg-accent/10 border-accent animate-pulse' : 'bg-background border-border'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={getPaymentMethodIcon(transaction.paymentMethod)} 
                        size={16} 
                        className="text-muted-foreground" 
                      />
                      <Icon 
                        name={statusConfig.icon} 
                        size={16} 
                        className={statusConfig.color} 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground text-sm">
                          ${transaction.amount.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {transaction.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground truncate">
                          {transaction.customerEmail}
                        </span>
                        <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                          {transaction.country}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {transaction.paymentMethod}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {transaction.processingTime}ms
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filteredTransactions.length} transactions</span>
          {isLive && (
            <div className="flex items-center space-x-1">
              <Icon name="RefreshCw" size={12} className="animate-spin" />
              <span>Auto-updating</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveTransactionFeed;