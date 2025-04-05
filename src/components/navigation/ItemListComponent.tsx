import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ItemListProps } from "../../config/interfaces";

const ItemListComponent = ({ title, icon, onClick, link }: ItemListProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Verificar si el link actual está activo
    const isActive = link ? location.pathname === `/${link}` : false;

    const handleClick = (event: React.MouseEvent) => {
        if (onClick) onClick();
        if (link) {
            event.preventDefault();
            navigate(`/${link}`); 
        }
    };

    return (
        <Box
            component="div"
            onClick={handleClick}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                p: "4px 8px",
                borderRadius: 2,
                cursor: "pointer",
                textDecoration: "none",
                color: isActive ? "primary.main" : "inherit",
                "&:hover": {
                    color: "primary.dark",
                },
                transition: "color 0.2s ease",
            }}
        >
            <IconButton size="small" sx={{ p: 0, mr: 1 }}>
                {icon}
            </IconButton>

            <Typography variant="body2" sx={{ textTransform: "capitalize", fontSize:"12px" }}>
                {title}
            </Typography>
        </Box>
    );
};

export default ItemListComponent;
