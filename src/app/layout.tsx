import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Alex Vance — Systems & Design Technologist",
  description:
    "High-impact systems engineering and tactile interaction portfolio inspired by Will Dzierson. Featuring sub-millisecond distributed runtimes, 120 FPS physics, and an embedded RAG Copilot.",
  keywords: [
    "Design Technologist",
    "Systems Architect",
    "Rust",
    "WebAssembly",
    "Next.js",
    "RAG Copilot",
    "WebGL",
    "Distributed Systems",
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
