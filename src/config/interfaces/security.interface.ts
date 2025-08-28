export interface Rol {
    id:          string;
    name:        string;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    deletedAt:   null;
    permissions: PermissionRol[];
}

export interface PermissionRol {
    id:          number;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    deletedAt:   null;
}

export interface Permission {
    id:          number;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    deletedAt:   null;
    action:      Action;
    resource:    Action;
}

export interface Action {
    id:          number;
    name:        string;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    deletedAt:   null;
}
