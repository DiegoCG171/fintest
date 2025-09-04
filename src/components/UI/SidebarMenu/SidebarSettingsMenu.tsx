import { Box } from "@mui/material";
import { SidebarSettingsMenuItem } from "./SidebarSettingsMenuItem";

import { useAppDispatch, useAppSelector } from "../../../store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { changeActiveMenuOption } from "../../../store/slices/UI/sidebarMenuSettings/sidebarMenuSettings.slice";
import { toCapitalCase } from "../../../config/utils";

export const SidebarSettingsMenu = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { menuOptions } = useAppSelector((state) => state.sidebarMenuSettings);

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    dispatch(changeActiveMenuOption(toCapitalCase(lastSegment)));
  }, [location, dispatch]);

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
