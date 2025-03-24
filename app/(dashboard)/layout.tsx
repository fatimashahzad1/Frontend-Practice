"use client";
import IncomingCallModal from "@/components/dashboard/incoming-call-modal";
import Navbar from "@/components/dashboard/navbar";
import { ChatSelectionProvider } from "@/contexts/chat-selection-context";
import { SocketProvider } from "@/contexts/socket-context";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <ChatSelectionProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          {children}
          <IncomingCallModal /> {/* Ensure this is always rendered */}
        </div>
      </ChatSelectionProvider>
    </SocketProvider>
  );
};

export default DashboardLayout;
