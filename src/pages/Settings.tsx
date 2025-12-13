import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Clock, 
  Bell, 
  Palette,
  Save 
} from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your restaurant preferences and configurations
        </p>
      </div>

      {/* Restaurant Info */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/20">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground">Restaurant Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="restaurantName">Restaurant Name</Label>
            <Input id="restaurantName" defaultValue="La Maison" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="(555) 123-4567" className="mt-1.5" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue="123 Fine Dining Street, Culinary District" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="reservations@lamaison.com" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" defaultValue="www.lamaison.com" className="mt-1.5" />
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/20">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground">Operating Hours</h2>
        </div>
        <div className="space-y-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div key={day} className="flex items-center justify-between">
              <span className="text-foreground font-medium w-28">{day}</span>
              <div className="flex items-center gap-3">
                <Input type="time" defaultValue="17:00" className="w-32" />
                <span className="text-muted-foreground">to</span>
                <Input type="time" defaultValue="23:00" className="w-32" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/20">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">New Reservation Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when a new reservation is made</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Cancellation Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when a reservation is cancelled</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Daily Summary</p>
              <p className="text-sm text-muted-foreground">Receive a daily overview of reservations</p>
            </div>
            <Switch />
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-card animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/20">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-display font-semibold text-foreground">Appearance</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Compact View</p>
              <p className="text-sm text-muted-foreground">Show more items in a smaller space</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Show Table Numbers</p>
              <p className="text-sm text-muted-foreground">Display table numbers in the floor plan</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end animate-fade-in" style={{ animationDelay: '500ms' }}>
        <Button variant="gold" size="lg">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
