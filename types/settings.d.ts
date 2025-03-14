interface SettingsInputProps {
  control: any;
  label: string;
  placeholder?: string;
  name: string;
  maxLength?: number;
  multiline?: boolean;
  type?: string;
}

type SettingsSwitchProp = Pick<SettingsInputProps, 'name' | 'label'> & {
  description: string;
};

interface OnlinePresence {
  platform: 'GitHub' | 'Figma' | 'Instagram' | 'Facebook' | 'LinkedIn';
  url: string;
}

type User = {
  id: number;
  email: string;
  address: string;
  phoneNumber: number;
  country: string;
  name: string;
  firstName: string;
  lastName: string;
  location: string;
  profession: string;
  bio: string;
  links: OnlinePresence[];
  pictureUrl: string;
};
