interface SettingsInputProps {
    control: any;
    label: string;
    placeholder: string;
    name: string;
    maxLength?: number;
    multiline?: boolean;
    type?: string;
}

interface OnlinePresence {
    platform: string;
    url: string;
}
