import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const HighRiskTransactionQueue = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('risk_score');

  const highRiskTransactions = [
    {
      id: 'TXN-2025-001247',
      timestamp: new Date('2025-01-26T13:45:23'),
      amount: 2850.00,
      currency: 'USD',
      riskScore: 8.7,
      status: 'under_review',
      customer: {
        id: 'CUST-45892',
        name: 'Marcus Rodriguez',
        email: 'marcus.r@email.com',
        accountAge: '3 months',
        previousIncidents: 2
      },
      paymentMethod: {
        type: 'credit_card',
        last4: '4532',
        brand: 'Visa',
        country: 'US'
      },
      riskFactors: [
        { factor: 'Unusual transaction amount', severity: 'high', weight: 0.35 },
        { factor: 'New device fingerprint', severity: 'medium', weight: 0.25 },
        { factor: 'Velocity check failed', severity: 'high', weight: 0.40 }
      ],
      geolocation: {
        country: 'United States',
        city: 'Miami, FL',
        ipAddress: '192.168.1.***',
        vpnDetected: false
      },
      investigator: null,
      notes: []
    },
    {
      id: 'TXN-2025-001248',
      timestamp: new Date('2025-01-26T13:52:17'),
      amount: 1200.00,
      currency: 'USD',
      riskScore: 7.3,
      status: 'investigating',
      customer: {
        id: 'CUST-78234',
        name: 'Sarah Chen',
        email: 'sarah.chen@email.com',
        accountAge: '1 year',
        previousIncidents: 0
      },
      paymentMethod: {
        type: 'credit_card',
        last4: '8901',
        brand: 'Mastercard',
        country: 'CA'
      },
      riskFactors: [
        { factor: 'Cross-border transaction', severity: 'medium', weight: 0.30 },
        { factor: 'Multiple payment attempts', severity: 'high', weight: 0.45 },
        { factor: 'Suspicious merchant category', severity: 'medium', weight: 0.25 }
      ],
      geolocation: {
        country: 'Canada',
        city: 'Toronto, ON',
        ipAddress: '10.0.0.***',
        vpnDetected: true
      },
      investigator: 'Alex Thompson',
      notes: [
        { timestamp: new Date('2025-01-26T14:00:00'), author: 'Alex Thompson', content: 'Contacting customer for verification' }
      ]
    },
    {
      id: 'TXN-2025-001249',
      timestamp: new Date('2025-01-26T14:01:45'),
      amount: 450.00,
      currency: 'EUR',
      riskScore: 6.8,
      status: 'blocked',
      customer: {
        id: 'CUST-23567',
        name: 'Ahmed Hassan',
        email: 'ahmed.h@email.com',
        accountAge: '2 weeks',
        previousIncidents: 1
      },
      paymentMethod: {
        type: 'debit_card',
        last4: '2345',
        brand: 'Visa',
        country: 'DE'
      },
      riskFactors: [
        { factor: 'New customer account', severity: 'medium', weight: 0.30 },
        { factor: 'High-risk merchant', severity: 'high', weight: 0.40 },
        { factor: 'Unusual purchase pattern', severity: 'medium', weight: 0.30 }
      ],
      geolocation: {
        country: 'Germany',
        city: 'Berlin',
        ipAddress: '172.16.0.***',
        vpnDetected: false
      },
      investigator: 'Maria Santos',
      notes: [
        { timestamp: new Date('2025-01-26T14:05:00'), author: 'Maria Santos', content: 'Transaction blocked due to high risk score. Customer notified.' }
      ]
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'blocked', label: 'Blocked' },
    { value: 'approved', label: 'Approved' }
  ];

  const sortOptions = [
    { value: 'risk_score', label: 'Risk Score (High to Low)' },
    { value: 'timestamp', label: 'Most Recent' },
    { value: 'amount', label: 'Amount (High to Low)' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'under_review':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'investigating':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'blocked':
        return 'bg-error/10 text-error border-error/20';
      case 'approved':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 8) return 'text-error';
    if (score >= 6) return 'text-warning';
    return 'text-success';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredTransactions = highRiskTransactions
    .filter(txn => filterStatus === 'all' || txn.status === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'risk_score':
          return b.riskScore - a.riskScore;
        case 'timestamp':
          return b.timestamp - a.timestamp;
        case 'amount':
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

  const handleInvestigate = (transactionId) => {
    console.log(`Starting investigation for transaction: ${transactionId}`);
    // In real implementation, update transaction status and assign investigator
  };

  const handleApprove = (transactionId) => {
    console.log(`Approving transaction: ${transactionId}`);
    // In real implementation, approve transaction and update status
  };

  const handleBlock = (transactionId) => {
    console.log(`Blocking transaction: ${transactionId}`);
    // In real implementation, block transaction and notify customer
  };

  return (
    <div className="bg-card border border-border rounded-lg card-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              High-Risk Transaction Queue
            </h2>
            <p className="text-sm text-muted-foreground">
              Transactions requiring immediate attention
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
            <span className="text-xs text-error font-medium">
              {filteredTransactions.length} High Risk
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            className="min-w-[140px]"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="min-w-[180px]"
          />
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-4 border-b border-border cursor-pointer transition-smooth hover:bg-muted/20 ${
              selectedTransaction === transaction.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
            }`}
            onClick={() => setSelectedTransaction(
              selectedTransaction === transaction.id ? null : transaction.id
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-sm text-card-foreground">
                    {transaction.id}
                  </h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                    {transaction.status.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Customer:</span>
                    <span className="ml-1 font-medium text-card-foreground">
                      {transaction.customer.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="ml-1 font-medium text-card-foreground">
                      {transaction.currency} {transaction.amount.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Time:</span>
                    <span className="ml-1 font-medium text-card-foreground">
                      {transaction.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Risk Score:</span>
                    <span className={`ml-1 font-bold ${getRiskScoreColor(transaction.riskScore)}`}>
                      {transaction.riskScore}/10
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {transaction.status === 'under_review' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Search"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInvestigate(transaction.id);
                      }}
                      className="text-xs"
                    >
                      Investigate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Check"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(transaction.id);
                      }}
                      className="text-xs text-success border-success hover:bg-success hover:text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Ban"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBlock(transaction.id);
                      }}
                      className="text-xs text-error border-error hover:bg-error hover:text-white"
                    >
                      Block
                    </Button>
                  </>
                )}
              </div>
            </div>

            {selectedTransaction === transaction.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                {/* Risk Factors */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Risk Factors</h4>
                  <div className="space-y-2">
                    {transaction.riskFactors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                        <div className="flex items-center space-x-2">
                          <Icon 
                            name="AlertTriangle" 
                            size={14} 
                            className={getSeverityColor(factor.severity)} 
                          />
                          <span className="text-sm">{factor.factor}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-medium ${getSeverityColor(factor.severity)}`}>
                            {factor.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({Math.round(factor.weight * 100)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer & Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Customer Details</h4>
                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <span className="ml-1">{transaction.customer.email}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Account Age:</span>
                        <span className="ml-1">{transaction.customer.accountAge}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Previous Incidents:</span>
                        <span className="ml-1 text-error">{transaction.customer.previousIncidents}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Payment & Location</h4>
                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="text-muted-foreground">Card:</span>
                        <span className="ml-1">{transaction.paymentMethod.brand} ****{transaction.paymentMethod.last4}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="ml-1">{transaction.geolocation.city}, {transaction.geolocation.country}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">VPN Detected:</span>
                        <span className={`ml-1 ${transaction.geolocation.vpnDetected ? 'text-error' : 'text-success'}`}>
                          {transaction.geolocation.vpnDetected ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investigation Notes */}
                {transaction.notes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Investigation Notes</h4>
                    <div className="space-y-2">
                      {transaction.notes.map((note, index) => (
                        <div key={index} className="p-2 bg-muted/20 rounded text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{note.author}</span>
                            <span className="text-muted-foreground">
                              {note.timestamp.toLocaleString()}
                            </span>
                          </div>
                          <p>{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Shield" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg text-card-foreground mb-2">
            No High-Risk Transactions
          </h3>
          <p className="text-muted-foreground">
            All transactions are currently within acceptable risk parameters.
          </p>
        </div>
      )}
    </div>
  );
};

export default HighRiskTransactionQueue;