import { AgeCounter } from "components/AgeCounter";
import { RichText } from "components/RichText";
import GreetingLottie from "./DisplayLottie";
import { FileText } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";
import personalData from "content/personal.json";

export function WelcomeSection() {
	const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL;

	return (
		<section id="intro" className="section">
			<div className="grid grid-cols-1 md:grid-cols-[1fr_0.4fr] lg:grid-cols-[1fr_0.6fr] gap-4 items-center">
				<div className="py-2 md:py-3">
					<h1 className="intro-reveal intro-reveal--1 text-3xl lg:text-4xl xl:text-5xl font-bold">
						<span>
							Hi, I&apos;m <mark>Chandresh Kumar</mark>
						</span>
					</h1>

					<div className="intro-reveal intro-reveal--2 mt-4">
						<AgeCounter />
					</div>

					<p className="intro-reveal intro-reveal--3 mt-3 mb-4 text-text-muted text-base sm:text-lg lg:text-xl leading-relaxed">
						<RichText text={personalData.shortBio} />
					</p>

					<div className="intro-reveal intro-reveal--4 flex flex-wrap gap-4">
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

				<div className="intro-lottie-stage hidden md:grid" aria-hidden="true">
					<GreetingLottie animationPath="/lottie/coding.json" />
				</div>
			</div>
		</section>
	);
}
