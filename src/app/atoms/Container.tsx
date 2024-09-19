import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Make it optional to avoid issues if not provided
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`pt-8 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
