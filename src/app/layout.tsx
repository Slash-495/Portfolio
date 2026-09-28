import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Arush Jain — AI Systems & Full-Stack Engineer",
  description:
    "Portfolio of Arush Jain (IIITDM Jabalpur). Engineering scalable AI systems, multi-agent workflows, full-stack applications, and foundational data structures. Features an embedded RAG Copilot and high-impact case studies.",
  keywords: [
    "Arush Jain",
    "IIITDM Jabalpur",
    "Scalable AI Systems",
    "Multi-Agent Workflows",
    "Full-Stack Applications",
    "Data Structures",
    "Next.js",
    "RAG Copilot",
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
      <body className="bg-background text-foreground bg-grid-pattern selection:bg-emerald-500/20 selection:text-emerald-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
