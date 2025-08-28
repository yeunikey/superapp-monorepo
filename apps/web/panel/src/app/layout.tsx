import "./globals.css";

import Authorize from "@/features/auth/ui/Authorize";
import { Golos_Text } from "next/font/google";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Панель управления",
  description: "Панель управления AITU SuperApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${golos.variable} antialiased bg-background h-dvh`}
      >

        <ToastContainer closeButton hideProgressBar position="bottom-right" stacked autoClose={3000} />

        <Authorize>
          <div className="flex flex-col h-full">
            {children}
          </div>
        </Authorize>

      </body>
    </html>
  );
}
