import React from "react";
import { Field, FastField } from "formik";
import { DynamicFieldProps } from "../../../config/interfaces";
import DynamicFieldRender from "./DynamicFieldRender";

const DynamicField: React.FC<DynamicFieldProps> = (props) => {
  const { name, column } = props;
  const shouldUseFastField = !column?.dependsOn && !column?.dynamicRender && !column?.hide;
  const FieldComponent = shouldUseFastField ? FastField : Field;

  return (
    <FieldComponent
      name={name}
      component={DynamicFieldRender}
      custom={props}
    />
  );
};

export default React.memo(DynamicField, (prev, next) => {
  return (
    prev.name === next.name &&
    prev.id === next.id &&
    prev.parentPath === next.parentPath &&
    prev.column?.id === next.column?.id &&
    JSON.stringify(prev.row) === JSON.stringify(next.row) &&
    prev.isVisible === next.isVisible
  );
});
