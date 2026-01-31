import { BsFillEnvelopeOpenFill, BsGithub, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import type { SocialMediaItem } from "types";

export const SOCIAL_MEDIA: SocialMediaItem[] = [
	{
		id: "linkedin",
		icon: <BsLinkedin />,
		title: "Visit LinkedIn profile",
		url: "https://www.linkedin.com/in/kchandresh726/"
	},
	{
		id: "github",
		icon: <BsGithub />,
		title: "Visit Github profile",
		url: "https://github.com/Chandresh726"
	},
	{
		id: "mail",
		icon: <BsFillEnvelopeOpenFill />,
		title: "Send me an email",
		url: "mailto://kchandresh726@gmail.com"
	},
	{
		id: "X",
		icon: <FaXTwitter />,
		title: "Visit X profile",
		url: "https://twitter.com/Chandresh_726"
	}
];
