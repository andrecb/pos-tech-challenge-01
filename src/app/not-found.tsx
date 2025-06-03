import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404 - Página não encontrada</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Ops! A página que você está procurando não existe ou foi removida.
      </p>
      <Link href="/">
        <Button className='bg-primary rounded-md px-4 py-2'>
          Voltar para a página inicial
        </Button>
      </Link>
    </div>
  );
}