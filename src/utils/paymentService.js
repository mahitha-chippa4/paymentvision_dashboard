import { supabase } from './supabase';

const paymentService = {
  // Get payments with filters and pagination
  async getPayments(filters = {}, page = 1, limit = 10) {
    try {
      let query = supabase
        .from('payments')
        .select(`
          *,
          user_profiles!payments_user_id_fkey(
            id,
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters.payment_method && filters.payment_method !== 'all') {
        query = query.eq('payment_method', filters.payment_method);
      }

      if (filters.date_from) {
        query = query.gte('created_at', filters.date_from);
      }

      if (filters.date_to) {
        query = query.lte('created_at', filters.date_to);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        data: data || [], 
        count,
        hasMore: count > page * limit
      };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load payments' };
    }
  },

  // Get single payment by ID
  async getPayment(paymentId) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          user_profiles!payments_user_id_fkey(
            id,
            full_name,
            email
          )
        `)
        .eq('id', paymentId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load payment details' };
    }
  },

  // Create new payment
  async createPayment(paymentData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { success: false, error: 'User not authenticated' };
      }

      const payment = {
        user_id: user.id,
        amount: paymentData.amount,
        receiver: paymentData.receiver,
        status: paymentData.status || 'pending',
        payment_method: paymentData.payment_method,
        description: paymentData.description || '',
        transaction_id: `TXN${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`
      };

      const { data, error } = await supabase
        .from('payments')
        .insert([payment])
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to create payment' };
    }
  },

  // Update payment
  async updatePayment(paymentId, updates) {
    try {
      const { data, error } = await supabase
        .from('payments')
        .update(updates)
        .eq('id', paymentId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to update payment' };
    }
  },

  // Delete payment
  async deletePayment(paymentId) {
    try {
      const { error } = await supabase
        .from('payments')
        .delete()
        .eq('id', paymentId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to delete payment' };
    }
  },

  // Get payment statistics
  async getPaymentStats() {
    try {
      const { data, error } = await supabase.rpc('get_payment_stats');

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load payment statistics' };
    }
  }
};

export default paymentService;