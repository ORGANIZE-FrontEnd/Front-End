import React from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

type ButtonProps = {
  title?: string;
  buttonLink?: string;
  className?: string;
  onClick?: () => void; // Allow passing custom onClick if needed
  type: "submit" | "reset" | "button" | undefined;
  children?: React.ReactNode;
  disabled?: boolean; // Add disabled prop
};

const Button: React.FC<ButtonProps> = ({
  title,
  buttonLink,
  className,
  onClick,
  type,
  children,
  disabled = false,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (!disabled) {
      if (onClick) {
        onClick();
      } else if (buttonLink) {
        router.push(buttonLink);
      }
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={disabled}
    >
      {title}
      {children}
    </button>
  );
};

export default Button;
