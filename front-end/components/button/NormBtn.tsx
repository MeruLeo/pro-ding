import React from "react";
import { Button } from "@nextui-org/button";

type ButtonProps = {
  title: string;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "error"
    | "#ff4973";
  variant?: "solid" | "outline" | "ghost" | "shadow";
  as?: React.ElementType;
};

const NormalButton: React.FC<ButtonProps> = ({
  title,
  icon,
  className,
  onClick,
  type,
  size,
  disabled,
  fullWidth,
  loading,
  color,
  variant,
  as = "button",
}) => {
  return (
    <Button
      className={`transition-all duration-200 hover:scale-95 font-bold ${className}`}
      onClick={onClick}
      type={type}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      loading={loading}
      color={color}
      variant={variant}
      as={as}
      startContent={icon}
    >
      {title}
    </Button>
  );
};

export default NormalButton;
