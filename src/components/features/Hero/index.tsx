import Image from 'next/image';

export default function Hero() {
  return (
    <section className='py-16'>
      <div className='container'>
        <div className='flex flex-col md:flex-row justify-between gap-16 items-center'>
          <div className='max-w-xl'>
            <h1 className='text-2xl md:text-5xl font-bold mb-4 leading-tight'>
              Geranciar suas finanças nunca foi tão fácil, rápido e seguro
            </h1>

            <p className='text-sm md:text-lg text-muted-foreground'>
              Com o nosso sistema de controle de gastos, você pode gerenciar
              suas finanças de forma simples e eficiente.
            </p>
          </div>

          <div className='flex items-center'>
            <Image
              src='/hero-finance2.webp'
              alt='Hero'
              width={1000}
              height={600}
              className='rounded-lg w-full h-full object-cover'
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
