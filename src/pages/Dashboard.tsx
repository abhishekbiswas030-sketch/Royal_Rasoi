// import { useRestaurantContext } from '@/context/RestaurantContext';
// import { StatCard } from '@/components/dashboard/StatCard';
// import { ReservationCard } from '@/components/reservations/ReservationCard';
// import { 
//   CalendarCheck, 
//   Users, 
//   Grid3X3, 
//   Clock,
//   TrendingUp
// } from 'lucide-react';

// export default function Dashboard() {
//   const { stats, reservations, tables, seatGuests, completeReservation, updateReservation, getTableById } = useRestaurantContext();

//   // Get upcoming reservations (confirmed or pending)
//   const upcomingReservations = reservations
//     .filter(r => r.status === 'confirmed' || r.status === 'pending')
//     .slice(0, 4);

//   // Get currently seated reservations
//   const seatedReservations = reservations.filter(r => r.status === 'seated');

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="animate-fade-in">
//         <h1 className="text-4xl font-display font-bold text-foreground mb-2">
//           Welcome to <span className="text-gradient-gold">Royal Rasoi</span>
//         </h1>
//         <p className="text-muted-foreground">
//           Here's what's happening at your restaurant today
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//         <StatCard
//           title="Today's Reservations"
//           value={stats.todayReservations}
//           icon={CalendarCheck}
//           variant="primary"
//           trend={{ value: 12, isPositive: true }}
//           delay={100}
//         />
//         <StatCard
//           title="Guests Seated"
//           value={stats.seatedGuests}
//           icon={Users}
//           variant="success"
//           delay={200}
//         />
//         <StatCard
//           title="Available Tables"
//           value={`${stats.availableTables}/${stats.totalTables}`}
//           icon={Grid3X3}
//           delay={300}
//         />
//         <StatCard
//           title="Pending Reservations"
//           value={stats.pendingReservations}
//           icon={Clock}
//           variant="warning"
//           delay={400}
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Upcoming Reservations */}
//         <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-2xl font-display font-semibold text-foreground">
//               Upcoming Reservations
//             </h2>
//             <span className="text-sm text-muted-foreground">
//               {upcomingReservations.length} upcoming
//             </span>
//           </div>
//           <div className="space-y-4">
//             {upcomingReservations.length > 0 ? (
//               upcomingReservations.map((reservation, index) => (
//                 <ReservationCard
//                   key={reservation.id}
//                   reservation={reservation}
//                   table={reservation.tableId ? getTableById(reservation.tableId) : undefined}
//                   onSeat={() => seatGuests(reservation.id)}
//                   onCancel={() => updateReservation(reservation.id, { status: 'cancelled' })}
//                   delay={600 + index * 100}
//                 />
//               ))
//             ) : (
//               <div className="bg-card border border-border rounded-xl p-8 text-center">
//                 <CalendarCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
//                 <p className="text-muted-foreground">No upcoming reservations</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Currently Seated */}
//         <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-2xl font-display font-semibold text-foreground">
//               Currently Seated
//             </h2>
//             <span className="text-sm text-muted-foreground">
//               {seatedReservations.length} active
//             </span>
//           </div>
//           <div className="space-y-4">
//             {seatedReservations.length > 0 ? (
//               seatedReservations.map((reservation, index) => (
//                 <ReservationCard
//                   key={reservation.id}
//                   reservation={reservation}
//                   table={reservation.tableId ? getTableById(reservation.tableId) : undefined}
//                   onComplete={() => completeReservation(reservation.id)}
//                   delay={700 + index * 100}
//                 />
//               ))
//             ) : (
//               <div className="bg-card border border-border rounded-xl p-8 text-center">
//                 <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
//                 <p className="text-muted-foreground">No guests currently seated</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in" style={{ animationDelay: '800ms' }}>
//         <div className="flex items-center gap-3 mb-4">
//           <TrendingUp className="w-5 h-5 text-primary" />
//           <h3 className="text-lg font-display font-semibold text-foreground">Quick Overview</h3>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           <div>
//             <p className="text-sm text-muted-foreground">Total Reservations</p>
//             <p className="text-2xl font-display font-bold text-foreground">{stats.totalReservations}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground">Occupied Tables</p>
//             <p className="text-2xl font-display font-bold text-foreground">{stats.occupiedTables}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground">Reserved Tables</p>
//             <p className="text-2xl font-display font-bold text-foreground">{stats.reservedTables}</p>
//           </div>
//           <div>
//             <p className="text-sm text-muted-foreground">Available Capacity</p>
//             <p className="text-2xl font-display font-bold text-foreground">
//               {tables.filter(t => t.status === 'available').reduce((acc, t) => acc + t.capacity, 0)} seats
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useRestaurantContext } from '@/context/RestaurantContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { ReservationCard } from '@/components/reservations/ReservationCard';
import {
  CalendarCheck,
  Users,
  Clock,
  TrendingUp,
} from 'lucide-react';

