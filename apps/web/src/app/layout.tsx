import type { Metadata } from "next";
import { SUSE } from "next/font/google";
import "./globals.css";
import { FyskProvider } from "@fysk/ui";
import { ThemeProvider } from "next-themes";

const suseSans = SUSE({
  variable: "--font-suse-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fysk - Smart Component library",
  description:
    "Fysk is a smart component library that helps you build beautiful and responsive UIs with ease. Built top on ShadCN eco-system and supports ShadCN CLI to install components.",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FyskProvider>
            {children}
          </FyskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
