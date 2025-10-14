import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { activExtractionRules, setUpdateInstitution, setUpdatePermission, setUpdateRol, setUpdateUser } from "../../store/slices/admin/admin.slice";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

export interface ButtonConfig {
  text: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  onClick: () => void;
  requiredPermissions: { action: string; resource: string }[];
}


export const useSettingsButtonConfig = (): ButtonConfig => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  if (location.pathname.includes("/settings/users")) {
      return {
        text: "Crear usuario",
        icon: PersonAddOutlinedIcon,
        onClick: () => dispatch(setUpdateUser({ type: "create" })),
        requiredPermissions: [{ action: "create", resource: "user" }],
      };
    }
    if (location.pathname.includes("/settings/institutions")) {
      return {
        text: "Crear institución",
        icon: DomainAddOutlinedIcon,
        onClick: () => dispatch(setUpdateInstitution({ type: "create" })),
        requiredPermissions: [{ action: "create", resource: "institution" }],
      };
    }
    if (location.pathname.includes("/settings/roles")) {
      return {
        text: "Crear rol",
        icon: AddModeratorOutlinedIcon,
        onClick: () => dispatch(setUpdateRol({ type: "create" })),
        requiredPermissions: [{ action: "create", resource: "rol" }],
      };
    }
    if (location.pathname.includes("/settings/permissions")) {
      return {
        text: "Crear permiso",
        icon: VpnKeyOutlinedIcon,
        onClick: () => dispatch(setUpdatePermission({ type: "create" })),
        requiredPermissions: [{ action: "create", resource: "permission" }],
      };
    }
    if (location.pathname.includes("/settings/rule")) {
      return {
      text: "Crear regla",
      icon: SaveOutlinedIcon,
      onClick: () => dispatch(activExtractionRules(true)),
      requiredPermissions: [{action: "create", resource: "user"}],
    };
    }
    return {
      text: "Acción",
      icon: PersonAddOutlinedIcon,
      onClick: () => console.log("Acción genérica"),
      requiredPermissions: [],
    };
}