export default function Dashboard() {
  const {
    stats,
    reservations,
    confirmReservation,
    seatGuests,
    completeReservation,
    updateReservation,
  } = useRestaurantContext();

  // Pending + Confirmed
  const upcomingReservations = reservations
    .filter(
      (r) => r.status === 'pending' || r.status === 'confirmed'
    )
    .slice(0, 4);

  // Seated
  const seatedReservations = reservations.filter(
    (r) => r.status === 'seated'
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          Welcome to <span className="text-gradient-gold">Royal Rasoi</span>
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening at your restaurant today
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Today's Reservations"
          value={stats.todayReservations}
          icon={CalendarCheck}
          variant="primary"
          delay={100}
        />

        <StatCard
          title="Guests Seated"
          value={stats.seatedGuests}
          icon={Users}
          variant="success"
          delay={200}
        />

        <StatCard
          title="Available Seats"
          value={`${stats.availableSeats}/${stats.totalCapacity}`}
          icon={Users}
          variant="success"
          delay={300}
        />

        <StatCard
          title="Pending Reservations"
          value={stats.pendingReservations}
          icon={Clock}
          variant="warning"
          delay={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Reservations */}
        <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-display font-semibold">
              Upcoming Reservations
            </h2>
            <span className="text-sm text-muted-foreground">
              {upcomingReservations.length} upcoming
            </span>
          </div>

          <div className="space-y-4">
            {upcomingReservations.length > 0 ? (
              upcomingReservations.map((reservation, index) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onConfirm={() =>
                    confirmReservation(reservation.id)
                  }
                  onSeat={() =>
                    seatGuests(reservation.id)
                  }
                  onCancel={() =>
                    updateReservation(reservation.id, {
                      status: 'cancelled',
                    })
                  }
                  delay={600 + index * 100}
                />
              ))
            ) : (
              <div className="bg-card border rounded-xl p-8 text-center">
                <CalendarCheck className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No upcoming reservations
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Currently Seated */}
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-display font-semibold">
              Currently Seated
            </h2>
            <span className="text-sm text-muted-foreground">
              {seatedReservations.length} active
            </span>
          </div>

          <div className="space-y-4">
            {seatedReservations.length > 0 ? (
              seatedReservations.map((reservation, index) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onComplete={() =>
                    completeReservation(reservation.id)
                  }
                  delay={700 + index * 100}
                />
              ))
            ) : (
              <div className="bg-card border rounded-xl p-8 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No guests currently seated
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Overview */}
      <div
        className="bg-card border rounded-2xl p-6 shadow-card animate-fade-in"
        style={{ animationDelay: '800ms' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-display font-semibold">
            Quick Overview
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Reservations
            </p>
            <p className="text-2xl font-display font-bold">
              {stats.totalReservations}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Guests Seated
            </p>
            <p className="text-2xl font-display font-bold">
              {stats.seatedGuests}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Total Capacity
            </p>
            <p className="text-2xl font-display font-bold">
              {stats.totalCapacity} seats
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Available Seats
            </p>
            <p className="text-2xl font-display font-bold">
              {stats.availableSeats} seats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
