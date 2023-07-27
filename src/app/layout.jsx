import "./public/css/globals.css";
import { Inter } from "next/font/google";
import Provider from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-slate-50 ${inter.className}`}>
        <Provider>
          <ToasterContext />
          {children}
        </Provider>
        <Footer />
      </body>
    </html>
  );
}