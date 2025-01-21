import React from "react";
import defaultTheme from "../styles/theme";
interface ChatInterfaceProps {
    theme?: typeof defaultTheme;
}
declare const ChatInterface: React.FC<ChatInterfaceProps>;
export default ChatInterface;
