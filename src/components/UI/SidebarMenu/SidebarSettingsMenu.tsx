import { Box } from "@mui/material";
import { SidebarSettingsMenuItem } from "./SidebarSettingsMenuItem";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const settingsMenu = [
  {
    label: "Usuarios",
    icon: GroupsOutlinedIcon,
    active: true
  },
  {
    label: "Instituciones",
    icon:  BusinessOutlinedIcon,
    active: false
  },
  {
    label: "Roles",
    icon: AdminPanelSettingsOutlinedIcon,
    active: false
  },
  {
    label: "Permisos",
    icon: VpnKeyOutlinedIcon,
    active: false
  },
];

export const SidebarSettingsMenu = () => {
  return (
    <Box>
      <Box
        sx={{ px: 2, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
      >
        {settingsMenu.map((item) => (
          <SidebarSettingsMenuItem {...item} key={item.label} />
        ))}
      </Box>
    </Box>
  );
};
