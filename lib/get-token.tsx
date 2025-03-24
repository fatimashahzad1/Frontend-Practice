"use server";
import { TOKEN_COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";

export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value ?? "";
  return token;
};

export const removeToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
};
