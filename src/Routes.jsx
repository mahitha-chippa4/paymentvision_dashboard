import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import RevenueAnalyticsDashboard from "pages/revenue-analytics-dashboard";
import PaymentOperationsOverviewDashboard from "pages/payment-operations-overview-dashboard";
import TransactionMonitoringFraudDetectionDashboard from "pages/transaction-monitoring-fraud-detection-dashboard";
import NotFound from "pages/NotFound";

// Payment Management Dashboard imports
import LoginScreen from "pages/LoginScreen";
import SignupScreen from "pages/SignupScreen";
import DashboardScreen from "pages/DashboardScreen";
import TransactionListScreen from "pages/TransactionListScreen";
import TransactionDetailsScreen from "pages/TransactionDetailsScreen";
import AddPaymentScreen from "pages/AddPaymentScreen";
import UsersScreen from "pages/UsersScreen";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<DashboardScreen />} />
        
        {/* Payment Management Dashboard Routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/transactions" element={<TransactionListScreen />} />
        <Route path="/transaction/:id" element={<TransactionDetailsScreen />} />
        <Route path="/add-payment" element={<AddPaymentScreen />} />
        <Route path="/users" element={<UsersScreen />} />
        
        {/* Existing Analytics Dashboard Routes */}
        <Route path="/revenue-analytics-dashboard" element={<RevenueAnalyticsDashboard />} />
        <Route path="/payment-operations-overview-dashboard" element={<PaymentOperationsOverviewDashboard />} />
        <Route path="/transaction-monitoring-fraud-detection-dashboard" element={<TransactionMonitoringFraudDetectionDashboard />} />
        
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;