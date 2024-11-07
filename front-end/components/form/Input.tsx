import React from "react";
import { Input } from "@nextui-org/input";
import { useField } from "formik";

type InputProps = {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "password";
  icon?: React.ReactNode;
  placeholder: string;
};

const InputComponent: React.FC<InputProps> = ({
  name,
  label,
  type,
  icon,
  placeholder,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="my-4">
      <Input
        {...field}
        type={type}
        label={label}
        radius="lg"
        endContent={icon}
        labelPlacement="inside"
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputComponent;
