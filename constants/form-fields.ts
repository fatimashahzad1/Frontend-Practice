import { POST_TYPE } from "./index";

export const enum FORM_FIELD_NAMES {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  ACCEPT = "acceptTerms",
  BANK_NO = "bankNo",
  ADDRESS = "address",
  PHONE_NUMBER = "phoneNumber",
  COUNTRY = "country",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  LOCATION = "location",
  PROFESSION = "profession",
  BIO = "bio",
  CARDHOLDER_NAME = "cardholderName",
  CARD_NUMBER = "cardNumber",
  EXPIRY_DATE = "expiryDate",
  CVV = "cvv",
  WEEKLY_NEWSLETTER = "weeklyNewsletter",
  ACCOUNT_SUMMARY = "accountSummary",
  WEBSITE_NOTIFICATIONS_CHECKS = "websiteNotifications",
  CONTENT = "content",
  POST_IMAGE = "postImage",
  TITLE = "title",
  DESCRIPTION = "description",
  ESTIMATED_TIME = "estimatedTime",
  ARTICLE_IMAGE = "articleImage",
  EVENT_DATE = "eventDate",
  EVENT_TIME = "eventTime",
  TYPE = "type",
  PICTURE_URL = "pictureUrl",
  PLATFORM = "platform",
  URL = "url",
  COMPANY_NAME = "companyName",
  COMPANY_WEBSITE = "companyWebsite",
  COMPANY_SIZE = "companySize",
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

export const CONFIRM_PASSWORD_FIELD: FormField = {
  name: FORM_FIELD_NAMES.CONFIRM_PASSWORD,
  label: "Confirm password*",
  placeholder: "Enter confirm password",
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

export const DEFAULT_RESET_PASSWORD_VALUES = {
  password: "",
  confirmPassword: "",
};

export const DEFAULT_GENERAL_SETTINGS_VALUES = {
  firstName: "",
  lastName: "",
  location: "",
  profession: "",
  bio: "",
};

export const DEFAULT_CHANGE_EMAIL_VALUES = {
  email: "",
};

export const DEFAULT_PAYMENT_METHOD_VALUES = {
  type: "Visa" as "Visa" | "MasterCard", // Default to Visa
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

export const DEFAULT_CREATE_ARTICLE_VALUES = {
  title: "",
  description: "",
  estimatedTime: "",
};

export const DEFAULT_EVENT_VALUES = {
  content: "",
  type: POST_TYPE.FEED,
};

export const DEFAULT_NOTIFICATIONS_VALUES = {
  weeklyNewsletter: false,
  accountSummary: false,
  websiteNotifications: [],
};

export const DEFAULT_ONLINE_PRESENCE_VALUES = {
  platform: "GitHub" as const,
  url: "",
};

export const FIRST_NAME_FIELD: FormField = {
  name: FORM_FIELD_NAMES.FIRST_NAME,
  label: "First Name*",
  placeholder: "Enter full name",
};

export const LAST_NAME_FIELD: FormField = {
  name: FORM_FIELD_NAMES.LAST_NAME,
  label: "Last Name*",
  placeholder: "Enter last name",
};

export const LOCATION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.LOCATION,
  label: "Location*",
  placeholder: "Enter location",
  maxLength: 50,
};

export const PROFESSION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.PROFESSION,
  label: "Profession*",
  placeholder: "Enter profession",
};

export const BIO_FIELD: FormField = {
  name: FORM_FIELD_NAMES.BIO,
  label: "Bio*",
  placeholder: "Enter bio",
};

export const CARD_HOLDER_NAME_FIELD: FormField = {
  name: FORM_FIELD_NAMES.CARDHOLDER_NAME,
  label: "Cardholder Name",
  placeholder: "Enter Full Name",
};

export const CARD_NUMBER_FIELD: FormField = {
  name: FORM_FIELD_NAMES.CARD_NUMBER,
  label: "Card Number",
  placeholder: "1234 5678 9012 3456",
  maxLength: 16,
};

export const EXPIRY_DATE_FIELD: FormField = {
  name: FORM_FIELD_NAMES.EXPIRY_DATE,
  label: "Expiry Date",
  placeholder: "MM/YY",
};
export const CVV_FIELD: FormField = {
  name: FORM_FIELD_NAMES.CVV,
  label: "CVV",
  placeholder: "***",
};

export const WEEKLY_NEWSLETTTER_SWITCH_FIELD: FormFieldSwitch = {
  name: FORM_FIELD_NAMES.WEEKLY_NEWSLETTER,
  label: "Weekly newsletter",
  description: "A small text about what the newsletters might contain.",
};

export const ACCOUNT_SUMMARY_SWITCH_FIELD: FormFieldSwitch = {
  name: FORM_FIELD_NAMES.ACCOUNT_SUMMARY,
  label: "Account summary",
  description: "A small text about what the newsletters might contain.",
};

export const CREATE_ARTICLE_TITLE_FIELD: FormField = {
  name: FORM_FIELD_NAMES.TITLE,
  label: "Title*",
  placeholder: "Enter Title",
  maxLength: 255,
};

export const CREATE_ARTICLE_DESCRIPTION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.DESCRIPTION,
  label: "Description*",
  placeholder: "Enter Description",
  maxLength: 1000,
};

export const CREATE_ARTICLE_ESTIMATION_FIELD: FormField = {
  name: FORM_FIELD_NAMES.ESTIMATED_TIME,
  label: "Time Estimation*",
  placeholder: "e.g. 10 min",
  maxLength: 25,
};

export const COMPANY_NAME_FIELD: FormField = {
  name: FORM_FIELD_NAMES.COMPANY_NAME,
  label: "Comapany Name*",
  placeholder: "Enter company name",
  type: "text",
  maxLength: 20,
};

export const COMPANY_WEBSITE_FIELD: FormField = {
  name: FORM_FIELD_NAMES.COMPANY_WEBSITE,
  label: "Company Website",
  type: "text",
  placeholder: "Enter company website",
};

export const COMPANY_SIZE_FIELD: FormField = {
  name: FORM_FIELD_NAMES.COMPANY_SIZE,
  label: "Company Size",
  type: "number",
  placeholder: "Enter company size",
};
