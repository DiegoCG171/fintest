import React from "react";
import { TextField } from "@mui/material";
import { FormikProps } from "formik";

interface FormValues {
  code0: string;
  code1: string;
  code2: string;
  code3: string;
}

interface CodeInputProps {
  index: number;
  formik: FormikProps<FormValues>;
}

const CodeInput: React.FC<CodeInputProps> = ({ index, formik }) => {
  const handleFocus = (index: number) => {
    const nextInput = document.getElementById(
      `code-input-${index}`
    ) as HTMLInputElement;
    nextInput?.focus();
  };

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d$/.test(value) || value === "") {
        formik.setFieldValue(`code${index}`, value);
        if (value && index < 3) {
          handleFocus(index + 1);
        }
      }
    };

  return (
    <TextField
      id={`code-input-${index}`}
      name={`code${index}`}
      value={formik.values[`code${index}` as keyof FormValues]}
      onChange={handleChange(index)}
      onKeyDown={(e) => {
        if (
          e.key === "Backspace" &&
          formik.values[`code${index}` as keyof FormValues] === "" &&
          index > 0
        ) {
          handleFocus(index - 1);
        }
      }}
      onFocus={() => handleFocus(index)}
      error={Boolean(
        formik.errors[`code${index}` as keyof FormValues] &&
        formik.touched[`code${index}` as keyof FormValues]
      )}
      inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
      variant="outlined"
      size="medium"
      sx={{
        width: 90,
        "& .MuiOutlinedInput-root": {
          fontSize: 32,
          "& fieldset": {
            borderColor:
              formik.values[`code${index}` as keyof FormValues] !== "" &&
                !formik.errors[`code${index}` as keyof FormValues]
                ? "primary.main"
                : "primary.main",
            borderWidth:
              formik.values[`code${index}` as keyof FormValues] !== "" &&
                !formik.errors[`code${index}` as keyof FormValues]
                ? 3
                : 1,
          },
          "&:hover fieldset": {
            borderColor:
              formik.values[`code${index}` as keyof FormValues] !== "" &&
                !formik.errors[`code${index}` as keyof FormValues]
                ? "primary.main"
                : "primary.main",
            borderWidth:
              formik.values[`code${index}` as keyof FormValues] !== "" &&
                !formik.errors[`code${index}` as keyof FormValues]
                ? 3
                : 1,
          },
          "&.Mui-focused fieldset": {
            borderColor:
              formik.values[`code${index}` as keyof FormValues] !== "" &&
                !formik.errors[`code${index}` as keyof FormValues]
                ? "primary.main"
                : "primary.main",
            borderWidth:
              formik.values[`code${index}` as keyof FormValues] !== "" &&
                !formik.errors[`code${index}` as keyof FormValues]
                ? 3
                : 1,
          },
        },
      }}
    />
  );
};

export default CodeInput;
