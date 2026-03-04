const production = {
  provider: 'nest' as 'nest' | 'supabase',
  nest: {
    apiUrl: 'http://localhost:3000',
    timeout: 10000,
  },
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    key: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
}

export default production