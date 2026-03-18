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
    "Plan, enable, and measure enterprise AI adoption with OpenAI's product suite. Assessment, deployment planning, workshops, ROI modeling, and eval strategy — built on OpenAI's published frameworks by Bill Mabry.",
  openGraph: {
    title: "Deploy IQ — Enterprise AI Deployment Toolkit",
    description:
      "Structured enterprise AI deployment using OpenAI's adoption framework. Assessment, planning, enablement, and measurement in one toolkit.",
    type: "website",
  },
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
                Built by{" "}
                <a
                  href="https://billmabry.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:text-primary transition-colors"
                >
                  Bill Mabry
                </a>
                {" "}using OpenAI&apos;s published frameworks
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
