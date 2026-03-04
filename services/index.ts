import env from '@/environments'

// Auth
import { AuthNestService } from './auth/auth.nest.service'
import { AuthSupabaseService } from './auth/auth.supabase.service'

// // Teams
// import { TeamsNestService } from './teams/teams.nest.service'
// import { TeamsSupabaseService } from './teams/teams.supabase.service'

const isNest = env.provider === 'nest'

export const AuthService = isNest ? AuthNestService : AuthSupabaseService
// export const TeamsService = isNest ? TeamsNestService : TeamsSupabaseService