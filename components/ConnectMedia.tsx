import { SOCIAL_MEDIA } from "../constants";
import type { CSSProperties } from "react";

export function ConnectMedia() {
	return (
		<div className="flex items-center gap-4">
			{SOCIAL_MEDIA.map(({ id, icon: Icon, title, href, color, external }) => (
				<a
					key={id}
					href={href}
					target={external ? "_blank" : undefined}
					rel={external ? "noopener noreferrer" : undefined}
					title={title}
					aria-label={title}
					className="text-2xl transition-all duration-300 hover:scale-125 hover:text-[var(--hover-color)]"
					style={{ "--hover-color": color } as CSSProperties}
				>
					<Icon />
				</a>
			))}
		</div>
	);
}
