import React, { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import ItemListComponent from "./ItemListComponent";
import { SubMenuToggle } from "./SubMenuToggle ";
import { MenuToggleProps } from "../../config/interfaces";

const MenuToggle = ({ title, icon, items, index }: MenuToggleProps): React.ReactNode => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <Box key={index} sx={{ width: "100%" }}>
            <Box
                onClick={toggleMenu}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    borderRadius: 2,
                    p: "8px",
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                }}
            >
                <Typography
                    variant="body2"
                    sx={{ textTransform: "uppercase", flexGrow: 1 }}
                >
                    {title}
                </Typography>

                {icon}
            </Box>

            <Collapse in={open} timeout="auto" unmountOnExit sx={{m:1}}>
            {items.map((item, subIndex) => (
    item.subItems ? (
        <SubMenuToggle
            key={`${index}-${subIndex}`}
            title={item.name}
            icon={item.icon}
            items={item.subItems}
        />
    ) : (
        <ItemListComponent
            key={`${index}-${subIndex}`}
            title={item.name}
            icon={item.icon}
            link={item.link} // Ruta interna si existe
            onClick={item.onClick} // Acción si existe
        />
    )
))}

            </Collapse>
        </Box>
    );
};

export default MenuToggle;