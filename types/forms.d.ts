type FormField = {
  name: FORM_FIELD_NAMES;
  type?: string;
  placeholder?: string;
  label: string;
  maxLength?: number;
  multiline?: boolean;
};

type FormFieldSwitch = Pick<FormField, 'name' | 'label'> & {
  description: string;
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
interface ChangeUserDetailsFormData {
  id?: number;
  firstName?: string;
  lastName?: string;
  location?: string;
  profession?: string;
  bio?: string;
  links?: OnlinePresence[];
  pictureUrl?: string;
  email?: string;
}
