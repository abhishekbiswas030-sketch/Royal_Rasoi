import { useState } from 'react';
import { useRestaurantContext } from '@/context/RestaurantContext';
import { FloorPlan } from '@/components/tables/FloorPlan';
import { Button } from '@/components/ui/button';
import { Table, TableStatus } from '@/types/restaurant';
import { Users, Check, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Tables() {
  const { tables, updateTableStatus, reservations, getTableById } = useRestaurantContext();
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  // Find reservation for selected table
  const tableReservation = selectedTable
    ? reservations.find(r => r.tableId === selectedTable.id && (r.status === 'confirmed' || r.status === 'seated'))
    : null;

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
  };

  const handleStatusChange = (status: TableStatus) => {
    if (selectedTable) {
      updateTableStatus(selectedTable.id, status);
      setSelectedTable({ ...selectedTable, status });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-display font-bold text-foreground">Table Layout</h1>
        <p className="text-muted-foreground mt-1">
          Interactive floor plan - click a table to manage its status
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Floor Plan */}
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <FloorPlan
            tables={tables}
            selectedTableId={selectedTable?.id}
            onTableClick={handleTableClick}
          />
        </div>

        {/* Table Details Panel */}
        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          {selectedTable ? (
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  Table {selectedTable.number}
                </h2>
                <button
                  onClick={() => setSelectedTable(null)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Table Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span>Capacity: {selectedTable.capacity} guests</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    selectedTable.status === 'available' && 'bg-success',
                    selectedTable.status === 'reserved' && 'bg-warning',
                    selectedTable.status === 'occupied' && 'bg-destructive'
                  )} />
                  <span className="text-foreground capitalize">{selectedTable.status}</span>
                </div>
              </div>

              {/* Reservation Info */}
              {tableReservation && (
                <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-foreground mb-2">Current Reservation</h3>
                  <p className="text-foreground font-medium">{tableReservation.guestName}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{tableReservation.time}</span>
                    <span>•</span>
                    <Users className="w-4 h-4" />
                    <span>{tableReservation.partySize} guests</span>
                  </div>
                  {tableReservation.specialRequests && (
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      "{tableReservation.specialRequests}"
                    </p>
                  )}
                </div>
              )}

              {/* Status Actions */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Change Status</p>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant={selectedTable.status === 'available' ? 'success' : 'outline'}
                    onClick={() => handleStatusChange('available')}
                    className="justify-start"
                  >
                    <Check className="w-4 h-4" />
                    Mark Available
                  </Button>
                  <Button
                    variant={selectedTable.status === 'reserved' ? 'default' : 'outline'}
                    onClick={() => handleStatusChange('reserved')}
                    className="justify-start"
                  >
                    <Clock className="w-4 h-4" />
                    Mark Reserved
                  </Button>
                  <Button
                    variant={selectedTable.status === 'occupied' ? 'destructive' : 'outline'}
                    onClick={() => handleStatusChange('occupied')}
                    className="justify-start"
                  >
                    <Users className="w-4 h-4" />
                    Mark Occupied
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-card">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Select a Table
              </h3>
              <p className="text-muted-foreground text-sm">
                Click on any table in the floor plan to view details and manage its status
              </p>
            </div>
          )}

          {/* Table Summary */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card mt-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Table Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm text-muted-foreground">Available</span>
                </div>
                <span className="font-semibold text-foreground">
                  {tables.filter(t => t.status === 'available').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-sm text-muted-foreground">Reserved</span>
                </div>
                <span className="font-semibold text-foreground">
                  {tables.filter(t => t.status === 'reserved').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-sm text-muted-foreground">Occupied</span>
                </div>
                <span className="font-semibold text-foreground">
                  {tables.filter(t => t.status === 'occupied').length}
                </span>
              </div>
              <div className="border-t border-border pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Capacity</span>
                  <span className="font-semibold text-primary">
                    {tables.reduce((acc, t) => acc + t.capacity, 0)} seats
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
