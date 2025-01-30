import Navbar from "@/components/dashboard/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
