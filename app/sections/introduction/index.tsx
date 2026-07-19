import { AgeCounter } from "components/AgeCounter";
import { RichText } from "components/RichText";
import GreetingLottie from "./DisplayLottie";
import { FileText } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";
import personalData from "content/personal.json";
import { calculateAgeYears } from "utils/age";
import { HeroMotion } from "components/motion/hero-motion";

export function WelcomeSection() {
	const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;

	return (
		<section id="intro" aria-labelledby="intro-heading" className="section">
			<HeroMotion
				copy={
					<div className="py-2 md:py-3">
						<h1 id="intro-heading" className="text-3xl lg:text-4xl xl:text-5xl font-bold">
							<span>
								Hi, I&apos;m <mark>Chandresh Kumar</mark>
							</span>
						</h1>

						<div className="mt-4">
							<AgeCounter initialYears={calculateAgeYears()} />
						</div>

						<p className="mt-3 mb-4 text-text-muted text-base sm:text-lg lg:text-xl leading-relaxed">
							<RichText text={personalData.shortBio} />
						</p>

						<div className="flex flex-wrap gap-4">
							{resumeUrl ? (
								<a
									href={resumeUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="btn flex items-center gap-2"
									aria-label="view resume"
								>
									<FileText className="size-4" />
									View Resume
								</a>
							) : null}
							<a
								href={personalData.linkedinUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="btn-outline flex items-center gap-2"
							>
								<BsLinkedin className="size-4" />
								LinkedIn
							</a>
						</div>
					</div>
				}
				visual={<GreetingLottie animationPath="/lottie/coding.json" />}
			/>
		</section>
	);
}
