import { Database } from '@/database.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState, Platform } from 'react-native'

// @ts-ignore
// const storage = new MMKV({ id: 'supabase-storage' })

// const MMKVStorageAdapter = {
//   getItem: (key: string) => storage.getString(key) ?? null,
//   setItem: (key: string, value: string) => storage.set(key, value),
//   removeItem: (key: string) => storage.delete(key),
// }

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    // storage: Platform.OS !== 'web' ? MMKVStorageAdapter : localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  })
}