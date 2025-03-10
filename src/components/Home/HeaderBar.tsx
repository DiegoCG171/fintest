import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography } from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications";

export const HeaderBar = () => {
  return (
    <AppBar
        position="static"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 4px",
          boxShadow: "none",
          height: '48px'
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "48px",
            minHeight: "48px",
            "& .MuiToolbar-root": {
              minHeight: "48px !important",
            }
          }}
        >
          <Typography variant="subtitle2">FINTEST</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit">
              <Badge badgeContent={<p style={{fontSize: 10}}>4</p>} color="error" >
                <NotificationsIcon sx={{ height: 16 }} />
              </Badge>
            </IconButton>
            <IconButton sx={{ marginLeft: 2 }} color="inherit">
              <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>P</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
  )
}
