/**
 * Placeholder for Supabase-generated TypeScript types.
 *
 * Once the database schema is created, regenerate this file with:
 *   npx supabase gen types typescript --project-id <PROJECT_ID> > types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
