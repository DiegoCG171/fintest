import { Box, Stack, Typography } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { useAppDispatch, useAppSelector } from "../../../store";
import { changeActiveMenuOption } from "../../../store/slices/UI/sidebarMenuSettings/sidebarMenuSettings.slice";
import { useNavigate } from "react-router-dom";

interface Props {
  label: string;
  icon: string;
  active: boolean;
  path: string;
}

const iconMap: Record<string, React.ElementType> = {
  GroupsOutlinedIcon: GroupsOutlinedIcon,
  BusinessOutlinedIcon: BusinessOutlinedIcon,
  AdminPanelSettingsOutlinedIcon: AdminPanelSettingsOutlinedIcon,
  VpnKeyOutlinedIcon: VpnKeyOutlinedIcon,
};

export const SidebarSettingsMenuItem = ({ label, active, icon, path }: Props) => {
  const dispatch = useAppDispatch();
  const {formActive} = useAppSelector(state => state.admin)
  const navigate = useNavigate();
  const IconComponent = iconMap[icon] || null;

  const handleNavigate = () => {
    if (formActive) return;
    dispatch(changeActiveMenuOption(label))
    navigate(`/settings/${path}`)
  }

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: active
            ? (theme) => theme.palette.secondary.light
            : "transparent",
          borderRadius: 2,
          border: "2px solid transparent",
          padding: 1,
          margin: 0.5,
          cursor: "pointer",
          transition: "border-color 0.2s ease",
          "&:hover": {
            borderColor: (theme) => theme.palette.background.default,
          },
        }}
        onClick={handleNavigate}
      >
        <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            {IconComponent && <IconComponent />}
            <Typography
              sx={{
                fontSize: 12,
                color: "text.disabled",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
