// services/auth/auth.nest.service.ts
import { CreateUserDTO } from '@/models/auth/authModels'
import { apiClient } from '@/services/http/api'
import type { NestAuthService } from './auth.service'

export const AuthNestService: NestAuthService = {
  signIn: async (email, password) => {
    console.log("[Login] Executing sign in")
    const { data } = await apiClient.post(
      '/auth/login',
      { email, password }
    )

    return data
  },

  signWithOAuth: async (provider) => {
    const { data } = await apiClient.get(`/auth/oauth/${provider}`)
    // Aqui precisamos lidar com o redirecionamento para o provedor OAuth
    // e a troca de tokens, dependendo de como seu backend está configurado.
    return data.user as any
  },

  signUp: async (dataUser: CreateUserDTO, token: string) => {
    const { data } = await apiClient.post('/auth/signup', dataUser, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    return data
  },

  requestCode: async (email: string) => {
    const response = await apiClient.post('/auth/request-code', email)
    console.log(response)
    return response
  },

  verifyCode: async (email, code) => {
    return apiClient.post('/auth/verify-code', { email, code })
  },
}