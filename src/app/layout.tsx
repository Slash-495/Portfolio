import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Arush Jain — AI Systems & Full-Stack Engineer",
  description:
    "Portfolio of Arush Jain. Engineering scalable AI systems, multi-agent workflows, full-stack applications, and foundational data structures. Minimalist editorial portfolio.",
  keywords: [
    "Arush Jain",
    "IIITDM Jabalpur",
    "Scalable AI Systems",
    "Multi-Agent Workflows",
    "Full-Stack Applications",
    "Next.js",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#F9F9F6] text-[#1A1A1A] font-sans antialiased selection:bg-[#7A8B6B]/20 selection:text-[#1A1A1A]">
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
