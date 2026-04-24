import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/shared/navigation";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deploy IQ — AI Enablement Control Tower",
  description:
    "Portfolio-scale AI enablement control tower for multi-platform training, governance, vendor coordination, champions, adoption analytics, and ROI measurement.",
  openGraph: {
    title: "Deploy IQ — AI Enablement Control Tower",
    description:
      "A portfolio operations command center for AI training, adoption, governance, and measurable value creation.",
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
                Deploy IQ — AI Enablement Control Tower
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
                {" "}for multi-platform portfolio AI enablement
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
