import ChatNavbar from "@/components/dashboard/chats/chat-navbar";
import ChatSidebar from "@/components/dashboard/chats/chat-sidebar";
import { ChatSelectionProvider } from "@/contexts/chat-selection-context";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatSelectionProvider>
      <div className="flex sm:flex-row max-sm:flex-col">
        <ChatSidebar className="max-sm:hidden" />
        <ChatNavbar />
        {children}
      </div>
    </ChatSelectionProvider>
  );
};

export default AuthenticationLayout;
