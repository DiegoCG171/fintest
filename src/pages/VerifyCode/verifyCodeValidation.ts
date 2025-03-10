import * as Yup from "yup";

export const initialValues = {
  code0: "",
  code1: "",
  code2: "",
  code3: "",
};

export const validationSchema = Yup.object({
  code0: Yup.string()
    .required("Requerido")
    .matches(/^\d$/, "Debe ser un dígito"),
  code1: Yup.string()
    .required("Requerido")
    .matches(/^\d$/, "Debe ser un dígito"),
  code2: Yup.string()
    .required("Requerido")
    .matches(/^\d$/, "Debe ser un dígito"),
  code3: Yup.string()
    .required("Requerido")
    .matches(/^\d$/, "Debe ser un dígito"),
});
