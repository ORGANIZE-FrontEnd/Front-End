import React from "react";
import Button from "../atoms/Button";

type SidebarContentProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

const SidebarContent: React.FC<SidebarContentProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="w-2/6 bg-green flex flex-col justify-start items-center text-bgWhite gap-2.5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] shadow-[#898686]">
      <img src="/orgLogo.svg" alt="Organization Logo" />
      <h2 className="text-4xl font-semibold pb-5">{title}</h2>
      <p>{description}</p>
      <Button
        title={buttonText}
        buttonLink={buttonLink}
        className="w-4/6 focus:outline-none text-white bg-green hover:bg-green800 focus:ring-4 focus:ring-green300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 border border-white"
      />
    </div>
  );
};

export default SidebarContent;
