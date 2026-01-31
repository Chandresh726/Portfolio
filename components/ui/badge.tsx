import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "utils/cn";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-light focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-blue-light text-white shadow hover:bg-blue-normal",
				secondary: "border-transparent bg-surface-muted text-on-surface hover:bg-surface-interactive",
				destructive: "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
				outline: "text-on-surface border-outline"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
