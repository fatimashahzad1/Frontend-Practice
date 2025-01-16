import React from "react";

interface MenuIconProps {
  width?: string;
  height?: string;
}

const MenuIcon: React.FC<MenuIconProps> = ({
  width = "40px",
  height = "40px",
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <path
        d="M10 19.9999H30M10 13.3333H30M10 26.6666H30"
        stroke="#242424"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;
