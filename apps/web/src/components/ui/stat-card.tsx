interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="h-12 w-12 rounded-full bg-[var(--color-sage-200)] dark:bg-[var(--color-sage-700)] flex items-center justify-center">
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  );
}
