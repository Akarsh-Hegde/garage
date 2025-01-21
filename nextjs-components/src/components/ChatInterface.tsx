import React from "react"
import { useState, useRef, useEffect } from "react"
import { Paperclip, Calendar, Globe, Mic, Send } from "lucide-react"
import { FaImage, FaSearchPlus, FaListAlt, FaFileAlt } from "react-icons/fa"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { theme } from "../styles/theme"
import Image from "next/image"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface Chat {
  id: string
  title: string
  messages: Message[]
}

const ChatInterface: React.FC = () => {
    const [input, setInput] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentChat = chats.find((chat) => chat.id === currentChatId)

  const handleSend = async () => {
    if (!input.trim()) return

    const newMessage: Message = { role: "user", content: input }
    let updatedChats: Chat[]

    if (currentChatId) {
      updatedChats = chats.map((chat) =>
        chat.id === currentChatId ? { ...chat, messages: [...chat.messages, newMessage] } : chat,
      )
    } else {
      const newChatId = Date.now().toString()
      const newChat: Chat = {
        id: newChatId,
        title: input.slice(0, 30) + (input.length > 30 ? "..." : ""), // Use first 30 chars of input as title
        messages: [newMessage],
      }
      updatedChats = [...chats, newChat]
      setCurrentChatId(newChatId)
    }

    setChats(updatedChats)
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: `You said: ${input}. This is a simulated response.`,
      }
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === (currentChatId || updatedChats[updatedChats.length - 1].id)
            ? { ...chat, messages: [...chat.messages, aiResponse] }
            : chat,
        ),
      )
    }, 1000)
  }

  const createNewChat = () => {
    const newChatId = Date.now().toString()
    const newChat: Chat = {
      id: newChatId,
      title: "New Chat",
      messages: [],
    }
    setChats((prevChats) => [...prevChats, newChat])
    setCurrentChatId(newChatId)
  }

  const handleAttachment = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle file upload logic here
      console.log("File uploaded:", file.name)
    }
  }

  const handleMic = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Start recording logic
      console.log("Started recording")
    } else {
      // Stop recording logic
      console.log("Stopped recording")
    }
  }

  const quickActions = [
    { icon: FaImage, text: "Create image", color: "text-green-500" },
    { icon: FaSearchPlus, text: "Analyze images", color: "text-blue-500" },
    { icon: FaListAlt, text: "Make a plan", color: "text-yellow-500" },
    { icon: FaFileAlt, text: "Summarize text", color: "text-orange-500" },
  ]

  return (
    <div className="flex h-screen" style={{ backgroundColor: theme.colors.background }}>
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onNewChat={createNewChat}
        chatHistory={chats}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
      />
      <div className="flex flex-col flex-1">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-grow overflow-y-auto px-4 py-2">
            {currentChat && currentChat.messages.length > 0 ? (
              currentChat.messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.role === "user"
                        ? `bg-${theme.colors.userMessage} text-${theme.colors.text}`
                        : `bg-${theme.colors.botMessage} text-${theme.colors.text}`
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center mb-2">
                        <Image
                          src={theme.chatbotImage || "/placeholder.svg"}
                          alt="Chatbot"
                          width={24}
                          height={24}
                          className="rounded-full mr-2"
                        />
                        <span className="font-semibold">AI Assistant</span>
                      </div>
                    )}
                    {message.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold mb-8" style={{ color: theme.colors.text }}>
                  What can I help with?
                </h1>
                <div className="flex justify-center gap-2 flex-wrap">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (!currentChatId) createNewChat()
                        setInput(action.text)
                      }}
                      style={{ backgroundColor: theme.colors.primary, color: theme.colors.text }}
                    >
                      <action.icon className={`${action.color}`} />
                      <span className="text-sm">{action.text}</span>
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    style={{ backgroundColor: theme.colors.primary, color: theme.colors.text }}
                  >
                    <span className="text-sm">More</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="w-full max-w-4xl mx-auto p-4">
            <div
              className="chat-input flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <Button variant="ghost" size="icon" onClick={handleAttachment}>
                <Paperclip className="h-5 w-5" style={{ color: theme.colors.text }} />
              </Button>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
              <Button variant="ghost" size="icon">
                <Calendar className="h-5 w-5" style={{ color: theme.colors.text }} />
              </Button>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" style={{ color: theme.colors.text }} />
              </Button>

              <Input
                type="text"
                className="flex-grow border-none text-black placeholder-gray-500"
                placeholder="Message ChatGPT"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                style={{ backgroundColor: "white" }}
              />

              <Button variant="ghost" size="icon" onClick={handleMic}>
                <Mic className="h-5 w-5" style={{ color: isRecording ? "red" : theme.colors.text }} />
              </Button>

              <Button variant="ghost" size="icon" onClick={handleSend}>
                <Send className="h-5 w-5" style={{ color: theme.colors.text }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface;

