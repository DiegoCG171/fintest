import { Outlet } from 'react-router-dom'
import HeaderComponent from '../components/core/HeaderComponent'
import { Box } from '@mui/material'
import SideNavComponent from '../components/navigation/SideNavComponent'

function PrivateLayoutContent() {
    return (
        <Box sx={{ display: 'flex' }}>
            <SideNavComponent/>
            <Box sx={{ width: '100%' }}>
                <HeaderComponent alerts= {9} />
                <Outlet/>
            </Box>
        </Box>
    )
}

export default PrivateLayoutContent