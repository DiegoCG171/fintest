import { Box, Stack, Typography } from "@mui/material"
import { useAuth } from "../../hooks/useAuth";

const BadgeContent = () => {
    return (
      <Box
        component="span"
        sx={{
          width: 40,
          height: 40,
          minWidth: 40,
          minHeight: 40,
          maxWidth: 40,
          maxHeight: 40,
          borderRadius: '12px',
          background: (theme) =>
            theme.palette.primary.light,
          display: 'inline-block',
          verticalAlign: 'middle',
        }}
      />
    )
  }

function AccountMenu() {
    const { 
        user, 
        //logout 
      } = useAuth();
  return (
    <Stack spacing={2} direction='row'>
        <BadgeContent></BadgeContent>
        <Stack spacing={0}>
          <Typography variant='subtitle2' >{`${user?.names} ${user?.surnames}`}</Typography>
          <Typography variant='caption' >{user?.username}</Typography>
        </Stack>
      </Stack>
  )
}
export default AccountMenu