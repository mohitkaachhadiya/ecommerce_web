import React from "react";

const Loader = ({ size = 100, color = "#db3474ff", thickness = 10, className = "" }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${thickness}px`,
    borderTopColor: color,
  };

  return <div className={`loader ${className}`} style={spinnerStyle}></div>;
};

export default Loader;
