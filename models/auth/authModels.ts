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

export type { SignUpData, TypeSessionSupabase };

