import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Lazy load all pages for faster initial load
const DashboardScreen = lazy(() => import("pages/DashboardScreen"));
const LoginScreen = lazy(() => import("pages/LoginScreen"));
const SignupScreen = lazy(() => import("pages/SignupScreen"));
const TransactionListScreen = lazy(() => import("pages/TransactionListScreen"));
const TransactionDetailsScreen = lazy(() => import("pages/TransactionDetailsScreen"));
const AddPaymentScreen = lazy(() => import("pages/AddPaymentScreen"));
const UsersScreen = lazy(() => import("pages/UsersScreen"));
const RevenueAnalyticsDashboard = lazy(() => import("pages/revenue-analytics-dashboard"));
const PaymentOperationsOverviewDashboard = lazy(() => import("pages/payment-operations-overview-dashboard"));
const TransactionMonitoringFraudDetectionDashboard = lazy(() => import("pages/transaction-monitoring-fraud-detection-dashboard"));
const NotFound = lazy(() => import("pages/NotFound"));

// Simple loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <div className="text-lg text-gray-600">Loading...</div>
    </div>
  </div>
);

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;