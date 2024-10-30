import React from "react";

type InputProps = {
  type: "text" | "number";
  icon: "empty";
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
};
