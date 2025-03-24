import ChatNavbar from "@/components/dashboard/chats/chat-navbar";
import ChatSidebar from "@/components/dashboard/chats/chat-sidebar";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex sm:flex-row max-sm:flex-col">
      <ChatSidebar className="max-sm:hidden" />
      <ChatNavbar />
      {children}
    </div>
  );
};

export default AuthenticationLayout;
