import { create } from 'zustand';

export interface CustomerCoupon {
  id?: string;
  name: string;
  phone_number: string;
  recommended_product: string;
  is_used: boolean;
  created_at?: string;
  updated_at?: string;
  used_at?: string;
}

interface CouponStore {
  currentCustomer: CustomerCoupon | null;
  isLoading: boolean;
  error: string | null;
  setCurrentCustomer: (customer: CustomerCoupon) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearStore: () => void;
}

export const useCouponStore = create<CouponStore>((set) => ({
  currentCustomer: null,
  isLoading: false,
  error: null,
  setCurrentCustomer: (customer) => set({ currentCustomer: customer }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearStore: () => set({ currentCustomer: null, isLoading: false, error: null }),
}));