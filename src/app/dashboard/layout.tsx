import Sidebar from '@/components/features/Sidebar';
import Transactions from '@/components/features/TransactionsSide';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Poupefy',
  description: 'Dashboard do usuário',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='container flex gap-6 pt-4 pb-4 h-[calc(100dvh-100px)]'>
      <Sidebar />
      <div className='flex xl:flex-row flex-col gap-4 w-full overflow-y-auto'>
        {children}
        <Transactions />
      </div>
    </div>
  );
}
