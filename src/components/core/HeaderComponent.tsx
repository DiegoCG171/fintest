import { Badge as BaseBadge, Divider, Stack } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountMenu from './AccountMenu';

interface HeaderComponentProps {
  alerts: number;
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
        justifyContent: 'flex-end',
        boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)'
      }}>
      <BaseBadge badgeContent={alerts}>
        <NotificationsNoneOutlinedIcon/>
      </BaseBadge>
      <BaseBadge>
      <AccountMenu/>
      </BaseBadge>
    </Stack>
  )
}

export default HeaderComponent