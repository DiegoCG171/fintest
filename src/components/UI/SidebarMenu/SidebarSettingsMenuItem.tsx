import { Box, Stack, SvgIconProps, Typography } from "@mui/material";

interface Props {
  label: string;
  icon: React.ComponentType<SvgIconProps>;
  active: boolean;
}

export const SidebarSettingsMenuItem = ({
  label,
  active,
  icon: Icon,
}: Props) => {
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
        onClick={() => {}}
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
            <Icon />
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
