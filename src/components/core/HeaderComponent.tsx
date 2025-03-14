import { Badge as BaseBadge, Box, Divider, Stack, Typography } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

interface HeaderComponentProps {
  alerts: number;
}

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

function HeaderComponent(
  { alerts }: HeaderComponentProps
) {
  return (
    <Stack 
      spacing={2} 
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ 
        p: 2,
        backgroundColor: 'common.white',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
      <BaseBadge badgeContent={alerts}>
        <NotificationsNoneOutlinedIcon/>
      </BaseBadge>
      <BaseBadge>
      <Stack spacing={2} direction='row'>
        <BadgeContent></BadgeContent>
        <Stack spacing={0}>
          <Typography variant='subtitle2' >Nombre</Typography>
          <Typography variant='caption' >Perfil</Typography>
        </Stack>
      </Stack>
      </BaseBadge>
    </Stack>
  )
}

export default HeaderComponent