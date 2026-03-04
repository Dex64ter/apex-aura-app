import { Provider, User } from "@supabase/supabase-js"

export interface IAuthService {
  signIn(email: string, password: string): Promise<User>
  signWithOAuth(provider: Provider): Promise<any>
  signUp(email: string, password: string): Promise<User | null>
  signOut(): Promise<void>
}