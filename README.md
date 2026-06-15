# PaymentVision Dashboard

A comprehensive payment management and analytics dashboard built with React, Supabase, and modern web technologies.

## 🚀 Features

- **React 18** - Modern React with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Supabase** - Backend-as-a-Service for authentication and database
- **Tailwind CSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Recharts** - Powerful data visualization library
- **Framer Motion** - Smooth UI animations
- **Authentication System** - User login, signup, and role-based access control
- **Payment Management** - Create, view, and manage payment transactions
- **Analytics Dashboards** - Revenue analytics, operations overview, and fraud detection

## 📋 Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Supabase account (free tier available at [supabase.com](https://supabase.com))

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd paymentvision_dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the migration file located at `supabase/migrations/20250726141453_payment_management_system.sql` in your Supabase SQL editor
   - Get your project credentials from Project Settings > API

4. Configure environment variables:
   Create a `.env` file in the root directory with:
   ```
   VITE_SUPABASE_URL=your-supabase-url-here
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

5. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:4028`

## 📁 Project Structure

```
paymentvision_dashboard/
├── public/                      # Static assets
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Base UI components (Button, Input, etc.)
│   │   ├── AppIcon.jsx         # Icon wrapper component
│   │   ├── ErrorBoundary.jsx   # Error boundary component
│   │   └── ScrollToTop.jsx     # Scroll to top utility
│   ├── contexts/               # React contexts
│   │   └── AuthContext.jsx     # Authentication context
│   ├── pages/                  # Page components
│   │   ├── DashboardScreen.jsx # Main dashboard
│   │   ├── LoginScreen.jsx     # User login
│   │   ├── SignupScreen.jsx    # User registration
│   │   ├── TransactionListScreen.jsx
│   │   ├── TransactionDetailsScreen.jsx
│   │   ├── AddPaymentScreen.jsx
│   │   ├── UsersScreen.jsx
│   │   ├── revenue-analytics-dashboard/
│   │   ├── payment-operations-overview-dashboard/
│   │   └── transaction-monitoring-fraud-detection-dashboard/
│   ├── utils/                  # Utility functions
│   │   ├── supabase.js         # Supabase client
│   │   ├── authService.js      # Authentication service
│   │   ├── paymentService.js   # Payment operations
│   │   └── cn.js               # className utility
│   ├── styles/                 # Global styles
│   ├── App.jsx                 # Main application component
│   ├── Routes.jsx              # Application routes
│   └── index.jsx               # Application entry point
├── supabase/
│   └── migrations/             # Database migrations
├── .env                         # Environment variables (create this)
├── package.json                 # Project dependencies
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.mjs             # Vite configuration
```

## 🔐 Authentication

The application includes a complete authentication system with:

- **User Registration** - Create new accounts with role-based access (admin, manager, member)
- **Login System** - Secure email/password authentication
- **Protected Routes** - Role-based access control
- **Session Management** - Automatic session handling

### Demo Credentials (after running migrations):
- **Admin**: admin@payment.com / admin123
- **User**: user@payment.com / user123

## 💳 Payment Management

Features:
- Create and manage payment transactions
- View transaction history with filters
- Track payment status (success, failed, pending)
- Support for multiple payment methods (Credit Card, Debit Card, Bank Transfer, PayPal, Crypto)
- Transaction details with full audit trail

## 📊 Analytics Dashboards

### Revenue Analytics Dashboard
- Revenue metrics and KPIs
- Payment method breakdown
- Revenue forecasting
- Geographic performance analysis

### Payment Operations Overview
- Real-time transaction monitoring
- Success rate tracking
- Processing time analytics
- System health monitoring

### Fraud Detection Dashboard
- Risk score analysis
- Geographic risk mapping
- High-risk transaction queue
- Fraud metrics and alerts

## 🎨 Customization

The application uses a custom design system with CSS variables defined in `src/styles/tailwind.css`. You can customize:
- Colors (background, foreground, primary, secondary, etc.)
- Border radius
- Typography
- Animations

## 📦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Preview production build

## 🐛 Troubleshooting

### Supabase Connection Issues
If you see "Cannot connect to database" errors:
1. Verify your `.env` file has correct Supabase credentials
2. Check that your Supabase project is active (not paused)
3. Ensure Row Level Security policies are properly configured
4. Run the migration SQL in your Supabase SQL editor

### Build Errors
If you encounter build errors:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear Vite cache if needed

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

The production build will be in the `build` directory.

### Vercel Deployment
1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel settings
4. Deploy!

### Environment Variables
Make sure to add these in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📝 License

This project is part of the PaymentVision ecosystem.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## Screenshots

<img width="2666" height="1608" alt="image" src="https://github.com/user-attachments/assets/a169aeac-e173-4eb5-96f6-2f071a2b3869" />
<img width="1265" height="607" alt="Screenshot 2025-07-26 at 8 21 36 PM" src="https://github.com/user-attachments/assets/7fef515e-d559-4295-ab66-997bcdfef923" />
<img width="1263" height="651" alt="Screenshot 2025-07-26 at 8 32 21 PM" src="https://github.com/user-attachments/assets/be9775d4-8f8d-4ba4-8e1e-4a87712b22aa" />
<img width="1303" height="821" alt="Screenshot 2025-07-26 at 8 21 03 PM" src="https://github.com/user-attachments/assets/a70dcacf-35a1-4b77-848a-e224a331e22c" />
