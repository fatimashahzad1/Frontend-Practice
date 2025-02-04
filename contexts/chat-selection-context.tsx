"use client";

import { useToast } from "@/hooks/use-toast";
import { getToken } from "@/lib/get-token";
import { getClient, postClient } from "@/utils/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

interface SendMessageProps {
  chatId: number;
  message: string;
}

// Define the shape of the context
interface ChatSelectionContextType {
  selectedChat: number | null;
  setSelectedChat: (id: number | null) => void;
  chats: Chats[] | null;
  searchString: string;
  setSearchString: (searchString: string) => void;
  searchedChats: Chats[] | null;
  selectedChatMessages: Message[] | undefined;
  sendMessage: ({ chatId, message }: SendMessageProps) => void;
}

// Create the context with a default value
const ChatSelectionContext = createContext<
  ChatSelectionContextType | undefined
>(undefined);

// Fetch all people
const fetchAllChats = async () => {
  const token = await getToken();
  if (!token) throw new Error("Token is Missing");

  const result = await getClient("chat/all", token);
  if (result?.error)
    throw new Error(result?.message || "Failed to fetch people");

  return result;
};

// Fetch all messages of a selected chat
const fetchSelectedChatMessages = async (chatId: number | null) => {
  const token = await getToken();
  if (!token) throw new Error("Token is Missing");

  const result = await getClient(`chat/messages/${chatId}`, token);
  if (result?.error)
    throw new Error(result?.message || "Failed to fetch messages");
  return result || [];
};

// send a message
const sendAMessage = async ({ chatId, message }: SendMessageProps) => {
  const token = await getToken();
  if (!token) throw new Error("Token is Missing");
  console.log(chatId, ",,,,message got is==========", message);

  const result = await postClient({
    url: `chat/messages/${chatId}`,
    token,
    data: { content: message },
  });
  if (result?.error)
    throw new Error(result?.message || "Failed to follow person");

  return result;
};

// Context Provider Component
export function ChatSelectionProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [chats, setChats] = useState<null | Chats[]>(null);
  const [searchString, setSearchString] = useState<string>("");
  const [searchedChats, setSearchedChats] = useState<null | Chats[]>(null);

  const {
    data: chatsData,
    error: chatsError,
    isLoading: chatsIsLoading,
  } = useQuery<Chats[]>({
    queryKey: ["chats"],
    queryFn: () => fetchAllChats(),
  });

  const {
    data: selectedChatMessages,
    error: selectedChatError,
    isLoading: selectedChatIsLoading,
  } = useQuery<Message[]>({
    queryKey: ["messages", selectedChat], // Add searchQuery to trigger refetch
    queryFn: () => fetchSelectedChatMessages(selectedChat),
    enabled: Boolean(selectedChat), // Avoid unnecessary calls on empty search
  });

  useEffect(() => {
    if (chatsData && chatsData.length > 0) {
      setChats(chatsData);
    }
  }, [chatsData]);

  useEffect(() => {
    if (searchString) {
      const filteredChats = chats?.filter((chat: Chats) =>
        chat.users[0].name.toLowerCase().includes(searchString.toLowerCase())
      );
      setSearchedChats(filteredChats || null);
    } else {
      setSearchedChats(chats);
    }
  }, [searchString, chats]);

  // Follow person mutation with useMutation
  const sendMessage = useMutation({
    mutationFn: sendAMessage,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["messages", selectedChat] });
      toast({
        variant: "default",
        title: result.success,
        description: result.message,
      });
    },
    onError: (err: any) => {
      toast({
        variant: "destructive",
        title: err.message,
        description: "Failed to follow person",
      });
    },
  });

  const memoizedValue = useMemo(
    () => ({
      selectedChat,
      setSelectedChat,
      chats,
      searchString,
      setSearchString,
      searchedChats,
      selectedChatMessages,
      sendMessage: sendMessage.mutate,
    }),
    [
      selectedChat,
      setSelectedChat,
      chats,
      searchString,
      setSearchString,
      searchedChats,
      selectedChatMessages,
      sendMessage,
    ]
  );

  return (
    <ChatSelectionContext.Provider value={memoizedValue}>
      {children}
    </ChatSelectionContext.Provider>
  );
}

// Custom hook to use the ChatSelectionContext
export function useChatSelection() {
  const context = useContext(ChatSelectionContext);
  if (!context) {
    throw new Error(
      "useChatSelection must be used within a ChatSelectionProvider"
    );
  }
  return context;
}
