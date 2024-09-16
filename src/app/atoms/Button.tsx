import React from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

type ButtonProps = {
  title: string;
  buttonLink?: string;
  className?: string;
  onClick?: () => void; // Allow passing custom onClick if needed
};

const Button: React.FC<ButtonProps> = ({
  title,
  buttonLink,
  className,
  onClick,
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
    <button
      type="button"
      onClick={handleClick}
      className={`${className ? `${className}` : ""}`}
    >
      {title}
    </button>
  );
};

export default Button;
