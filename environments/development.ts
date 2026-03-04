const development = {
  provider: 'supabase', // 'nest' as 'nest'
  nest: {
    apiUrl: 'http://localhost:3000',
    timeout: 10000,
  },
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
    key: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
}

export default development