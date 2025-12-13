import { useState, useCallback, useMemo } from 'react';
import { Reservation, ReservationFormData } from '@/types/restaurant';

const TOTAL_CAPACITY = 100;

export function useRestaurant() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  /* =========================
     RESERVATION ACTIONS
  ========================= */

  const addReservation = useCallback((data: ReservationFormData) => {
    const newReservation: Reservation = {
      id: `r-${Date.now()}`,
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setReservations(prev => [...prev, newReservation]);
  }, []);

  const confirmReservation = useCallback((id: string) => {
    setReservations(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: 'confirmed' } : r
      )
    );
  }, []);

  const seatGuests = useCallback((id: string) => {
    setReservations(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: 'seated' } : r
      )
    );
  }, []);

  const completeReservation = useCallback((id: string) => {
    setReservations(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: 'completed' } : r
      )
    );
  }, []);

  const updateReservation = useCallback(
    (id: string, updates: Partial<Reservation>) => {
      setReservations(prev =>
        prev.map(r =>
          r.id === id ? { ...r, ...updates } : r
        )
      );
    },
    []
  );

  /* =========================
     STATS
  ========================= */

  const stats = useMemo(() => {
    const today = new Date().toLocaleDateString('en-CA');


    const confirmedOrSeated = reservations.filter(
      r => r.status === 'confirmed' || r.status === 'seated'
    );

    const usedSeats = confirmedOrSeated.reduce(
      (acc, r) => acc + r.partySize,
      0
    );

    return {
      totalCapacity: TOTAL_CAPACITY,
      availableSeats: TOTAL_CAPACITY - usedSeats,
      totalReservations: reservations.length,
      todayReservations: reservations.filter(r => r.date === today).length,
      pendingReservations: reservations.filter(r => r.status === 'pending').length,
      seatedGuests: reservations
        .filter(r => r.status === 'seated')
        .reduce((acc, r) => acc + r.partySize, 0),
    };
  }, [reservations]);

  return {
    reservations,
    stats,
    addReservation,
    confirmReservation,
    seatGuests,
    completeReservation,
    updateReservation,
  };
}
