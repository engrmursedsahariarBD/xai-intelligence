import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Xai – Intelligence Workspace",
  description:
    "Data becomes intelligence. An interactive product experience prototype for the Xai intelligence workspace.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://xai.app"),
  openGraph: {
    type: "website",
    title: "Xai – Intelligence Workspace",
    description:
      "Data becomes intelligence. An interactive product experience prototype for the Xai intelligence workspace.",
    url: "https://xai.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xai – Intelligence Workspace",
    description:
      "Data becomes intelligence. An interactive product experience prototype for the Xai intelligence workspace.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#08090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrains_mono.variable}`}
        style={{ backgroundColor: "#08090B", color: "#F2F3F5", overflowX: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}