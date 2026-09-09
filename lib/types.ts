export interface AppConfig {
  id: number
  user_id: number
  guid: string | null
  account: string
  encrypted_password?: string
  source_type: string
  region: string
  is_active: boolean
  master: boolean
  access_token: string | null
  access_token_expires_at: string | null
  refresh_token: string | null
  refresh_token_expires_at: string | null
  oauth_token: string | null
  oauth_token_secret: string | null
  secret_string: string | null
  total_count: number
  created_at: string
  updated_at: string
  last_synced_at: string | null
}

export interface TaskItem {
  id: number
  user_id: number
  connect_source_id: number
  connect_target_id: number
  hour: number
  is_active: boolean
  created_at: string
  updated_at?: string
}
