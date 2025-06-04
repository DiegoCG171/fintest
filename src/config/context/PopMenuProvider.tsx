import { Menu, MenuItem } from "@mui/material";
import { PopMenuContext } from "./PopMenuContext";
import { useState } from "react";
import {
    ContextMenuOption,
    //ItemsServiceMenu,
    //MenuServiceInterface,
} from "../interfaces";

export const PopMenuProvider = ({ children }: { children: React.ReactNode }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuData, setMenuData] = useState<ContextMenuOption[] | null>(null);
    //const [parentItem, setParentItem] = useState<MenuServiceInterface | ItemsServiceMenu | null>(null);

    const open = Boolean(anchorEl);

    const openMenu = (
        event: React.MouseEvent<HTMLElement>,
        options: ContextMenuOption[],
        //parentItem?: MenuServiceInterface | ItemsServiceMenu
    ) => {
        if (anchorEl) return null;
        setAnchorEl(event.currentTarget);
        setMenuData(options);
        //setParentItem(parentItem ?? null);
    };

    const closeMenu = () => {
        setAnchorEl(null);
        setMenuData(null);
        //setParentItem(null);
    };

    return (
        <PopMenuContext.Provider value={{ openMenu, closeMenu }}>
        {children}
        <Menu anchorEl={anchorEl} open={open} onClose={closeMenu} disableAutoFocusItem>
            {menuData?.map((option, index) => (
            <MenuItem
                key={index}
                onClick={() => {
                closeMenu();
                option.action();
                }}
                disabled={option.disabled}
                sx={
                    option.danger ? { color: "error.main", fontSize: 12} : {
                        fontSize: 12, color: "text.disabled"
                    }
                }
            >
                {option.item.label}
            </MenuItem>
            ))}
        </Menu>
        </PopMenuContext.Provider>
    );
};
