'use client';
import IncomingCallModal from '@/components/dashboard/incoming-call-modal';
import Navbar from '@/components/dashboard/navbar';
import { DashboardProvider } from '@/contexts/dashboard-context';
import { SocketProvider } from '@/contexts/socket-context';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SocketProvider>
            <DashboardProvider>
                <div className="flex flex-col h-screen">
                    <Navbar />
                    {children}
                    <IncomingCallModal /> {/* Ensure this is always rendered */}
                </div>
            </DashboardProvider>
        </SocketProvider>
    );
};

export default DashboardLayout;
