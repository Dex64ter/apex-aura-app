import { SignUpData, TypeSessionSupabase } from "@/models/auth/authModels"
import { Provider } from "@supabase/supabase-js"

export interface IAuthService {
  signIn(email: string, password: string): Promise<TypeSessionSupabase>
  signWithOAuth(provider: Provider): Promise<any>
  signUp(data: SignUpData): Promise<any>
  signOut(): Promise<void | any>
}