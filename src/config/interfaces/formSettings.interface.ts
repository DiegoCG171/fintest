export type FieldType =
  | "text"
  | "select"
  | "institutionSelect"
  | "actionSelect"
  | "resourceSelect"
  | "permissionSelect"
  | "roleSelect"
  | "password";

export type StoreKey =
  | "updateUser"
  | "updateInstitution"
  | "updateRol"
  | "updatePermission"
  | "createUser"
  | "createInstitution"
  | "createRol"
  | "createPermission";

export interface FormField {
  type: FieldType;
  name: string;
  label: string;
  options?: { value: string; label: string }[];
}

export interface FormConfig {
  title: string;
  description: string;
  confirmText: string;
  storeKey: StoreKey;
  fields: FormField[];
}

export interface FormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface FieldComponentProps {
  field: FormField;
  formData: FormData;
  setFormData: (updater: (prev: FormData) => FormData) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}