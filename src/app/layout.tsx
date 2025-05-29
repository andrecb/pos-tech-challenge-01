import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/features/Header';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
  title: "Poupefy",
  description: "Seu sistema de controle financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <TooltipProvider>
          <Header />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
