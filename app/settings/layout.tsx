import Sidebar from "./sidebar";
import Navbar from "./navbar";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex sm:flex-row max-sm:flex-col">
      <Navbar />
      <Sidebar className="max-sm:hidden" />
      {children}
    </div>
  );
};

export default AuthenticationLayout;
