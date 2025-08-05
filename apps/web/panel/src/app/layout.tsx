import type { Metadata } from "next";
import { Golos_Text } from "next/font/google";
import "./globals.css";

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
        className={`${golos.variable} antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
