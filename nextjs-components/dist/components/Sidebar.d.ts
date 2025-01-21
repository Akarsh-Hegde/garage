import React from "react";
interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onNewChat: () => void;
    chatHistory: {
        id: string;
        title: string;
    }[];
    currentChatId: string | null;
    onSelectChat: (id: string) => void;
}
export declare function Sidebar({ isOpen, setIsOpen, onNewChat, chatHistory, currentChatId, onSelectChat }: SidebarProps): React.JSX.Element;
export {};
