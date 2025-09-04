export interface Institution {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface Institutions {
  data: Institution[];
  totalResults: number;
  totalAll: number;
  limit: number;
  page: number;
  pages: number;
  order: string;
}

export interface CreateInstitution {
  name: string;
  description: string;
}