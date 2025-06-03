export function TransactionTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse" />
        <div className="h-9 w-36 bg-zinc-800 rounded animate-pulse" />
      </div>

      <div className="bg-zinc-900 rounded-lg">
        <div className="p-4">
          <div className="w-full">
            {/* Cabeçalho da tabela */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="h-8 bg-zinc-800 rounded animate-pulse" />
              <div className="h-8 bg-zinc-800 rounded animate-pulse" />
              <div className="h-8 bg-zinc-800 rounded animate-pulse" />
              <div className="h-8 bg-zinc-800 rounded animate-pulse" />
              <div className="h-8 bg-zinc-800 rounded animate-pulse" />
            </div>

            {/* Linhas da tabela */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 mb-2">
                <div className="h-12 bg-zinc-800 rounded animate-pulse" />
                <div className="h-12 bg-zinc-800 rounded animate-pulse" />
                <div className="h-12 bg-zinc-800 rounded animate-pulse" />
                <div className="h-12 bg-zinc-800 rounded animate-pulse" />
                <div className="h-12 bg-zinc-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 