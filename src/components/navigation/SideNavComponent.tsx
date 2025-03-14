import {
    Box,
    Container,
    Drawer,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import logo from "../../assets/logo.svg";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import SearchIcon from "@mui/icons-material/Search";
import CollapsibleMenu from "./CollapsibleMenu";

const drawerWidth = 240;

function SideNavComponent() {
    return (
        <Drawer
        variant="permanent"
        sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            boxShadow: "none",
            borderRight: "none",
            height: "calc(100vh - 50px)",
        },
        }}
    >
        <Stack
        direction="row"
        sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            py: 2,
        }}
        >
        <img src={logo} alt="Fintest" style={{ height: "32px", marginBottom: "10px" }} />
        <MenuOpenOutlinedIcon />
        </Stack>
        <Container>
        <TextField
            id="search"
            size="small"
            margin="normal"
            fullWidth
            slotProps={{
            input: {
                endAdornment: (
                <InputAdornment position="end">
                    <SearchIcon />
                </InputAdornment>
                ),
            },
            }}
        />
        <Box
            sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            }}
        >
            <Typography variant="body2" sx={{ textTransform: "uppercase" }}>
            Catálogo
            </Typography>
            <CreateNewFolderOutlinedIcon htmlColor="#454545" sx={{ fontSize: 18 }} />
        </Box>

        <CollapsibleMenu />

        </Container>
    </Drawer>
);
}

export default SideNavComponent;
