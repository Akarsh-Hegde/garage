import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.ComponentType<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
