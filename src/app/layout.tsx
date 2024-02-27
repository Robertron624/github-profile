import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import ToastProvider from "./components/ToastProvider";

const vietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Github Profile",
  description: "A simple Github profile page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={vietnam.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
