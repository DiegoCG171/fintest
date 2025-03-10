import { Box, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import CodeInput from "./CodeInput";
import {
  validationSchema,
  initialValues,
} from "../../pages/VerifyCode/verifyCodeValidation";
import { useNavigate } from "react-router-dom";

export const VerifyCodeForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      navigate("/auth/reset-password");
      const concatenatedCode = Object.values(values).join("");
      console.log("Código enviado:", concatenatedCode);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      padding={2}
    >
      <Grid container spacing={1} justifyContent="center">
        {[0, 1, 2, 3].map((index) => (
          <Grid item key={index}>
            <CodeInput key={index} index={index} formik={formik} />
          </Grid>
        ))}
      </Grid>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Continuar
      </Button>
    </Box>
  );
};
