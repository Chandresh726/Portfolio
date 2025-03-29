"use client";

import { SOCIAL_MEDIA } from "../constants";

export function ConnectMedia() {
	return (
		<div className="flex items-center gap-4">
			{SOCIAL_MEDIA.map(({ id, icon, url }) => (
				<a
					key={id}
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-2xl transition-all duration-300 hover:scale-125"
					style={{ "--hover-color": getIconColor(id) }}
					onMouseEnter={(e) => e.currentTarget.style.color = e.currentTarget.style.getPropertyValue('--hover-color')}
					onMouseLeave={(e) => e.currentTarget.style.color = ''}
				>
					{icon}
				</a>
			))}
		</div>
	);
}

function getIconColor(id) {
	switch (id) {
		case 'linkedin':
			return '#0A66C2';
		case 'github':
			return '#2DBA4E';
		case 'X':
			return '#1DA1F2';
		case 'mail':
			return '#E4405F';
		default:
			return 'currentColor';
	}
}
