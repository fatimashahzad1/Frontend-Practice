import Navbar from "@/components/dashboard/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col ">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
