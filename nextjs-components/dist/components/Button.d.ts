import React from 'react';
interface ButtonProps {
    label: string;
    onClick: () => void;
}
declare const Button: React.ComponentType<ButtonProps>;
export default Button;
