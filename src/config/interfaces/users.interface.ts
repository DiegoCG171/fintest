import { AsyncStatus } from ".";

export interface createUserInterface {
  username: string;
  password: string;
  email: string;
  names: string;
  surnames: string;
}

export interface UserState {
  status: AsyncStatus;
  error: null | string;
}

export interface Users {
  data: UserDB[];
  totalResults: number;
  totalAll: number;
  limit: number;
  page: number;
  pages: number;
  order: string;
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
