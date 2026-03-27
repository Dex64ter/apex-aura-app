const production = {
  provider: 'nest' as 'nest' | 'supabase',
  nest: {
    apiUrl: 'http://localhost:8080',
    timeout: 10000,
  }
}

export default production