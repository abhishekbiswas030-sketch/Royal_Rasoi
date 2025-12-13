import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning';
  delay?: number;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  variant = 'default',
  delay = 0 
}: StatCardProps) {
  const variants = {
    default: 'border-border',
    primary: 'border-primary/30 shadow-glow',
    success: 'border-success/30',
    warning: 'border-warning/30',
  };

  const iconVariants = {
    default: 'bg-secondary text-muted-foreground',
    primary: 'gradient-gold text-primary-foreground',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
  };

  return (
    <div 
      className={cn(
        "bg-card border rounded-xl p-6 shadow-card animate-fade-in",
        variants[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-display font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              <span className="text-muted-foreground">vs last week</span>
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-lg", iconVariants[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
