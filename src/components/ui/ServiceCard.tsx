import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export function ServiceCard({ title, description, icon: Icon, onClick }: ServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-left cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 bg-zinc-900 rounded-lg">
          <Icon size={24} className="text-zinc-200" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-zinc-200">{title}</span>
          <span className="text-sm text-zinc-400">{description}</span>
        </div>
      </div>
    </button>
  );
} 