import { AsyncStatus } from ".";

export interface createUserInterface {
  username: string;
  password?: string;
  email: string;
  names: string;
  surnames: string;
  roleIds?: string[];
}

export interface UserState {
  status: AsyncStatus;
  error: null | string;
}

export interface Users {
  data: UserDB[];
  totalSearch: number;
  total: number;
  limit: number;
  page: number;
  pages: number;
  searchTerm?: string;
}

export interface UserDB {
  id: string;
  username: string;
  password: string;
  email: string;
  names: string;
  surnames: string;
  status: string;
  isOnline: boolean;
  attemps: number;
  portNumber: null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  roles: Role[];
  institution: Institution;
}

export interface Institution {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}
