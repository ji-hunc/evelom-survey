import { supabase } from './supabase';
import { CustomerCoupon } from '@/store/couponStore';

export async function testSupabaseConnection(): Promise<boolean> {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase
      .from('customer_coupons')
      .select('count', { count: 'exact' })
      .limit(1);

    console.log('Connection test result:', { data, error });

    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }

    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
    return false;
  }
}

export async function checkPhoneNumberExists(phoneNumber: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('customer_coupons')
      .select('id')
      .eq('phone_number', phoneNumber)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking phone number:', error);
    throw error;
  }
}

export async function createCustomerCoupon(customer: Omit<CustomerCoupon, 'id' | 'created_at' | 'updated_at' | 'used_at'>): Promise<CustomerCoupon> {
  try {
    const { data, error } = await supabase
      .from('customer_coupons')
      .insert({
        name: customer.name,
        phone_number: customer.phone_number,
        recommended_product: customer.recommended_product,
        is_used: false
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating customer coupon:', error);
    throw error;
  }
}

export async function updateCouponUsage(phoneNumber: string, isUsed: boolean): Promise<void> {
  try {
    const updateData: any = {
      is_used: isUsed,
    };

    if (isUsed) {
      updateData.used_at = new Date().toISOString();
    } else {
      updateData.used_at = null;
    }

    const { error } = await supabase
      .from('customer_coupons')
      .update(updateData)
      .eq('phone_number', phoneNumber);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error updating coupon usage:', error);
    throw error;
  }
}

export async function getCustomerByPhone(phoneNumber: string): Promise<CustomerCoupon | null> {
  try {
    console.log('Searching for customer with phone:', phoneNumber);
    const { data, error } = await supabase
      .from('customer_coupons')
      .select('*')
      .eq('phone_number', phoneNumber)
      .single();

    console.log('Supabase response:', { data, error });

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase error:', error);
      throw error;
    }

    return data || null;
  } catch (error) {
    console.error('Error getting customer by phone:', error);
    throw error;
  }
}