type FormField = {
  name: FORM_FIELD_NAMES;
  type?: string;
  placeholder: string;
  label: string;
  maxLength?: number;
  multiline?: boolean;
};

interface PersonalFormData {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

interface ResidencyFormData {
  phoneNumber: string;
  address: string;
  country: string;
}

interface BankFormData {
  bankNo: string;
}

type RegisterFormData = PersonalFormData & ResidencyFormData & BankFormData;

interface LoginFormData {
  email: string;
  password: string;
}

interface ForgetPasswordFormData {
  email: string;
}

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}
