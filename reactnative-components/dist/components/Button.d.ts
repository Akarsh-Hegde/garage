import React from 'react';
interface ButtonProps {
    label: string;
    onPress: () => void;
}
declare const Button: React.ComponentType<ButtonProps>;
export default Button;
