import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { SkeletonCard } from "./components/ui/skeleton/SkeletonCard";
import { ErrorBoundary } from "./components/ui/error/ErrorBoundary";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Loomovel",
  description: "Projeto Loomovel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-gray-950 text-gray-100`}
      >
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} showImage showAvatar lines={3} />
                ))}
              </div>
            }
          >
            {children}
          </Suspense>
          <Toaster position="top-right" richColors />
        </ErrorBoundary>
      </body>
    </html>
  );
}
