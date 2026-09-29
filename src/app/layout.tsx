import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Arush Jain — AI Systems, Analytics & Full-Stack Engineer",
  description:
    "Portfolio of Arush Jain. Engineering scalable multi-agent systems, data analytics warehouses, and full-stack cloud applications. B.Tech Smart Manufacturing at IIITDM Jabalpur • Amazon ML Summer School 2026.",
  keywords: [
    "Arush Jain",
    "IIITDM Jabalpur",
    "Amazon ML Summer School",
    "AI Systems",
    "Data Analytics",
    "Multi-Agent Workflows",
    "Full-Stack Applications",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "A/B Testing",
  ],
  authors: [{ name: "Arush Jain", url: "https://github.com/Slash-495" }],
  openGraph: {
    title: "Arush Jain — AI Systems, Analytics & Full-Stack Engineer",
    description:
      "Engineering scalable multi-agent systems, relational data warehouses, and production full-stack applications.",
    type: "website",
    locale: "en_US",
    siteName: "Arush Jain Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arush Jain — AI Systems, Analytics & Full-Stack Engineer",
    description:
      "Engineering scalable multi-agent systems, relational data warehouses, and production full-stack applications.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#F9F9F6] text-[#1A1A1A] font-sans antialiased selection:bg-[#455A30]/20 selection:text-[#1A1A1A]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
