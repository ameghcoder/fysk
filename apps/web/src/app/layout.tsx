import type { Metadata } from "next";
import { SUSE } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const suseSans = SUSE({
  variable: "--font-suse-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fysk - Stateful Component library",
  description:
    "Fysk is a Stateful component library that helps you build beautiful and responsive UIs with ease. Built top on ShadCN eco-system and supports ShadCN CLI to install components.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: ["/assets/readme-banner.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/readme-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${suseSans.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


