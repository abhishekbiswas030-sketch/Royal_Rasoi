import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users } from 'lucide-react';

export function ReservationCard({
  reservation,
  onConfirm,
  onSeat,
  onCancel,
  onComplete,
  delay = 0,
}: {
  reservation: any;
  onConfirm?: () => void;
  onSeat?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  delay?: number;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5 shadow-card animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* ✅ FIXED FIELD */}
      <h3 className="text-lg font-semibold">
        {reservation.guestName}
      </h3>

      <div className="text-sm text-muted-foreground space-y-1 mt-2">
        <p className="flex items-center gap-2">
          <Calendar size={14} /> {reservation.date}
        </p>
        <p className="flex items-center gap-2">
          <Clock size={14} /> {reservation.time}
        </p>
        <p className="flex items-center gap-2">
          <Users size={14} /> {reservation.partySize} guests
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {reservation.status === 'pending' && onConfirm && (
          <Button size="sm" onClick={onConfirm}>
            Confirm
          </Button>
        )}

        {reservation.status === 'confirmed' && onSeat && (
          <Button size="sm" variant="success" onClick={onSeat}>
            Seat
          </Button>
        )}

        {reservation.status === 'seated' && onComplete && (
          <Button size="sm" variant="secondary" onClick={onComplete}>
            Complete
          </Button>
        )}

        {onCancel && reservation.status !== 'completed' && (
          <Button size="sm" variant="destructive" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
