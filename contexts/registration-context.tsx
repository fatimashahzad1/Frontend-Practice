"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  phoneNumber: string;
  address: string;
  country: string;
  bankNo: string;
  isAdmin: boolean;
}

interface RegistrationContextProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined
);

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
};

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider = ({
  children,
}: RegistrationProviderProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    acceptTerms: false,
    phoneNumber: "",
    address: "",
    country: "",
    bankNo: "",
    isAdmin: false,
  });

  const value = useMemo(
    () => ({ formData, setFormData }),
    [formData, setFormData]
  );

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
