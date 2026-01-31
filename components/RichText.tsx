"use client";

import { Fragment } from "react";

interface RichTextProps {
	text: string;
	className?: string;
}

type ParsedSegment = {
	text: string;
	styles: {
		bold?: boolean;
		color?: string;
	};
};

function parseRichText(text: string): ParsedSegment[] {
	const segments: ParsedSegment[] = [];
	// Pattern matches [style]content[/style] where style can be: bold, blue, primary, or any color
	const regex = /\[(\w+)\](.*?)\[\/\1\]/g;

	let lastIndex = 0;
	let match;

	while ((match = regex.exec(text)) !== null) {
		// Add text before this match
		if (match.index > lastIndex) {
			segments.push({
				text: text.slice(lastIndex, match.index),
				styles: {}
			});
		}

		const style = match[1];
		const content = match[2];

		const styles: ParsedSegment["styles"] = {};

		if (style === "bold") {
			styles.bold = true;
		} else if (style === "primary") {
			styles.color = "primary";
		} else {
			// Treat as color name (blue, green, etc.)
			styles.color = style;
		}

		segments.push({ text: content, styles });
		lastIndex = match.index + match[0].length;
	}

	// Add remaining text
	if (lastIndex < text.length) {
		segments.push({
			text: text.slice(lastIndex),
			styles: {}
		});
	}

	return segments;
}

function getColorClass(color: string): string {
	switch (color) {
		case "primary":
		case "blue":
			// Use primary color for consistency across the site
			return "text-primary-color";
		case "green":
			return "text-green-500";
		case "red":
			return "text-red-500";
		case "purple":
			return "text-purple-500";
		case "orange":
			return "text-orange-500";
		default:
			return `text-${color}-500`;
	}
}

export function RichText({ text, className = "" }: RichTextProps) {
	const segments = parseRichText(text);

	return (
		<span className={className}>
			{segments.map((segment, index) => {
				const { text: content, styles } = segment;

				let segmentClassName = "";
				if (styles.bold) segmentClassName += "font-semibold ";
				if (styles.color) segmentClassName += getColorClass(styles.color);

				if (segmentClassName) {
					return (
						<span key={index} className={segmentClassName.trim()}>
							{content}
						</span>
					);
				}

				return <Fragment key={index}>{content}</Fragment>;
			})}
		</span>
	);
}
