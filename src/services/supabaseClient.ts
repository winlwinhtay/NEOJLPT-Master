import { createClient, SupabaseClient } from '@supabase/supabase-js';

const getEnvVar = (key: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      return (import.meta as any).env[key] || '';
    }
  } catch {}
  return '';
};

const DEFAULT_SUPABASE_URL = 'https://rhidvvfdbilagdgzzzzg.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoaWR2dmZkYmlsYWdkZ3p6enpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NTIzMDksImV4cCI6MjEwNDUyODMwOX0.HT7Anhv-YeI7U-O1SQ73i2VZDWGk_usWkwlV7EjdKGw';

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabaseUrl.startsWith('https://') &&
      supabaseAnonKey &&
      supabaseAnonKey.length > 20 &&
      !supabaseUrl.includes('your-project-id')
  );
};

// Create client instance if configured, or a fallback stub
export const supabase: SupabaseClient = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createClient('https://placeholder.supabase.co', 'placeholder-anon-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

