import { Bell, User } from "lucide-react"
import { Button } from "../components/ui/button"
import { theme } from "../styles/theme"
import React from "react"

interface HeaderProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

export function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b" style={{ borderColor: theme.colors.secondary }}>
      <h1 className="text-xl font-semibold" style={{ color: theme.colors.text }}>
        {theme.clientName}
      </h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" style={{ color: theme.colors.text }} />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" style={{ color: theme.colors.text }} />
        </Button>
      </div>
    </header>
  )
}

