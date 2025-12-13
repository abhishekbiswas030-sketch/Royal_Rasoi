import { useState, useMemo } from 'react';
import { useRestaurantContext } from '@/context/RestaurantContext';
import { ReservationCard } from '@/components/reservations/ReservationCard';
import { ReservationForm } from '@/components/reservations/ReservationForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';

export default function Reservations() {
  const { 
    reservations, 
    addReservation, 
    seatGuests, 
    completeReservation, 
    updateReservation,
    getTableById 
  } = useRestaurantContext();

  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredReservations = useMemo(() => {
    return reservations
      .filter(r => {
        const matchesSearch = r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              r.guestPhone.includes(searchQuery) ||
                              r.guestEmail.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        // Sort by date and time
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeA.getTime() - dateTimeB.getTime();
      });
  }, [reservations, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Reservations</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your restaurant reservations
          </p>
        </div>
        <Button variant="gold" onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4" />
          New Reservation
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="seated">Seated</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 animate-fade-in" style={{ animationDelay: '150ms' }}>
        {[
          { label: 'All', value: reservations.length, filter: 'all' },
          { label: 'Pending', value: reservations.filter(r => r.status === 'pending').length, filter: 'pending' },
          { label: 'Confirmed', value: reservations.filter(r => r.status === 'confirmed').length, filter: 'confirmed' },
          { label: 'Seated', value: reservations.filter(r => r.status === 'seated').length, filter: 'seated' },
          { label: 'Completed', value: reservations.filter(r => r.status === 'completed').length, filter: 'completed' },
        ].map((stat) => (
          <button
            key={stat.filter}
            onClick={() => setStatusFilter(stat.filter)}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              statusFilter === stat.filter 
                ? 'bg-primary/20 border-primary text-primary' 
                : 'bg-card border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            <span className="text-2xl font-display font-bold block">{stat.value}</span>
            <span className="text-xs">{stat.label}</span>
          </button>
        ))}
      </div>

      {/* Reservations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReservations.map((reservation, index) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            table={reservation.tableId ? getTableById(reservation.tableId) : undefined}
            onSeat={() => seatGuests(reservation.id)}
            onComplete={() => completeReservation(reservation.id)}
            onCancel={() => updateReservation(reservation.id, { status: 'cancelled' })}
            delay={200 + index * 50}
          />
        ))}
      </div>

      {filteredReservations.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center animate-fade-in">
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== 'all' 
              ? 'No reservations match your filters' 
              : 'No reservations yet'}
          </p>
        </div>
      )}

      {/* Reservation Form Modal */}
      {showForm && (
        <ReservationForm
          onSubmit={addReservation}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
