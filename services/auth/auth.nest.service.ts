// services/auth/auth.nest.service.ts
import { TypeSessionSupabase } from '@/models/auth/authModels'
import { User } from '@/models/users/users'
import { apiClient } from '@/services/http/api'
import type { IAuthService } from './auth.service'

export const AuthNestService: IAuthService = {
  signIn: async (email, password) => {
    const { data } = await apiClient.post<{session: any, user: User}>(
      '/auth/login',
      { email, password }
    )
    return data as TypeSessionSupabase
  },
  signWithOAuth: async (provider) => {
    const { data } = await apiClient.get(`/auth/oauth/${provider}`)
    // Aqui precisamos lidar com o redirecionamento para o provedor OAuth
    // e a troca de tokens, dependendo de como seu backend está configurado.
    return data.user as any
  },
  signUp: async (email, password) => {
    const { data } = await apiClient.post('/auth/register', { email, password })
    return data
  },
  signOut: async () => {
    await apiClient.post('/auth/logout')
  },
}