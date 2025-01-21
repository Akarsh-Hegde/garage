import { Plus, MessageSquare, Menu } from "lucide-react"
import { Button } from "../components/ui/button"
import { theme } from "../styles/theme"
import React from "react"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onNewChat: () => void
  chatHistory: { id: string; title: string }[]
  currentChatId: string | null
  onSelectChat: (id: string) => void
}

export function Sidebar({ isOpen, setIsOpen, onNewChat, chatHistory, currentChatId, onSelectChat }: SidebarProps) {
  return (
    <div
      className={`sidebar h-screen flex flex-col p-2 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
      style={{ backgroundColor: theme.colors.secondary }}
    >
      <Button
        variant="ghost"
        className="mb-4 flex items-center justify-center gap-2"
        onClick={onNewChat}
        style={{ color: theme.colors.text }}
      >
        <Plus className="h-5 w-5" />
        {isOpen && <span>New chat</span>}
      </Button>

      <div className="flex-1 overflow-y-auto">
        {isOpen && <div className="px-3 py-2 text-xs text-gray-400">Chat History</div>}
        {chatHistory.map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            className={`w-full justify-start mb-1 ${chat.id === currentChatId ? "bg-gray-700" : ""}`}
            onClick={() => onSelectChat(chat.id)}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            {isOpen && <span className="truncate">{chat.title}</span>}
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        className="mt-auto flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: theme.colors.text }}
      >
        <Menu className="h-5 w-5" />
        {isOpen && <span className="ml-2">Close sidebar</span>}
      </Button>
    </div>
  )
}

