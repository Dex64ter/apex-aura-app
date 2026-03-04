import { Session, User, WeakPassword } from "@supabase/supabase-js";

interface TypeSessionSupabase {
  user: User;
  session: Session;
  weakPassword?: WeakPassword | undefined;
}

export type { TypeSessionSupabase };
