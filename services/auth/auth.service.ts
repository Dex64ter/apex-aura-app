import { CreateUserDTO } from "@/models/auth/authModels"

export interface NestAuthService {
  signIn(email: string, password: string): Promise<any>
  signWithOAuth(provider: string): Promise<any>
  signUp(createUser: CreateUserDTO, token: string): Promise<any>
  requestCode(email: string): Promise<any>
  verifyCode(email: string, code: string): Promise<{tempToken: string}>
}