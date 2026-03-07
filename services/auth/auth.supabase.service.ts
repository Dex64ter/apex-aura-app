// services/auth/auth.supabase.service.ts
import { SignUpData } from '@/models/auth/authModels'
import { supabase } from '@/utils/supabase'
import { Provider } from '@supabase/supabase-js'
import type { IAuthService } from './auth.service'

export const AuthSupabaseService: IAuthService = {
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },
  
  signWithOAuth: async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) throw error
    return data
  },

  signUp: async ({firstName, lastName, email, password}: SignUpData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    })
    
    if (error) throw error
    return data
  },
  
  signOut: async () => {
    await supabase.auth.signOut()
  },
}