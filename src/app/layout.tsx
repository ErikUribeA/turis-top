import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./auth-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import Head from 'next/head';
import Header from "@/components/header/Header";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeWrapper from "@/ThemeWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TurisTop | Descubre & Explora",
  description: "Descubre y explora los mejores destinos turísticos de Antioquia.",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Descubre Antioquia a través de su cultura, naturaleza y tradición. Un viaje único por los paisajes, pueblos y actividades que hacen de esta región un destino inolvidable."
        />
        <meta
          name="keywords"
          content="Antioquia, Colombia, tour, turismo, viajes, cultura, naturaleza, tradición, pueblos, montañas, río, gastronomía, Medellín, Erik Josue Uribe, Maria Isabel Vanegas, Alejandro Echavarria, Luisa Fernanda Ramirez, pueblos mágicos, aventura, ecoturismo, paisaje, viaje, destino, Colombia, turismo rural, historia, arquitectura, ecoturismo, turismo sostenible, patrimonio, patrimonio cultural, exploración, naturaleza, viajeros, turismo cultural"
        />
        <meta name="sitedomain" content="https://turis-top.vercel.app/" />
        <meta name="organization" content="TurisTop" />
        <meta name="author" content="Erik Josue Uribe, Maria Isabel Vanegas, Alejandro Echavarria, Luisa Fernanda Ramirez" />
        <meta name="designer" content="Erik Josue Uribe, Maria Isabel Vanegas, Alejandro Echavarria, Luisa Fernanda Ramirez" />
        <meta name="copyright" content="© 2025 TurisTop. Todos los derechos reservados." />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="revisit-after" content="15days" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ThemeProvider> {/* Aquí envolvemos con ThemeProvider */}
              <Header />
              <ThemeWrapper>
                {children}
              </ThemeWrapper>
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}