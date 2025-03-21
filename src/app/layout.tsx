import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/context/carritoContext";
import { UserProvider } from "@/context/authContext";
import axios from "axios";

// Habilita el envío de cookies en todas las peticiones con Axios
axios.defaults.withCredentials = true;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Stickeando",
  description: "Las mejores impresiones para personalizar tus productos."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <CarritoProvider>
        <html lang="en">
          <head>
            <title>Stickeando</title>
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <meta
              name="description"
              content="Este es el sitio web de Stickeando, donde podrás encontrar lo mejor para personalizar tus productos."
            />
            <meta property="og:title" content="Stickeando" />
            <meta
              property="og:description"
              content="Este es el sitio web de Stickeando, donde podrás encontrar lo mejor para personalizar tus productos."
            />
            <meta property="og:image" content="/Logo.png" />
            <meta property="og:url" content="https://stickeando.vercel.app/" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Stickeando" />
            <meta
              name="twitter:description"
              content="Este es el sitio web de Stickeando, donde podrás encontrar lo mejor para personalizar tus productos."
            />
            <meta name="twitter:image" content="/Logo.png" />


          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
          >
            {children}
          </body>
        </html>
      </CarritoProvider>
    </UserProvider>
  );
}
