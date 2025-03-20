import React, { useState } from "react";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
} from "@mui/material";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

function CollapsibleMenu() {
    const [openEcommerce, setOpenEcommerce] = useState(false);

    const [openMoto, setOpenMoto] = useState(false);

    const handleClickEcommerce = () => {
        setOpenEcommerce(!openEcommerce);
    };

    const handleClickMoto = () => {
        setOpenMoto(!openMoto);
    };

    return (
        <List component="nav" disablePadding>
        <ListItemButton onClick={handleClickEcommerce}>
            <ListItemIcon>
            <FolderOutlinedIcon />
            </ListItemIcon>
            <ListItemText
            primary={<Typography variant="body2">Ecommerce</Typography>}
            />
            {openEcommerce ? <KeyboardArrowRightOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
        </ListItemButton>
        <Collapse in={openEcommerce} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta template</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={<Typography variant="body2">Venta con #DS</Typography>}
                />
            </ListItemButton>
            </List>
        </Collapse>

        <ListItemButton onClick={handleClickMoto}>
            <ListItemIcon>
            <FolderOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="body2">Moto</Typography>} />
            {openMoto ? <KeyboardArrowRightOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
        </ListItemButton>
        <Collapse in={openMoto} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
            <ListItemButton>
                <ListItemIcon>
                <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                primary={
                    <Typography variant="body2">Revisión de Moto</Typography>
                }
                />
            </ListItemButton>
            </List>
        </Collapse>
        </List>
    );
}

export default CollapsibleMenu;
