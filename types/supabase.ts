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
      comments: {
        Row: {
          article: string
          author: string
          content: Json
          id: string
          parent_comment: string | null
          posted_at: string
        }
        Insert: {
          article: string
          author?: string
          content: Json
          id?: string
          parent_comment?: string | null
          posted_at?: string
        }
        Update: {
          article?: string
          author?: string
          content?: Json
          id?: string
          parent_comment?: string | null
          posted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_article_fkey"
            columns: ["article"]
            referencedRelation: "papers"
            referencedColumns: ["arxiv_id"]
          },
          {
            foreignKeyName: "comments_author_fkey"
            columns: ["author"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_parent"
            columns: ["parent_comment"]
            referencedRelation: "comments"
            referencedColumns: ["id"]
          }
        ]
      }
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
          username: string
        }
        Insert: {
          avatar_url?: string | null
          currently_reading?: string | null
          following_tags?: string[]
          following_users?: string[]
          id: string
          last_online?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          currently_reading?: string | null
          following_tags?: string[]
          following_users?: string[]
          id?: string
          last_online?: string | null
          username?: string
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
          username: string
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
          username: string
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
