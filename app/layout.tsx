import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./styles/headings.scss";
import GlobalLayout from "@/components/layouts/global-layout";

export const metadata: Metadata = {
  title: "Frontend Training App",
  description: "Generated by create next app",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add the weights you need
  variable: "--font-poppins", // Custom CSS variable for font family
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
