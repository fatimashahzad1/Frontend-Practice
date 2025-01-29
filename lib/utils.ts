import { TOKEN_COOKIE_NAME } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { cookies } from "next/headers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
