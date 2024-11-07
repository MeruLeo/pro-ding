import React from "react";
import { Formik, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@nextui-org/button";
import InputComponent from "./Input";

type FieldType = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number";
  icon: React.ReactNode | null;
  placeholder: string;
  validation?: Yup.StringSchema | Yup.NumberSchema;
};

type DynamicFormProps = {
  fields: FieldType[];
  onSubmit: (values: { [key: string]: any }) => void;
};

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, btn }) => {
  const validationSchema = fields.reduce(
    (schema, field) => {
      schema[field.name] =
        field.validation || Yup.string().required("این فیلد اجباری است");
      return schema;
    },
    {} as { [key: string]: Yup.AnySchema },
  );

  return (
    <Formik
      initialValues={fields.reduce(
        (values, field) => {
          values[field.name] = "";
          return values;
        },
        {} as { [key: string]: string },
      )}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={onSubmit}
    >
      {() => (
        <FormikForm className="">
          {fields.map((field) => (
            <InputComponent
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              icon={field.icon}
              placeholder={field.placeholder}
            />
          ))}
          {btn}
        </FormikForm>
      )}
    </Formik>
  );
};

export default DynamicForm;
