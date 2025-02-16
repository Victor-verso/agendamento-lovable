
export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: 'cabelo' | 'barba' | 'outros';
  created_at: string;
  updated_at: string;
  image_url?: string | null;
};

export type ServiceImage = {
  id: string;
  service_id: string;
  image_url: string;
  is_before: boolean;
  created_at: string;
};

export type Professional = {
  id: string;
  name: string;
  photo_url: string | null;
  experience_years: number;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfessionalPortfolio = {
  id: string;
  professional_id: string;
  image_url: string;
  description: string | null;
  created_at: string;
};

export type Review = {
  id: string;
  client_id: string;
  service_id: string;
  professional_id: string;
  appointment_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export type ClientProfile = {
  id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
};
