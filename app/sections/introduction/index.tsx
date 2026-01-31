"use client";

import { useRef } from "react";
import BlurFade from "components/magicui/blur-fade";
import { AgeCounter } from "components/AgeCounter";
import { RichText } from "components/RichText";
import GreetingLottie from "./DisplayLottie";
import { FileText, Linkedin } from "lucide-react";
import personalData from "content/personal.json";

const BLUR_FADE_DELAY = 0.02;

export function WelcomeSection() {
	const introRef = useRef(null);

	return (
		<section id="intro" className="section" ref={introRef}>
			<div className="grid grid-cols-1 md:grid-cols-[1fr_0.4fr] lg:grid-cols-[1fr_0.6fr] gap-4 items-center">
				<div className="py-5 md:py-10">
					<BlurFade delay={BLUR_FADE_DELAY}>
						<h1 tabIndex={0} className="text-3xl md:text-4xl xl:text-5xl font-bold">
							<p>
								Hi, I&apos;m <mark>Chandresh Kumar</mark>
							</p>
						</h1>
					</BlurFade>

					<BlurFade delay={BLUR_FADE_DELAY * 2}>
						<div className="mt-4">
							<AgeCounter />
						</div>
					</BlurFade>

					<BlurFade delay={BLUR_FADE_DELAY * 3}>
						<p className="mt-3 mb-6 text-text-muted text-lg md:text-xl leading-relaxed">
							<RichText text={personalData.shortBio} />
						</p>
					</BlurFade>

					<BlurFade delay={BLUR_FADE_DELAY * 4}>
						<div className="flex flex-wrap gap-4">
							<a
								href={process.env.NEXT_PUBLIC_RESUME_URL}
								target="_blank"
								rel="noopener noreferrer"
								tabIndex={0}
								className="btn flex items-center gap-2"
								aria-label="view resume"
							>
								<FileText className="size-4" />
								View Resume
							</a>
							<a
								href={personalData.linkedinUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="btn-outline flex items-center gap-2"
							>
								<Linkedin className="size-4" />
								LinkedIn
							</a>
						</div>
					</BlurFade>
				</div>

				<BlurFade delay={BLUR_FADE_DELAY * 2} className="hidden md:block">
					<GreetingLottie animationPath="/lottie/coding.json" />
				</BlurFade>
			</div>
		</section>
	);
}
