import { Box, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ItemListComponent from "./ItemListComponent";
import { useState } from "react";
import { JSX } from "@emotion/react/jsx-runtime";
import { SubMenuToggleProps } from "../../config/interfaces";



const SubMenuToggle = ({ title, icon, items }: SubMenuToggleProps): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
        setActive(!active);
    };

    return (
        <Box sx={{ width: "100%", m: 1 }}>
            <Box
                onClick={toggleMenu}
                sx={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderRadius: 2,
                    p: "4px",
                    height: "32px",
                    backgroundColor: active ? "primary.light" : "transparent",
                    "&:hover": {
                        backgroundColor: active ? "primary.light" : "rgba(0, 0, 0, 0.01)",
                        
                    border: "1px solid #D1D1D1",
                    },
                    transition: "background-color 0.2s ease",
                }}
            >
                {/* Ícono izquierdo */}
                <IconButton size="small" sx={{ mx: 2, p: 0, width: "18px", height: "18px" }}>
                    {icon}
                </IconButton>

                {/* Título */}
                <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize", flexGrow: 1, fontSize: "0.875rem" }} 
                >
                    {title}
                </Typography>

                {/* Ícono derecho */}
                {items.length > 0 && (
                    <IconButton size="small" sx={{ p: 0, width: "24px", height: "24px" }}>
                        {open ? <KeyboardArrowDownRoundedIcon fontSize="small" /> : <KeyboardArrowRightRoundedIcon fontSize="small" />}
                    </IconButton>
                )}
            </Box>

            {/* Contenido colapsable */}
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ m: 2 }}>
                {items.map((item, subIndex) => (
                    <ItemListComponent
                        key={`${subIndex}-sub-menu`}
                        title={item.title}
                        icon={item.icon}
                        link={item.link}
                        onClick={item.onClick}
                    />
                ))}
            </Collapse>
        </Box>
    );
};

export { SubMenuToggle };
