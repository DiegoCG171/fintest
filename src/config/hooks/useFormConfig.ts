import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FormConfig } from "../interfaces/formSettings.interface";
import { useAppSelector } from "../../store";
import { formConfigs, formConfigsCreate } from "../mock/formSettingsConfigs";

export const useFormConfig = (): FormConfig => {
  const location = useLocation();
  const { type } = useAppSelector((state) => state.admin);

  const configKey = useMemo(() => {
    const configs = type === "update" ? formConfigs : formConfigsCreate;
    const match = Object.keys(configs).find((path) => 
      location.pathname.includes(path)
    );
    return match || "/settings/users";
  }, [location.pathname, type]);

  return type === "update" ? formConfigs[configKey] : formConfigsCreate[configKey];
};