import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import type { SocialMediaItem } from "types";
import personalData from "content/personal.json";

export const SOCIAL_MEDIA: SocialMediaItem[] = [
	{
		id: "linkedin",
		icon: BsLinkedin,
		title: "Visit LinkedIn profile",
		label: "LinkedIn",
		href: personalData.linkedinUrl,
		color: "#0A66C2",
		external: true
	},
	{
		id: "github",
		icon: BsGithub,
		title: "Visit Github profile",
		label: "GitHub",
		href: personalData.githubUrl,
		color: "#2DBA4E",
		external: true
	},
	{
		id: "mail",
		icon: HiOutlineMail,
		title: "Send me an email",
		label: "Email",
		href: `mailto:${personalData.email}`,
		color: "#E4405F",
		external: false
	},
	{
		id: "x",
		icon: FaXTwitter,
		title: "Visit X profile",
		label: "X",
		href: personalData.xUrl,
		color: "#1DA1F2",
		external: true
	}
];
