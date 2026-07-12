import type { HeadingDividerProps } from "types";

export function HeadingDivider({ title = "" }: HeadingDividerProps) {
	return (
		<header className="flex items-center">
			<h2 tabIndex={0} className="heading-divider animate-section-in">
				{title}
			</h2>
		</header>
	);
}
