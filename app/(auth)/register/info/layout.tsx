import { RegistrationProvider } from '@/contexts/registration-context';

const InfoLayout = ({ children }: { children: React.ReactNode }) => {
  return <RegistrationProvider>{children}</RegistrationProvider>;
};

export default InfoLayout;
