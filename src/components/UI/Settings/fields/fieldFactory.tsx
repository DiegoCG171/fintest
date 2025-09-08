import { FormData, FormField } from "../../../../config/interfaces/formSettings.interface";
import { ActionSelectComponent } from "./ActionSelectComponent";
import { InstitutionSelectComponent } from "./InstitutionSelectComponent";
import { PasswordFieldComponent } from "./PasswordFieldComponent";
import { PermissionSelectComponent } from "./PermissionSelectComponent";
import { ResourceSelectComponent } from "./ResourceSelectComponent";
import { RoleSelectComponent } from "./RoleSelectComponent";
import { SelectFieldComponent } from "./SelectFieldComponent";
import { TextFieldComponent } from "./TextFieldComponent";


interface CreateFieldComponentProps {
  field: FormField;
  formData: FormData;
  setFormData: (updater: (prev: FormData) => FormData) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalProps?: any;
}

export const createFieldComponent = ({
  field,
  formData,
  setFormData,
  additionalProps = {},
}: CreateFieldComponentProps) => {
  const commonProps = { field, formData, setFormData, ...additionalProps };

  switch (field.type) {
    case "text":
      return <TextFieldComponent {...commonProps} />;
      
    case "password":
      return <PasswordFieldComponent {...commonProps} />;
      
    case "select":
      return <SelectFieldComponent {...commonProps} />;
      
    case "institutionSelect":
      return <InstitutionSelectComponent {...commonProps} />;
      
    case "actionSelect":
      return <ActionSelectComponent {...commonProps} />;
      
    case "resourceSelect":
      return <ResourceSelectComponent {...commonProps} />;
      
    case "permissionSelect":
      return <PermissionSelectComponent {...commonProps} />;
      
    case "roleSelect":
      return <RoleSelectComponent {...commonProps} />;
      
    default:
      return null;
  }
};