export const enum FORM_FIELD_NAMES {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  ACCEPT = 'acceptTerms',
  BANK_NO = 'bankNo',
  ADDRESS = 'address',
  PHONE_NUMBER = 'phoneNumber',
  COUNTRY = 'country',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  LOCATION = 'location',
  PROFESSION = 'profession',
  BIO = 'bio',
}

export const FULLNAME_FIELD: FormField = {
  name: FORM_FIELD_NAMES.NAME,
  label: 'Your fullname*',
  placeholder: 'Enter full name',
  type: 'text',
  maxLength: 20,
};

export const EMAIL_FIELD: FormField = {
  name: FORM_FIELD_NAMES.EMAIL,
  label: 'Email address*',
  placeholder: 'Enter email address',
  type: 'email',
  maxLength: 50,
};

export const PASSWORD_FIELD: FormField = {
  name: FORM_FIELD_NAMES.PASSWORD,
  label: 'Create password*',
  placeholder: 'Enter password',
  type: 'password',
  maxLength: 20,
};

export const CONFIRM_PASSWORD_FIELD: FormField = {
  name: FORM_FIELD_NAMES.CONFIRM_PASSWORD,
  label: 'Confirm password*',
  placeholder: 'Enter confirm password',
  type: 'password',
  maxLength: 20,
};

export const TERMS_AND_CONDITIONS_FIELD: FormField = {
  name: FORM_FIELD_NAMES.ACCEPT,
  label: 'I agree to terms & conditions',
  placeholder: '',
  type: 'checkbox',
};

export const BANK_VERIFICATION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.BANK_NO,
  label: 'Bank verification number (BVN)',
  placeholder: 'Enter BVN',
  type: 'number',
};

export const ADDRESS_VERIFICATION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.ADDRESS,
  label: 'Your address',
  placeholder: 'Please enter address',
  type: 'text',
  maxLength: 50,
};

export const DEFAULT_LOGIN_VALUES = {
  email: '',
  password: '',
};

export const DEFAULT_FORGET_PASSWORD_VALUES = {
  email: '',
};

export const DEFAULT_RESET_PASSWORD_VALUES = {
  password: '',
  confirmPassword: '',
};

export const DEFAULT_GENERAL_SETTINGS_VALUES = {
  pictureUrl: '',
  firstName: '',
  lastName: '',
  location: '',
  profession: '',
  bio: '',
};

export const FIRST_NAME_FIELD: FormField = {
  name: FORM_FIELD_NAMES.FIRST_NAME,
  label: 'First Name*',
  placeholder: 'Enter full name',
};

export const LAST_NAME_FIELD: FormField = {
  name: FORM_FIELD_NAMES.LAST_NAME,
  label: 'Last Name*',
  placeholder: 'Enter last name',
};

export const LOCATION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.LOCATION,
  label: 'Location*',
  placeholder: 'Enter location',
  maxLength: 50,
};

export const PROFESSION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.PROFESSION,
  label: 'Profession*',
  placeholder: 'Enter profession',
};

export const BIO_FIELD: FormField = {
  name: FORM_FIELD_NAMES.BIO,
  label: 'Bio*',
  placeholder: 'Enter bio',
};
