import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeographicRiskMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [mapView, setMapView] = useState('risk'); // 'risk', 'volume', 'incidents'

  const riskData = [
    {
      id: 'us-west',
      region: 'US West Coast',
      country: 'United States',
      riskLevel: 'low',
      riskScore: 2.1,
      transactions: 15420,
      incidents: 23,
      coordinates: { lat: 37.7749, lng: -122.4194 },
      details: {
        topRiskFactors: ['Unusual transaction patterns', 'New device usage'],
        recentIncidents: 5,
        blockRate: '1.2%'
      }
    },
    {
      id: 'us-east',
      region: 'US East Coast',
      country: 'United States',
      riskLevel: 'medium',
      riskScore: 4.3,
      transactions: 18750,
      incidents: 67,
      coordinates: { lat: 40.7128, lng: -74.0060 },
      details: {
        topRiskFactors: ['High-value transactions', 'Multiple failed attempts'],
        recentIncidents: 12,
        blockRate: '3.1%'
      }
    },
    {
      id: 'europe',
      region: 'Western Europe',
      country: 'Multiple',
      riskLevel: 'low',
      riskScore: 1.8,
      transactions: 12340,
      incidents: 18,
      coordinates: { lat: 48.8566, lng: 2.3522 },
      details: {
        topRiskFactors: ['Cross-border transactions', 'Currency conversion'],
        recentIncidents: 3,
        blockRate: '0.9%'
      }
    },
    {
      id: 'asia-pacific',
      region: 'Asia Pacific',
      country: 'Multiple',
      riskLevel: 'high',
      riskScore: 7.2,
      transactions: 9870,
      incidents: 142,
      coordinates: { lat: 35.6762, lng: 139.6503 },
      details: {
        topRiskFactors: ['Suspicious IP addresses', 'Velocity checks failed'],
        recentIncidents: 28,
        blockRate: '8.4%'
      }
    },
    {
      id: 'south-america',
      region: 'South America',
      country: 'Multiple',
      riskLevel: 'medium',
      riskScore: 5.1,
      transactions: 6540,
      incidents: 45,
      coordinates: { lat: -23.5505, lng: -46.6333 },
      details: {
        topRiskFactors: ['Card testing attempts', 'Geolocation mismatches'],
        recentIncidents: 8,
        blockRate: '4.2%'
      }
    }
  ];

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-success';
      case 'medium':
        return 'bg-warning';
      case 'high':
        return 'bg-error';
      default:
        return 'bg-muted';
    }
  };

  const getRiskTextColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const mapViewOptions = [
    { value: 'risk', label: 'Risk Levels', icon: 'Shield' },
    { value: 'volume', label: 'Transaction Volume', icon: 'BarChart3' },
    { value: 'incidents', label: 'Fraud Incidents', icon: 'AlertTriangle' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            Geographic Risk Distribution
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time fraud risk analysis by region
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {mapViewOptions.map((option) => (
            <Button
              key={option.value}
              variant={mapView === option.value ? 'default' : 'outline'}
              size="sm"
              iconName={option.icon}
              onClick={() => setMapView(option.value)}
              className="text-xs"
            >
              <span className="hidden lg:inline ml-1">{option.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="relative bg-muted/20 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            {/* Google Maps Iframe */}
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Global Risk Distribution Map"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7128,-74.0060&z=2&output=embed"
              className="rounded-lg"
            />
            
            {/* Risk Level Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none" />
            
            {/* Risk Indicators */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2">Risk Legend</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-xs">Low Risk (0-3)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-xs">Medium Risk (3-6)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span className="text-xs">High Risk (6+)</span>
                </div>
              </div>
            </div>

            {/* Live Update Indicator */}
            <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Live Updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Risk Summary */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-card-foreground">Regional Analysis</h3>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {riskData.map((region) => (
              <div
                key={region.id}
                className={`p-4 border rounded-lg cursor-pointer transition-smooth hover:shadow-md ${
                  selectedRegion === region.id 
                    ? 'border-primary bg-primary/5' :'border-border bg-card'
                }`}
                onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-sm text-card-foreground">
                      {region.region}
                    </h4>
                    <p className="text-xs text-muted-foreground">{region.country}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(region.riskLevel)} text-white`}>
                    {region.riskLevel.toUpperCase()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Risk Score:</span>
                    <span className={`ml-1 font-medium ${getRiskTextColor(region.riskLevel)}`}>
                      {region.riskScore}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Incidents:</span>
                    <span className="ml-1 font-medium text-card-foreground">
                      {region.incidents}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Volume:</span>
                    <span className="ml-1 font-medium text-card-foreground">
                      {region.transactions.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Block Rate:</span>
                    <span className="ml-1 font-medium text-error">
                      {region.details.blockRate}
                    </span>
                  </div>
                </div>

                {selectedRegion === region.id && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <h5 className="font-medium text-xs mb-2">Top Risk Factors:</h5>
                    <ul className="space-y-1">
                      {region.details.topRiskFactors.map((factor, index) => (
                        <li key={index} className="flex items-center space-x-2 text-xs">
                          <Icon name="AlertCircle" size={12} className="text-warning" />
                          <span className="text-muted-foreground">{factor}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        Recent incidents: {region.details.recentIncidents} (last 24h)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicRiskMap;