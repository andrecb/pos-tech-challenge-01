'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isDashboard = pathname?.includes('/dashboard');

  if (isDashboard) return null;
  
  return (
    <footer className="w-full py-4 text-center text-foreground bg-background mt-auto border-t border-border">
      <p className="text-sm">© Poupefy, todos os direitos reservados - {currentYear}</p>
    </footer>
  );
};
