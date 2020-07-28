import React from "react";
export default function Icon({ type, className = "" }) {
  return <span className={`fas fa-${type} ${className}`} />;
}
