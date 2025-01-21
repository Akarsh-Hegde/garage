import { Bell, User } from "lucide-react"
import { Button } from "../components/ui/button"
import defaultTheme from "../styles/theme"
import React from "react"

interface HeaderProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

export function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b" style={{ borderColor: defaultTheme.colors.secondary }}>
      <h1 className="text-xl font-semibold" style={{ color: defaultTheme.colors.text }}>
        {defaultTheme.clientName}
      </h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" style={{ color: defaultTheme.colors.text }} />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" style={{ color: defaultTheme.colors.text }} />
        </Button>
      </div>
    </header>
  )
}

