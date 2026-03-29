import { Session, User, WeakPassword } from "@supabase/supabase-js";

interface TypeSessionSupabase {
  user: User;
  session: Session;
  weakPassword?: WeakPassword | undefined;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  isVerified?: boolean;
}

export type { CreateUserDTO, SignUpData, TypeSessionSupabase };

