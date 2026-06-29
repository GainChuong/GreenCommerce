import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "ReFashion - Mua Sắm Xanh & Phân Tích Cảm Xúc Khách Hàng",
  description: "Trang web thúc đẩy mua sắm thời trang xanh, bảo vệ môi trường, quyên góp quần áo và tích lũy GreenCoin tích hợp AI phân tích cảm xúc khách hàng.",
  keywords: ["thời trang xanh", "mua sắm xanh", "tái chế quần áo", "phân tích cảm xúc AI", "GreenCoin", "bảo vệ môi trường"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Font Awesome Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
