export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      papers: {
        Row: {
          arxiv_id: string
          arxiv_tags: string[]
          authors: string[]
          submitted_on: string
          title: string
        }
        Insert: {
          arxiv_id: string
          arxiv_tags: string[]
          authors: string[]
          submitted_on: string
          title: string
        }
        Update: {
          arxiv_id?: string
          arxiv_tags?: string[]
          authors?: string[]
          submitted_on?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          last_online: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          last_online?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          last_online?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
