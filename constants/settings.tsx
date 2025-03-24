import { Facebook, Figma, Github, Instagram, Linkedin } from "lucide-react";

const iconStyles = "absolute left-7 top-1/2 -translate-y-1/2 text-[#202142]";

export const ONLINE_PRESENCE_PLATFORMS_ICONS = {
  GitHub: <Github className={iconStyles} size={18} />,
  Figma: <Figma className={iconStyles} size={18} />,
  Instagram: <Instagram className={iconStyles} size={18} />,
  Facebook: <Facebook className={iconStyles} size={18} />,
  LinkedIn: <Linkedin className={iconStyles} size={18} />,
};

export const WEBSITE_NOTIFICATIONS_CHECKBOX_ITEMS = [
  "New follower",
  "Post like",
  "Someone you followed posted",
  "Post added to collection",
  "Post downloaded",
];
