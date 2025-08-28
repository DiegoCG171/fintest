import { Box } from "@mui/material";
import { SidebarSettingsMenuItem } from "./SidebarSettingsMenuItem";

import { useAppSelector } from "../../../store";



export const SidebarSettingsMenu = () => {

  const {menuOptions} = useAppSelector(state => state.sidebarMenuSettings)

  return (
    <Box>
      <Box
        sx={{ px: 2, overflowY: "auto", flexGrow: 1, my: 4, marginRight: 1 }}
      >
        {menuOptions.map((item) => (
          <SidebarSettingsMenuItem {...item} key={item.label} />
        ))}
      </Box>  
    </Box>
  );
};
