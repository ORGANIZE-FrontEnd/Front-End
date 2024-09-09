import React from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

type ButtonProps = {
  title: string;
  buttonLink: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ title, buttonLink, className }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(buttonLink);
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
