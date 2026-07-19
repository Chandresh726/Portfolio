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
					className="text-2xl transition-[color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-125 hover:text-[var(--hover-color)] motion-reduce:transform-none motion-reduce:transition-none"
					style={{ "--hover-color": color } as CSSProperties}
				>
					<Icon />
				</a>
			))}
		</div>
	);
}
