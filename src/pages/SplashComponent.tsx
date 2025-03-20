import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PersonAltOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import logo from '../assets/logo.svg';
import backgroundImage from '../assets/bg-fintest.svg';

function SplashComponent() {
    return (
        <Box
        sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'calc(100vh - 50px)',
            backgroundColor: 'common.white',
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center center',
        }}
        >
        <Container
            sx={{
            width: 560,
            height: 560,
            backgroundColor: 'primary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2, 
            }}
        >
            <Stack spacing={8}>
            <Stack spacing={4} alignItems="center">
                <Typography align="center" variant="h6" color="common.white">
                Bienvenido a
                </Typography>
                <Box
                component="img"
                src={logo}
                alt="Fintest logo"
                sx={{ filter: 'brightness(0) invert(1)', height: 80 }}
                />
                <Typography
                align="center"
                variant="subtitle1"
                color="common.white"
                gutterBottom
                >
                <strong>Simula y gestiona</strong> transacciones bancarias con precisión en un{' '}
                <strong>entorno seguro y eficiente.</strong>
                </Typography>
            </Stack>
            <Stack
                spacing={8}
                direction="row"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <Button
                variant="contained"
                component={Link}
                to="/register"
                endIcon={<PersonAltOutlineOutlinedIcon />}
                >
                Soy adquirente
                </Button>
                <Button
                variant="contained"
                component={Link}
                to="/register"
                endIcon={<PeopleAltOutlinedIcon />}
                sx={{
                    backgroundColor: 'primary.dark',
                }}
                >
                Soy emisor
                </Button>
            </Stack>
            </Stack>
        </Container>
        </Box>
    );
}

export default SplashComponent;
