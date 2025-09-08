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
  totalSearch: number;
  total: number;
  limit: number;
  page: number;
  pages: number;
  searchTerm?: string;
}

export interface CreateInstitution {
  name: string;
  description: string;
}