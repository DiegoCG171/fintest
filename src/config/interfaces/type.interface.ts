import { SelectProps, TextFieldProps } from "@mui/material";
import { ReactNode } from "react";
import { serviceConfig } from "../utils/serviceConfig";
import { ItemsServiceMenu, MenuServiceInterface } from "./menu.interface";
import { ColumnDynamicConfig, TableRowDataOld } from "./tables.interface";

//Default Props

export interface WithChildrenProps {
  children: ReactNode;
}
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface FormValues {
  [rootKey: string]: Record<string, Record<string, unknown>>;
}

export type FormRefHandle = {
  submitForm: () => void;
};

//Form props
export type CustomCheckboxProps = {
  id?: string;
  label?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: "primary" | "secondary" | "default";
  size?: "small" | "medium";
  required?: boolean;
  errorMessage?: string;
};

export type CustomTextFieldProps = TextFieldProps & {
  label?: string;
  id: string;
  error?: boolean;
  helperText?: React.ReactNode;
  endIconType?: "password" | "validation";
  isValid?: boolean;
  inputSize?: InputSize;
};

export type CustomSelectProps = SelectProps & {
  label?: string;
  defaultValue?: string;
  id: string;
  error?: boolean;
  helperText?: React.ReactNode;
  isValid?: boolean;
  inputSize?: "small" | "medium";
  options: OptionsSelect;
};

export interface OptionsSelect {
  [key: string]: string | number;
}

export type InputSize = "sm" | "default" | "lg";

export interface StyleObject {
  mb: number;
  fontSize: string;
  fontWeight: string;
}

export interface DynamicFieldPropsOld {
  name: string;
  label?: string;
  row?: TableRowDataOld;
  column?: ColumnDynamicConfig;
  id: string | number;
  parentPath: string;
  isVisible?: boolean;
}

//Toast props

export type ToastType = "success" | "error" | "warning" | "info";
export interface ToastState {
  open: boolean;
  message: string;
  type: ToastType;
}
export interface ToastContextType {
  initToast: (message: string, type?: ToastType) => void;
  closeToast: () => void;
  showToast: (
    message: string,
    type?: ToastType,
    duration?: number
  ) => void;
}

// UI props
export interface HeaderComponentProps {
  alerts: number;
}
export interface TextBoxProps {
  title: string;
  welcomeText: string;
  description: React.ReactNode;
  align?: string;
}

//Middelware or handlers

export type DataMiddlewareProps = {
  payload?: {
    [key: string]: string | boolean | null | number | undefined;
  };
  dataCase: string;
  templateId: string;
  formType: string;
};

export type dataServiceType = keyof typeof serviceConfig;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type originType = 'collections' | 'categories';


//Tree Selector
export interface CategoriesTreeSelectorProps {
  root: MenuServiceInterface[];
  onItemSelected: (item: ItemsServiceMenu) => void;
  preselectedItemId?: string;
}

export interface CategoriesFormJSONProps {
    onSelectCategory: (categoryId: string) => void;
    onSetTemplateName: (name: string) => void;
    templateName: string;
    showError: boolean;
    preselectedItemId?: string;
}

export type BreadcrumbComponentProps = {
    pathNames: string[]
};
