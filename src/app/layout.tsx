import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/features/Header';
import Footer from '@/components/features/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TransactionProvider } from '@/shared/contexts/TransactionContext';

export const metadata: Metadata = {
  title: "Poupefy - Dashboard Financeiro",
  description: "Gerencie suas finanças de forma simples e eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        <TransactionProvider>
          <TooltipProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </TransactionProvider>
      </body>
    </html>
  );
}
