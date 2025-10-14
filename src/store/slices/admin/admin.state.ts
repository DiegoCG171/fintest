import { UserDB, Users } from "../../../config/interfaces";
import {
  Institutions,
  Institution,
} from "../../../config/interfaces/institutions.interface";
import {
  Action,
  Actions,
  Permission,
  Permissions,
  Resource,
  Resources,
  Rol,
  Roles,
  Rule,
  Rules,
} from "../../../config/interfaces/security.interface";

export interface AdminInitialState {
  formActive: boolean;
  extractionRulesActive?: boolean;
  users: Users;
  updateUser?: UserDB;
  institutions: Institutions;
  updateInstitution?: Institution;
  roles: Roles;
  updateRol?: Rol;
  permissions: Permissions;
  updatePermission?: Permission;
  actions: Actions;
  updateAction?: Action;
  resources: Resources;
  updateResource?: Resource;
  rules: Rules;
  updateRules?: Rule;
  type?: "update" | "create";
  searchTerm?: string;
}

export const initialAdminState: AdminInitialState = {
  formActive: false,
  extractionRulesActive: false,
  users: {
    data: [],
    total: 0,
    totalSearch: 0,
    limit: 5,
    page: 0,
    pages: 0,
  },
  institutions: {
    data: [],
    total: 0,
    totalSearch: 0,
    limit: 5,
    page: 0,
    pages: 0,
  },
  roles: {
    data: [],
    total: 0,
    totalSearch: 0,
    limit: 5,
    page: 0,
    pages: 0,
  },
  permissions: {
    data: [],
    menuOptions: [],
    total: 0,
    totalSearch: 0,
    limit: 5,
    page: 0,
    pages: 0,
  },
  actions: {
    data: [],
    total: 0,
    totalSearch: 0,
    limit: 5,
    page: 0,
    pages: 0,
  },
  resources: {
    data: [],
    total: 0,
    totalSearch: 0,
    limit: 5,
    page: 0,
    pages: 0,
  },
  rules: {
    data: [],
    total: 0,
    totalSearch: 0,
    limit: 5,
    page: 0,
    pages: 0,
  },
  updateUser: undefined,
  updateInstitution: undefined,
  updateRol: undefined,
  updatePermission: undefined,
  updateAction: undefined,
  updateResource: undefined,
  type: "update",
};
