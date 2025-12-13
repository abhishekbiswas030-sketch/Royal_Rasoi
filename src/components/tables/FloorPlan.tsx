import { Table, TableStatus } from '@/types/restaurant';
import { TableItem } from './TableItem';
import { cn } from '@/lib/utils';

interface FloorPlanProps {
  tables: Table[];
  selectedTableId?: string;
  onTableClick?: (table: Table) => void;
}

const legendItems: { status: TableStatus; label: string; color: string }[] = [
  { status: 'available', label: 'Available', color: 'bg-success' },
  { status: 'reserved', label: 'Reserved', color: 'bg-warning' },
  { status: 'occupied', label: 'Occupied', color: 'bg-destructive' },
];

export function FloorPlan({ tables, selectedTableId, onTableClick }: FloorPlanProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        {legendItems.map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", item.color)} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Floor Plan */}
      <div className="relative w-full h-[500px] bg-secondary/30 rounded-xl border border-border overflow-hidden">
        {/* Restaurant elements */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-muted rounded-lg text-xs text-muted-foreground">
          Entrance
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-muted rounded-lg text-xs text-muted-foreground">
          Kitchen
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-muted rounded-lg text-xs text-muted-foreground">
          Bar
        </div>

        {/* Tables */}
        {tables.map((table) => (
          <TableItem
            key={table.id}
            table={table}
            isSelected={table.id === selectedTableId}
            onClick={() => onTableClick?.(table)}
          />
        ))}
      </div>
    </div>
  );
}
