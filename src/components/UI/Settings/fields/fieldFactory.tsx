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
  key?: React.Key;
}

export const createFieldComponent = ({
  field,
  formData,
  setFormData,
  additionalProps = {},
  key
}: CreateFieldComponentProps) => {
  const commonProps = { field, formData, setFormData, ...additionalProps };

  switch (field.type) {
    case "text":
      return <TextFieldComponent key={key} {...commonProps} />;
      
    case "password":
      return <PasswordFieldComponent key={key} {...commonProps} />;
      
    case "select":
      return <SelectFieldComponent key={key} {...commonProps} />;
      
    case "institutionSelect":
      return <InstitutionSelectComponent key={key} {...commonProps} />;
      
    case "actionSelect":
      return <ActionSelectComponent key={key} {...commonProps} />;
      
    case "resourceSelect":
      return <ResourceSelectComponent key={key} {...commonProps} />;
      
    case "permissionSelect":
      return <PermissionSelectComponent key={key} {...commonProps} />;
      
    case "roleSelect":
      return <RoleSelectComponent key={key} {...commonProps} />;
      
    default:
      return null;
  }
};