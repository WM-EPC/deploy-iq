import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/shared/navigation";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deploy IQ — Enterprise AI Deployment Toolkit",
  description:
    "Plan, enable, and measure enterprise AI adoption with OpenAI's product suite. Built on OpenAI's published frameworks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-border bg-card">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                Deploy IQ — Enterprise AI Deployment Toolkit
              </p>
              <p className="text-sm text-muted-foreground">
                Built on OpenAI&apos;s published frameworks &amp; methodology
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
