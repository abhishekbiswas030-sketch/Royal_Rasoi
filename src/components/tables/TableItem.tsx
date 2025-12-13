import { Table, TableStatus } from '@/types/restaurant';
import { cn } from '@/lib/utils';
import { Users } from 'lucide-react';

interface TableItemProps {
  table: Table;
  onClick?: () => void;
  isSelected?: boolean;
}

const statusStyles: Record<TableStatus, string> = {
  available: 'bg-success/20 border-success text-success hover:bg-success/30',
  occupied: 'bg-destructive/20 border-destructive text-destructive',
  reserved: 'bg-warning/20 border-warning text-warning',
};

const shapeStyles = {
  round: 'rounded-full',
  square: 'rounded-xl',
  rectangle: 'rounded-xl',
};

const sizeStyles = {
  round: 'w-20 h-20',
  square: 'w-24 h-24',
  rectangle: 'w-36 h-20',
};

export function TableItem({ table, onClick, isSelected }: TableItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={table.status === 'occupied'}
      className={cn(
        "absolute border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300",
        shapeStyles[table.shape],
        sizeStyles[table.shape],
        statusStyles[table.status],
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
        table.status !== 'occupied' && 'cursor-pointer hover:scale-105',
        table.status === 'occupied' && 'cursor-not-allowed opacity-60'
      )}
      style={{
        left: `${table.position.x}%`,
        top: `${table.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <span className="text-lg font-display font-bold">{table.number}</span>
      <div className="flex items-center gap-1 text-xs">
        <Users className="w-3 h-3" />
        <span>{table.capacity}</span>
      </div>
    </button>
  );
}
