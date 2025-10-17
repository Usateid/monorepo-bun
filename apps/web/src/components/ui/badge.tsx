import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  variant: "success" | "error" | "info";
  children: React.ReactNode;
  showDot?: boolean;
}

const variantStyles = {
  success: {
    container:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    dot: "bg-green-500",
  },
  error: {
    container: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    dot: "bg-red-500",
  },
  info: {
    container:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    dot: "bg-blue-500",
  },
};

export function StatusBadge({
  variant,
  children,
  showDot = false,
}: StatusBadgeProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        styles.container
      )}
    >
      {showDot && (
        <span className={cn("w-2 h-2 rounded-full mr-2", styles.dot)}></span>
      )}
      {children}
    </span>
  );
}
