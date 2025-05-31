import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Header from '@/components/features/Header';
import { TooltipProvider } from '@/components/ui/tooltip';
import { TransactionProvider } from '@/shared/contexts/TransactionContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Dashboard Financeiro",
  description: "Gerencie suas finanças de forma simples e eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <TransactionProvider>
          <TooltipProvider>
            <Header />
            {children}
          </TooltipProvider>
        </TransactionProvider>
      </body>
    </html>
  );
}
