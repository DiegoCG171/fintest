import { Box, IconButton } from "@mui/material";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import icon from "../../../assets/icon.svg";
import logo from "../../../assets/logo.svg";
import { HeaderSidebarMenuProps } from "../../../config/interfaces";
import { useNavigate } from "react-router-dom";

function HeaderSidebarMenu({ isHide, onToggleMenu }: HeaderSidebarMenuProps) {
    const imageSrc = isHide ? icon : logo;
    const navigate = useNavigate();

    return (
        <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: isHide ? 1 : 2,
            py: 1,
        }}
        >
        <img
            src={imageSrc}
            alt="Fintest"
            style={{ height: "38px", display: "block", cursor: isHide ? "pointer" : "default" }}
            onClick={isHide ? onToggleMenu : () => navigate('/')}
        />
        {!isHide && (
            <IconButton onClick={onToggleMenu}>
            <FirstPageRoundedIcon />
            </IconButton>
        )}
        </Box>
    );
}

export default HeaderSidebarMenu;
