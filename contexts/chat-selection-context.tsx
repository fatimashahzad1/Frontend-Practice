"use client";

import { useToast } from "@/hooks/use-toast";
import { getToken } from "@/lib/get-token";
import { getClient, postClient } from "@/utils/client";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
  chatsIsLoading: boolean;
  chats: Chats[] | null;
  searchString: string;
  setSearchString: (searchString: string) => void;
  searchedChats: Chats[] | null;
  selectedChatMessages:
    | InfiniteData<{ messages: any; nextCursor: any }, unknown>
    | undefined;
  selectedChatMessagesIsLoading: boolean;
  sendMessage: ({ chatId, message }: SendMessageProps) => void;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<
        {
          messages: any;
          nextCursor: any;
        },
        unknown
      >,
      Error
    >
  >;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

// Create the context with a default value
const ChatSelectionContext = createContext<
  ChatSelectionContextType | undefined
>(undefined);

// Fetch all people
const fetchAllChats = async (toast: any) => {
  const token = await getToken();
  if (!token) throw new Error("Token is Missing");

  const result = await getClient("chat/all", token);
  console.log({ result });
  if (result?.statusCode >= 400) {
    toast({
      title: "Error",
      description: "Failed to fetch chats",
      variant: "destructive",
    });
  }

  return result;
};

// Fetch all messages of a selected chat
const fetchSelectedChatMessages = async ({
  chatId,
  pageParam,
  toast,
}: {
  chatId: number | null;
  pageParam: number | null;
  toast: any;
}) => {
  if (!chatId) return { messages: [], nextCursor: null };

  const token = await getToken();
  if (!token) throw new Error("Token is Missing");
  const cursorParam = pageParam ? `&cursor=${pageParam}` : ""; // Use cursor for pagination
  const result = await getClient(
    `chat/messages/${chatId}?take=10${cursorParam}`, // Fetch 10 messages at a time
    token
  );

  if (result?.statusCode > 400)
    toast({
      title: "Error",
      description: "Failed to fetch messages",
      variant: "destructive",
    });

  return {
    messages: result?.messages || [],
    nextCursor: result?.nextCursor || null, // Ensure API returns a cursor
  };
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
    isError: chatsError,
    isLoading: chatsIsLoading,
  } = useQuery<Chats[]>({
    queryKey: ["chats"],
    queryFn: () => fetchAllChats(toast),
  });
  console.log({ chatsError });
  if (chatsError) {
    console.log("erorrrrrrrrrrrrrrrrrr=", chatsError);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to fetch chats.",
    });
  }

  const {
    data: selectedChatMessages,
    isLoading: selectedChatMessagesIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["messages", selectedChat],
    queryFn: ({ pageParam = null }) =>
      fetchSelectedChatMessages({ chatId: selectedChat, pageParam, toast }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor || null, // Extract cursor
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
        title: "Success",
        description: "Message sent Successfully",
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
      chatsIsLoading,
      chats,
      searchString,
      setSearchString,
      searchedChats,
      selectedChatMessages,
      selectedChatMessagesIsLoading,
      sendMessage: sendMessage.mutate,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    }),
    [
      selectedChat,
      setSelectedChat,
      chatsIsLoading,
      chats,
      searchString,
      setSearchString,
      searchedChats,
      selectedChatMessages,
      selectedChatMessagesIsLoading,
      sendMessage,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
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
