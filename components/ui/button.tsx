import { cva } from "class-variance-authority";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-light disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-blue-light text-white shadow hover:bg-blue-normal",
				destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
				outline: "border border-outline bg-surface shadow-sm hover:bg-surface-interactive",
				secondary: "bg-surface-muted text-on-surface shadow-sm hover:bg-surface-interactive",
				ghost: "hover:bg-surface-interactive",
				link: "text-blue-light underline-offset-4 hover:underline"
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9 rounded-full"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	}
);

export { buttonVariants };
