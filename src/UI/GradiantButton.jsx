import React from 'react';
import Loader from './Loader';

const GradiantButton = (props) => {
  const { color, label,onClick,color2,loading,type } = props;

  return (
    <button
    type={type}
    onClick={onClick}
    style={{
      background: `linear-gradient(to right, ${color} 0%, ${
        color2 || color
      } 100%)`,
    }}
    className={`text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`}
  >
    {loading ? <Loader showFullScreen={false} /> : label}
  </button>
  );
};

export default GradiantButton;
