import { Badge as BaseBadge, Divider, Stack } from '@mui/material';
import AccountMenu from '../core/AccountMenu';

function HeaderComponent(
) {
  return (
    <Stack 
      spacing={2} 
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{ 
        p: 1,
        pr: 2,
        backgroundColor: 'common.white',
        alignItems: 'center',
        justifyContent: 'flex-end',
        boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)'
      }}>
      <BaseBadge></BaseBadge>
      <BaseBadge>
      <AccountMenu/>
      </BaseBadge>
    </Stack>
  )
}

export default HeaderComponent