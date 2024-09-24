import React from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

type ButtonProps = {
  title?: string;
  buttonLink?: string;
  className?: string;
  onClick?: () => void; // Allow passing custom onClick if needed
  type: "submit" | "reset" | "button" | undefined;
  children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  title,
  buttonLink,
  className,
  onClick,
  type,
  children,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (buttonLink) {
      router.push(buttonLink);
    }
  };

  return (
    <button type={type} onClick={handleClick} className={className}>
      {title}
      {children}
    </button>
  );
};

export default Button;
