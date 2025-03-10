import { Box, Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import usePasswordVisibility from '../../hooks/usePasswordVisibility';

// Validación con Yup
const validationSchema = Yup.object({
  ['unique-first-name-field']: Yup.string().required('Se requiere el nombre'),
  ['unique-last-name-field']: Yup.string().required('Se requiere el apellido'),
  ['unique-user-field']: Yup.string().required('Se requiere el usuario'),
  ['unique-email-field']: Yup.string().email('Correo electrónico no válido').required('Se requiere el correo electrónico'),
  ['unique-password-field']: Yup.string().required('Se requiere la contraseña'),
});

const SignUpForm: React.FC = () => {
  const { getVisibilityProps } = usePasswordVisibility();

  const formik = useFormik({
    initialValues: {
      ['unique-first-name-field']: '',
      ['unique-last-name-field']: '',
      ['unique-user-field']: '',
      ['unique-email-field']: '',
      ['unique-password-field']: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="new-password"
            name="unique-first-name-field"
            required
            fullWidth
            id="firstName"
            label="Nombre"
            autoFocus
            value={formik.values['unique-first-name-field']}
            onChange={formik.handleChange}
            error={formik.touched['unique-first-name-field'] && Boolean(formik.errors['unique-first-name-field'])}
            helperText={formik.touched['unique-first-name-field'] && formik.errors['unique-first-name-field']}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Apellido"
            name="unique-last-name-field"
            autoComplete="new-password"
            value={formik.values['unique-last-name-field']}
            onChange={formik.handleChange}
            error={formik.touched['unique-last-name-field'] && Boolean(formik.errors['unique-last-name-field'])}
            helperText={formik.touched['unique-last-name-field'] && formik.errors['unique-last-name-field']}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="new-password"
            name="unique-user-field"
            required
            fullWidth
            id="user"
            label="Usuario"
            value={formik.values['unique-user-field']}
            onChange={formik.handleChange}
            error={formik.touched['unique-user-field'] && Boolean(formik.errors['unique-user-field'])}
            helperText={formik.touched['unique-user-field'] && formik.errors['unique-user-field']}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            autoComplete="off"
            name="unique-email-field"
            required
            fullWidth
            id="email"
            label="Dirección de correo electrónico"
            value={formik.values['unique-email-field']}
            onChange={formik.handleChange}
            error={formik.touched['unique-email-field'] && Boolean(formik.errors['unique-email-field'])}
            helperText={formik.touched['unique-email-field'] && formik.errors['unique-email-field']}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="unique-password-field"
            label="Contraseña"
            id="password"
            autoComplete="new-password"
            type={getVisibilityProps('unique-password-field').type}
            value={formik.values['unique-password-field']}
            onChange={formik.handleChange}
            error={formik.touched['unique-password-field'] && Boolean(formik.errors['unique-password-field'])}
            helperText={formik.touched['unique-password-field'] && formik.errors['unique-password-field']}
            InputProps={{
              endAdornment: getVisibilityProps("unique-password-field").endAdornment,
            }}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrarse
      </Button>
    </Box>
  );
};

export default SignUpForm;
