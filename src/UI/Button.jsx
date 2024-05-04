import React from 'react';
const Button = (props) => {
  const { label, type, disabled } = props;
    return (
      <button
      {...props}
        className="rounded px-5 py-2.5 overflow-hidden group bg-cyan-500 relative hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-cyan-400 transition-all ease-out duration-300"
        type={type}
        disabled={disabled}
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40"></span>
        <span className="relative">{label}</span>
      </button>
    );
  };
  
  export default Button;