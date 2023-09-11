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
          currently_reading: string | null
          following_tags: string[]
          following_users: string[]
          id: string
          last_online: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          currently_reading?: string | null
          following_tags?: string[]
          following_users?: string[]
          id: string
          last_online?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          currently_reading?: string | null
          following_tags?: string[]
          following_users?: string[]
          id?: string
          last_online?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_paper_id"
            columns: ["currently_reading"]
            referencedRelation: "papers"
            referencedColumns: ["arxiv_id"]
          },
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
      follow_tag: {
        Args: {
          tag_name: string
        }
        Returns: {
          avatar_url: string | null
          currently_reading: string | null
          following_tags: string[]
          following_users: string[]
          id: string
          last_online: string | null
          username: string | null
        }
      }
      unfollow_tag: {
        Args: {
          tag_name: string
        }
        Returns: {
          avatar_url: string | null
          currently_reading: string | null
          following_tags: string[]
          following_users: string[]
          id: string
          last_online: string | null
          username: string | null
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
