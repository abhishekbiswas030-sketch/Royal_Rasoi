export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'seated'
  | 'completed'
  | 'cancelled';

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  date: string;
  time: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface ReservationFormData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  date: string;
  time: string;
}
