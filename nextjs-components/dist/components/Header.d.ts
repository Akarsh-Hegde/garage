import React from "react";
interface HeaderProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}
export declare function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps): React.JSX.Element;
export {};
