import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate  } from 'react-router-dom';
import { Formik } from 'formik';
import { Form } from 'react-router-dom';
import Link from '@mui/material/Link';
import * as Yup from 'yup';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CustomInputComponent from '../../../components/forms/CustomInputComponent';
import TextBox from '../../../components/UI/TextBox';
import { login } from '../../../services/auth/login.service';

const validationSchema = Yup.object({
  user: Yup.string().required('El usuario es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

const LoginComponent = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '100%' }}>
      <TextBox title={'Iniciar Sesión'} welcomeText={'¡Bienvenido! 👋'} description={<>Ingresa tu correo y contraseña para iniciar sesión.</>}></TextBox>
      <Box sx={{ flexGrow: 1, my: 4 }}>
        <Formik
          initialValues={{
            user: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const loginResponse = await login({
                user: values.user,
                password: values.password,
              });
              console.log('Login exitoso:', loginResponse);
              navigate('/ecommerce');
            } catch (error) {
              console.error('Error durante el login:', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, getFieldProps, submitForm }) => (
            <Form>
              <Stack spacing={2}>
                <CustomInputComponent
                  label='Usuario'
                  id='user'
                  {...getFieldProps('user')}
                  error={Boolean(touched.user && errors.user)}
                  helperText={touched.user && errors.user}
                />
                <CustomInputComponent
                  label='Contraseña'
                  id='password'
                  endIcon={<VisibilityOffOutlinedIcon />}
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Link sx={{ alignSelf: 'flex-end' }}>
                  ¿Olvidaste tu contraseña?
                </Link>
                <Button 
                  fullWidth 
                  variant='contained' 
                  type='submit'
                  onClick={() => {
                    console.log('Click');
                    submitForm();
                  }}
                  >
                  Iniciar sesión
                </Button>
                <Stack direction='row' spacing={1} sx={{display:'flex', alignItems:'center', alignSelf:'center'}}>
                        <Typography>¿No tienes cuenta ?</Typography>
                        <Link
                            variant='body2'
                            component={RouterLink}
                            to="/register"
                        >
                            Regístrate aquí
                        </Link>
                    </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default LoginComponent;
