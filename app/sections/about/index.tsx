import { HeadingDivider } from "components/HeadingDivider";
import { PortraitTilt } from "./PortraitTilt";

export function AboutSection() {
	return (
		<section id="about" className="section">
			<HeadingDivider title="About me" />
			<div className="pt-4 flex flex-col md:flex-row items-center gap-5 md:gap-8">
				<div className="w-full md:w-1/3 flex justify-center">
					<PortraitTilt />
				</div>
				<div className="w-full md:w-2/3 text-base lg:text-lg font-light leading-relaxed animate-section-in">
					<p tabIndex={0}>
						I&apos;m <span className="font-medium text-primary-color">Chandresh Kumar</span>, a{" "}
						<span className="font-medium text-primary-color">Software Engineer</span> who enjoys
						writing code and solving problems. My journey began at{" "}
						<a
							href="https://kmit.in"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary-color hover:underline"
						>
							KMIT
						</a>
						, where I studied Computer Science and built a strong foundation in core concepts that
						still guide how I approach engineering challenges today.
					</p>
					<p className="my-4" tabIndex={0}>
						Over the years, I&apos;ve worked with a range of technologies and projects, each
						teaching me something new about building systems that are easy to understand, maintain,
						and grow. I write code with intention - focusing on{" "}
						<span className="font-medium text-primary-color">clarity</span>,{" "}
						<span className="font-medium text-primary-color">performance</span>, and{" "}
						<span className="font-medium text-primary-color">long-term quality</span>. Whether
						I&apos;m improving backend services, building intuitive interfaces, or debugging tricky
						issues, I try to be thoughtful and thorough in every step.
					</p>
					<p tabIndex={0}>
						When I&apos;m not coding, I&apos;m learning, playing video games, staying active, or
						enjoying some music and movies.
					</p>
				</div>
			</div>
		</section>
	);
}
