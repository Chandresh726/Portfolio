"use client";

import { SOCIAL_MEDIA } from "../constants";
import { CSSProperties, MouseEvent } from "react";

function getIconColor(id: string): string {
	switch (id) {
		case "linkedin":
			return "#0A66C2";
		case "github":
			return "#2DBA4E";
		case "X":
			return "#1DA1F2";
		case "mail":
			return "#E4405F";
		default:
			return "currentColor";
	}
}

export function ConnectMedia() {
	return (
		<div className="flex items-center gap-4">
			{SOCIAL_MEDIA.map(({ id, icon, title, url }) => (
				<a
					key={id}
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					title={title}
					aria-label={title}
					className="text-2xl transition-all duration-300 hover:scale-125"
					style={{ "--hover-color": getIconColor(id) } as CSSProperties}
					onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) =>
						(e.currentTarget.style.color = getIconColor(id))
					}
					onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "")}
				>
					{icon}
				</a>
			))}
		</div>
	);
}
