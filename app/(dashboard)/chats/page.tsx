"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { useChatSelection } from "@/contexts/chat-selection-context";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Chats() {
  const {
    selectedChat,
    setSelectedChat,
    searchString,
    setSearchString,
    searchedChats,
    selectedChatMessages,
    sendMessage,
  } = useChatSelection();
  const [message, setMessage] = useState("");
  console.log({ searchedChats });
  console.log({ selectedChatMessages });

  const handleSendMessage = () => {
    if (selectedChat) {
      console.log("here mesage==", message);
      sendMessage({ chatId: selectedChat, message });
    }
    // if (message.trim() === "" || !selectedChat) return;
    // mockMessages[selectedChat].push({
    //   id: Date.now(),
    //   text: message,
    //   sender: "me",
    // });
    // setMessage("");
  };

  return (
    <div className="flex h-screen border rounded-xl shadow-md w-full">
      {/* Left Sidebar - Chat List */}
      <div
        className={`${
          selectedChat ? "max-sm:hidden" : "max-sm:w-full"
        } sm:w-1/3 border-r py-4 bg-[#EEF4FD] dark:bg-gray-800`}
      >
        <h2 className="max-sm:hidden mx-4 text-xl font-bold">Chats</h2>
        <div className="relative w-full bg-[#EEF4FD] sm:bg-white rounded-3xl my-6">
          {/* Search Icon */}
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BEBEBE]"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search people..."
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="pl-10 w-full bg-[#EEF4FD] sm:bg-white rounded-3xl placeholder:text-[#BEBEBE] h-[40px] focus-visible:outline-none focus-visible:ring-3" // Adjust padding for icon spacing
          />
        </div>
        <div className="space-y-2">
          {searchedChats?.map((chat: Chats) => (
            <Card
              key={chat.id}
              className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition border-none rounded-none shadow-none ${
                selectedChat === chat.id
                  ? "bg-white"
                  : "hover:bg-blue-100 bg-[#EEF4FD]"
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <Avatar className="w-10 h-10 ">
                <AvatarImage
                  className="rounded-full"
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback className=" w-10 h-10 flex justify-center items-center rounded-full">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between w-full">
                  <h3 className="text-sm font-bold text-black">
                    {chat.users[0].name}
                  </h3>
                  <p className="text-xs text-[#475467]">10:00 AM</p>
                </div>
                <p className="text-xs text-[#475467]">
                  {chat?.messages?.[0]?.content}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Messages */}
      <div
        className={`${
          selectedChat ? "max-sm:w-full" : "max-sm:hidden"
        } sm:w-2/3 flex flex-col`}
      >
        {/* Chat Header */}
        <div className="p-4 border-b bg-white dark:bg-gray-900">
          {selectedChat ? (
            <h3 className="text-lg font-semibold">
              {
                searchedChats?.find((chat) => chat.id === selectedChat)
                  ?.users[0]?.name
              }
            </h3>
          ) : (
            <p className="text-gray-500">Select a chat to start messaging</p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col py-4 px-8 overflow-y-auto bg-white ">
          {selectedChatMessages ? (
            selectedChatMessages?.map((msg) => (
              <div
                key={msg.id}
                className={`mb-8 p-2 max-w-[75%] rounded-lg flex flex-col ${
                  msg.isMine
                    ? "bg-[#1565D8] text-white self-end"
                    : "bg-[#EEF4FD] text-black self-start"
                }`}
              >
                {msg.content}
                <span className="text-xs self-end">{msg.createdAt}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </div>

        {/* Input Box */}
        {selectedChat && (
          <div className="p-4 border-t flex items-center bg-white dark:bg-gray-900">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 mr-2"
            />
            <Button
              onClick={() => {
                handleSendMessage();
              }}
              disabled={!message.trim()}
              className="text-[#1565D8]"
            >
              <Send size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
