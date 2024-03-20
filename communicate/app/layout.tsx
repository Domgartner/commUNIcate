import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import NavBar from "./components/SideBar";
import "./globals.css";
import PageAuthentication from "./components/pageAuthentication";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CommUNIcate",
  description: "University connections app",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang='en' style={{ height: '100%', width: "100%" }}>
      <body>
        <div className="container">
          <div className="navCont">
            <NavBar />
          </div>
          <div className="headContent">
            <div className="headCont">
              <Header />
            </div>
            <div className="content">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}