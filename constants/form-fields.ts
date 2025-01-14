export const enum FORM_FIELD_NAMES {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
  ACCEPT = "acceptTerms",
  BANK_NO = "bankNo",
  ADDRESS = "address",
  PHONE_NUMBER = "phoneNumber",
  COUNTRY = "country",
}

export const FULLNAME_FIELD: FormField = {
  name: FORM_FIELD_NAMES.NAME,
  label: "Your fullname*",
  placeholder: "Enter full name",
  type: "text",
  maxLength: 20,
};

export const EMAIL_FIELD: FormField = {
  name: FORM_FIELD_NAMES.EMAIL,
  label: "Email address*",
  placeholder: "Enter email address",
  type: "email",
  maxLength: 50,
};

export const PASSWORD_FIELD: FormField = {
  name: FORM_FIELD_NAMES.PASSWORD,
  label: "Create password*",
  placeholder: "Enter password",
  type: "password",
  maxLength: 20,
};

export const TERMS_AND_CONDITIONS_FIELD: FormField = {
  name: FORM_FIELD_NAMES.ACCEPT,
  label: "I agree to terms & conditions",
  placeholder: "",
  type: "checkbox",
};

export const BANK_VERIFICATION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.BANK_NO,
  label: "Bank verification number (BVN)",
  placeholder: "Enter BVN",
  type: "number",
};

export const ADDRESS_VERIFICATION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.ADDRESS,
  label: "Your address",
  placeholder: "Please enter address",
  type: "text",
  maxLength: 50,
};

export const DEFAULT_LOGIN_VALUES = {
  email: "",
  password: "",
};

export const DEFAULT_FORGET_PASSWORD_VALUES = {
  email: "",
};
