import { useState } from 'react';
import { ReservationFormData } from '@/types/restaurant';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface ReservationFormProps {
  onSubmit: (data: ReservationFormData) => void;
  onClose: () => void;
}

const timeSlots = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00'
];

export function ReservationForm({ onSubmit, onClose }: ReservationFormProps) {
  const [formData, setFormData] = useState<ReservationFormData>({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    partySize: 2,
    date: '',
    time: '',
    specialRequests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-2xl shadow-card w-full max-w-lg animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-display font-semibold text-foreground">
            New Reservation
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="guestName">Guest Name</Label>
              <Input
                id="guestName"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="John Smith"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="guestEmail">Email</Label>
              <Input
                id="guestEmail"
                type="email"
                value={formData.guestEmail}
                onChange={(e) => setFormData({ ...formData, guestEmail: e.target.value })}
                placeholder="john@email.com"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="guestPhone">Phone</Label>
              <Input
                id="guestPhone"
                type="tel"
                value={formData.guestPhone}
                onChange={(e) => setFormData({ ...formData, guestPhone: e.target.value })}
                placeholder="(555) 123-4567"
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Select
                value={formData.time}
                onValueChange={(value) => setFormData({ ...formData, time: value })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="partySize">Party Size</Label>
              <Select
                value={formData.partySize.toString()}
                onValueChange={(value) => setFormData({ ...formData, partySize: parseInt(value) })}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} {size === 1 ? 'guest' : 'guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Allergies, celebrations, seating preferences..."
                className="mt-1.5 min-h-[80px]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gold" className="flex-1">
              Create Reservation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
