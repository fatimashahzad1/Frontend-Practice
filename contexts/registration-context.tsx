"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

interface RegistrationContextProps {
  formData: RegisterFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
  companyFormData: CompanyRegisterFormData;
  setCompanyFormData: React.Dispatch<
    React.SetStateAction<CompanyRegisterFormData>
  >;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined,
);

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider",
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
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    acceptTerms: false,
    phoneNumber: "",
    address: "",
    country: "",
    bankNo: "",
  });
  const [companyFormData, setCompanyFormData] =
    useState<CompanyRegisterFormData>({
      companyName: "",
      companyWebsite: "",
      companySize: 0,
      email: "",
      password: "",
      acceptTerms: false,
      phoneNumber: "",
      address: "",
      country: "",
      bankNo: "",
    });
  const value = useMemo(
    () => ({ formData, setFormData, companyFormData, setCompanyFormData }),
    [formData, setFormData, companyFormData, setCompanyFormData],
  );

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
