import { createClient } from '@supabase/supabase-js';

// Verificar se as variáveis de ambiente estão disponíveis
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Criar cliente apenas se as credenciais estiverem disponíveis
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types para o banco de dados
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'basico' | 'premium' | 'pro';
  created_at: string;
}

export interface Pet {
  id: string;
  user_id: string;
  name: string;
  breed: string;
  weight: number;
  age: number;
  photo_url?: string;
  created_at: string;
}

export interface Vaccine {
  id: string;
  pet_id: string;
  name: string;
  date: string;
  next_date: string;
  veterinary: string;
  notes?: string;
  created_at: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  duration: number;
  level: 'basico' | 'intermediario' | 'avancado';
  category: string;
  thumbnail_url?: string;
  order: number;
  created_at: string;
}

export interface Progress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string;
  notes?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  plan: string;
  created_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  link: string;
  popular: boolean;
  created_at: string;
}
