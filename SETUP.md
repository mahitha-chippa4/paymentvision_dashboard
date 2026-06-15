# Setup Instructions for PaymentVision Dashboard

## Quick Start Guide

Follow these steps to get the PaymentVision Dashboard up and running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

#### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `paymentvision-dashboard`
   - Database Password: (save this securely)
   - Region: (choose closest to you)

#### Step 2: Run Database Migration
1. In your Supabase project, go to SQL Editor
2. Click "New Query"
3. Open the file: `supabase/migrations/20250726141453_payment_management_system.sql`
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click "Run" or press Ctrl+Enter
7. Wait for "Success" message

#### Step 3: Get Your Credentials
1. In Supabase, go to Project Settings > API
2. Copy the following values:
   - `Project URL` (this is your `VITE_SUPABASE_URL`)
   - `anon` `public` key (this is your `VITE_SUPABASE_ANON_KEY`)

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** Replace the placeholder values with your actual Supabase credentials.

### 4. Start the Development Server

```bash
npm start
```

The application will be available at `http://localhost:4028`

## Testing the Application

### Preview Mode
The application works in "Preview Mode" without authentication, showing sample data.

### Full Features (Authentication Required)
1. Navigate to `/login`
2. Use demo credentials (created by the migration):
   - **Email:** `admin@payment.com`
   - **Password:** `admin123`

3. Or create a new account at `/signup`

## Demo Credentials

The migration creates two demo users:

- **Admin User**
  - Email: `admin@payment.com`
  - Password: `admin123`
  - Role: Admin (full access)

- **Regular User**
  - Email: `user@payment.com`
  - Password: `user123`
  - Role: Member (limited access)

## Available Routes

- `/` - Dashboard (redirects to `/dashboard`)
- `/dashboard` - Main dashboard
- `/login` - Login page
- `/signup` - Registration page
- `/transactions` - Transaction list
- `/transaction/:id` - Transaction details
- `/add-payment` - Create new payment
- `/users` - User management (admin only)
- `/revenue-analytics-dashboard` - Revenue analytics
- `/payment-operations-overview-dashboard` - Operations overview
- `/transaction-monitoring-fraud-detection-dashboard` - Fraud detection

## Troubleshooting

### Issue: "Cannot connect to Supabase"
**Solution:**
1. Check your `.env` file has correct values
2. Verify your Supabase project is active (not paused)
3. Ensure you ran the migration SQL

### Issue: "Failed to load user profile"
**Solution:**
1. Check that the `user_profiles` table exists
2. Verify Row Level Security policies are set up
3. Re-run the migration SQL

### Issue: Port already in use
**Solution:**
Change the port in `vite.config.mjs`:
```js
server: {
  port: "4029", // Use a different port
}
```

### Issue: Build errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm start
```

## Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

### Deploy to Netlify
1. Push your code to GitHub
2. Import repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add environment variables in Netlify
6. Deploy!

## Database Schema

The application uses the following main tables:

- `user_profiles` - User profile information
- `payments` - Payment transactions
- `users` - Additional user management data

See `supabase/migrations/20250726141453_payment_management_system.sql` for the complete schema.

## Need Help?

If you encounter issues:
1. Check the console for error messages
2. Verify your Supabase project status
3. Ensure all environment variables are set correctly
4. Review the migration file was executed successfully

## Next Steps

1. ✅ Complete setup
2. ✅ Test authentication
3. ✅ Create test payments
4. ✅ Explore analytics dashboards
5. Customize the design (modify `src/styles/tailwind.css`)
6. Add your own features!

Happy coding! 🚀


