import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Box,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[2],
    fontSize: 11,
  },
}));

export const SettingsButton = () => {

    const navigate = useNavigate()

  return (
    <Box sx={{ position: "absolute", top: 24, right: 24, cursor: "pointer" }}>
      <LightTooltip
        title={
          <Typography onClick={() => navigate('/settings/users')} color="black" sx={{ fontSize: 12, cursor: 'pointer' }}>
            Centro de administración
          </Typography>
        }
         placement="bottom-end"
      >
        <SettingsOutlinedIcon />
      </LightTooltip>
    </Box>
  );
};
