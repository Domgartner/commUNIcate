import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import NavBar from "./components/SideBar";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CommUNIcate",
  description: "University connections app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ height: "100%", width: "100%" }}>
      <body>
        <div className="h-screen">
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
