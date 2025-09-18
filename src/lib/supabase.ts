import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      customer_coupons: {
        Row: {
          id: string
          name: string
          phone_number: string
          recommended_product: string
          is_used: boolean
          created_at: string
          updated_at: string
          used_at: string | null
        }
        Insert: {
          id?: string
          name: string
          phone_number: string
          recommended_product: string
          is_used?: boolean
          created_at?: string
          updated_at?: string
          used_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          phone_number?: string
          recommended_product?: string
          is_used?: boolean
          created_at?: string
          updated_at?: string
          used_at?: string | null
        }
      }
    }
  }
}