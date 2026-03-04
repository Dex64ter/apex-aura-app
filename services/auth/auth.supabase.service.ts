// services/auth/auth.supabase.service.ts
import { supabase } from '@/utils/supabase'
import type { IAuthService } from './auth.service'
import { Provider } from '@supabase/supabase-js'

export const AuthSupabaseService: IAuthService = {
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data.user
  },
  
  signWithOAuth: async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) throw error
    return data
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data.user
  },
  
  signOut: async () => {
    await supabase.auth.signOut()
  },
}