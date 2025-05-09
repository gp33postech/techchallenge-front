import React from "react";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-white hover:bg-black/10 text-blue-600 hover:border-black/10 ",
  
};

const sizes = {
  sm: "text-sm px-3 py-1 md:text-base px-4 py-2",
  md: "text-base px-4 py-2",
  lg: "min-w-[150px] text-base px-4 h-",
};

const Button = ({
  
  icon,
  texto,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded font-semibold transition capitalize   ${variants[variant]} ${sizes[size]} ${className}`}
      
    >
      
      {texto} {icon && React.createElement(icon, { size: 15 })}
      
    </button>
  );
};

export default Button;
