import type { HeadingDividerProps } from "types";
import { Reveal } from "components/motion/reveal";

export function HeadingDivider({ title = "", as = "h2", id }: HeadingDividerProps) {
	const Heading = as;

	return (
		<Reveal>
			<header className="flex items-center">
				<Heading id={id} className="heading-divider">
					{title}
				</Heading>
			</header>
		</Reveal>
	);
}
